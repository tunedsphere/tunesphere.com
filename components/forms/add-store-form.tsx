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
import type { FileWithPreview } from "@/types"
import Image from "next/image"
import { FileDialog } from "@/components/file-dialog"
import { Zoom } from "@/components/zoom-image"
import { useUploadThing } from "@/lib/uploadthing"

interface AddStoreFormProps {
  userId: string
}

type Inputs = z.infer<typeof storeSchema>

export function AddStoreForm({ userId }: AddStoreFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      headline: "",
      description: "", 
    },
  })

  const { isUploading: isUploadingBanner, startUpload: startUploadBanner } = useUploadThing("storeBanner");
  const { isUploading: isUploadingIcon, startUpload: startUploadIcon } = useUploadThing("storeIcon");

  const previewsBanner = form.watch("storeBanner") as FileWithPreview[] | null;
  const previewsIcon = form.watch("storeIcon") as FileWithPreview[] | null;
  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {


        const storeBanner = isArrayOfFile(data.storeBanner)
          ? await startUploadBanner(data.storeBanner).then((res) => {
              const formattedStoreBanner = res?.map((storeBanner) => ({
                id: storeBanner.key,
                name: storeBanner.key.split("_")[1] ?? storeBanner.key,
                url: storeBanner.url,
              }))
              return formattedStoreBanner ?? null
            })
          : null

          const storeIcon = isArrayOfFile(data.storeIcon) // Assuming you have a function like isArrayOfFile to check if it's an array of files
  ? await startUploadIcon(data.storeIcon).then((res) => {
      const formattedStoreIcon = res?.map((storeIcon) => ({
        id: storeIcon.key,
        name: storeIcon.key.split("_")[1] ?? storeIcon.key,
        url: storeIcon.url,
      }));
      return formattedStoreIcon ?? null;
    })
  : null;

        // Call the addStoreAction with the updated data
        await addStoreAction({ ...data, userId, storeBanner, storeIcon })
  
        form.reset();
        toast.success("Store added successfully.");
        router.push("/dashboard/stores")
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
    <div className="flex flex-1 gap-4 border border-muted rounded-lg p-4">
    <FormItem className="flex flex-col gap-1.5 w-2/6 justify-between">
      <FormLabel className="justify-center mx-auto">Store Icon</FormLabel>
      {!isUploadingIcon && previewsIcon?.length ? (
        <div className="flex justify-center gap-2">
          {previewsIcon.map((file) => (
            <Zoom key={file.name}>
              <Image
                src={file.preview}
                alt={file.name}
                className="h-20 w-20 shrink-0 rounded-full object-cover object-center border border-border"
                width={80}
                height={80}
              />
            </Zoom>
          ))}
        </div>
      ) :  <div
      aria-label="Placeholder"
      role="img"
      aria-roledescription="placeholder"
      className="flex items-center justify-center mx-auto rounded-full bg-muted w-[80px] h-[80px]"
    >
      <Icons.placeholder
        className="h-6 w-6 text-muted-foreground rounded-full"
        aria-hidden="true"
      />
    </div>}
      <FormControl>
        <FileDialog
          setValue={form.setValue}
          name="storeIcon"
          maxFiles={1}
          maxSize={1024 * 1024 * 4}
          files={files}
          setFiles={setFiles}
          isUploading={isUploadingIcon}
          disabled={isPending}
        />
      </FormControl>
      <UncontrolledFormMessage
        message={form.formState.errors.storeIcon?.message}
      />
    </FormItem>
    <div className="flex flex-col w-4/6 gap-2">
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
</div>
    
    </div>
    <FormField
      control={form.control}
      name="headline"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Headline</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Short description. maximum of 100 characters."
              {...field}
            />
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
      {!isUploadingBanner && previewsBanner?.length ? (
        <div className="flex items-center justify-center mx-auto  gap-2">
          {previewsBanner.map((file) => (
            <Zoom key={file.name}>
              <Image
                src={file.preview}
                alt={file.name}
                className="h-[180px] min-w-full rounded-sm"
                width={1000}
                height={120}
              />
            </Zoom>
          ))}
        </div>
      ) :  <div
      aria-label="Placeholder"
      role="img"
      aria-roledescription="placeholder"
      className="flex items-center justify-center mx-auto bg-muted/70 rounded-sm w-full"
    >
      <Icons.placeholder
        className="h-20 w-10 text-muted-foreground rounded-full"
        aria-hidden="true"
      />
    </div>}
      <FormControl>
        <FileDialog
          setValue={form.setValue}
          name="storeBanner"
          maxFiles={1}
          maxSize={1024 * 1024 * 4}
          files={files}
          setFiles={setFiles}
          isUploading={isUploadingBanner}
          disabled={isPending}
        />
      </FormControl>
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