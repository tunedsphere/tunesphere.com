"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { catchError, isArrayOfFile } from "@/lib/utils"
import { storeSchema } from "@/lib/validations/store"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { addStoreAction } from "@/app/_actions/store"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import type { FileWithPreview } from "@/types"
import Image from "next/image"
import { FileDialog } from "@/components/file-dialog"

import { Zoom } from "@/components/zoom-image"


interface AddStoreFormProps {
  userId: string
}

type Inputs = z.infer<typeof storeSchema>

const { useUploadThing } = generateReactHelpers<OurFileRouter>()
export function AddStoreForm({ userId }: AddStoreFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })
  const { isUploading, startUpload } = useUploadThing("storeBanner")

  const previews = form.watch("storeBanner") as FileWithPreview[] | null

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {


        const storeBanner = isArrayOfFile(data.storeBanner)
          ? await startUpload(data.storeBanner).then((res) => {
              const formattedStoreBanner = res?.map((storeBanner) => ({
                id: storeBanner.key,
                name: storeBanner.key.split("_")[1] ?? storeBanner.key,
                url: storeBanner.url,
              }))
              return formattedStoreBanner ?? null
            })
          : null
        // Call the addStoreAction with the updated data
        await addStoreAction({ ...data, userId, storeBanner, })
  
        form.reset();
        toast.success("Store added successfully.");
        router.push("/dashboard/stores");
        router.refresh(); // Workaround for the inconsistency of cache revalidation
      } catch (err) {
        catchError(err);
      }
    });
  }
  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type store name here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type store description here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
              {/* StoreBanner input */}
              <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Store Banner</FormLabel>
          {!isUploading && previews?.length ? (
            <div className="flex justify-center  gap-2">
              {previews.map((file) => (
                <Zoom key={file.name}>
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className="h-[120px] min-w-[400px] w-full rounded-md item-stretch"
                    width={400}
                    height={120}
                  />
                </Zoom>
              ))}
            </div>
          ) : null}
          <FormControl>
            <FileDialog
              setValue={form.setValue}
              name="storeBanner"
              maxFiles={1}
              maxSize={1024 * 1024 * 4}
              files={files}
              setFiles={setFiles}
              isUploading={isUploading}
              disabled={isPending}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.storeBanner?.message}
          />
        </FormItem>
        <Button className="w-fit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Add Store
          <span className="sr-only">Add Store</span>
        </Button>
      </form>
    </Form>
  )
}
