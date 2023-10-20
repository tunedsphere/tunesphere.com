"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import * as React from "react"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"
import { type z } from "zod"
import { stores, type Store } from "@/db/schema"
import { db } from "@/db"
import { and, eq, not } from "drizzle-orm"
import { getStripeAccountAction } from "@/app/_actions/stripe"
import { zodResolver } from "@hookform/resolvers/zod"
import { storeSchema } from "@/lib/validations/store"
import { StoredFile } from "@/types"
import { useForm } from "react-hook-form"
import { Icons } from "@/components/icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingButton } from "@/components/loading-button"
import { catchError, isArrayOfFile } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form"
import { useUploadThing } from "@/lib/uploadthing"
import type { FileWithPreview } from "@/types"
import {
  checkStoreAction,
  deleteStoreAction,
  updateStoreAction,
} from "@/app/_actions/store"
import { Button } from "@/components/ui/button"
import { FileDialog } from "@/components/file-dialog"
import { StoreBanner } from "@/components/store-banner"
import { StoreIcon } from "@/components/store.icon"
interface UpdateStoreFormProps {
  store: Store
}
type Inputs = z.infer<typeof storeSchema>


export function UpdateStoreForm({
  store,
}: UpdateStoreFormProps) {
  const router = useRouter()
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const form = useForm<Inputs>({
    resolver: zodResolver(storeSchema)
  })
  const { isUploading: isUploadingBanner, startUpload: startUploadBanner } = useUploadThing("storeBanner");
  const { isUploading: isUploadingIcon, startUpload: startUploadIcon } = useUploadThing("storeIcon");
  const previewsBanner = form.watch("storeBanner") as FileWithPreview[] | null;
  const previewsIcon = form.watch("storeIcon") as FileWithPreview[] | null;
  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await checkStoreAction({
          name: data.name,
          id: store.id,
        })
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
        : null

          await updateStoreAction({
            ...data,
            id: store.id,
            storeBanner: storeBanner ?? store.storeBanner,
            storeIcon: storeIcon ?? store.storeIcon,  // Add userId property         // Add id property
          })

        toast.success("Store updated successfully.")
        setFiles(null)
      } catch (err) {
        catchError(err)
      }
    })
  }
  return (
    <>
    {/* <Card
        variant="dashboard"
        as="section"
        id="update-store"
        aria-labelledby="update-store-heading"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Update your store</CardTitle>
          <CardDescription>
            Update your store name and description, or delete it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            action={updateStore}
            className="grid w-full max-w-xl gap-5"
          >
            <div className="grid gap-2.5">
              <Label htmlFor="update-store-name">Name</Label>
              <Input
                id="update-store-name"
                aria-describedby="update-store-name-description"
                name="name"
                required
                minLength={3}
                maxLength={50}
                placeholder="Type store name here."
                defaultValue={store.name}
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="update-store-description">Description</Label>
              <Textarea
                id="update-store-description"
                aria-describedby="update-store-description-description"
                name="description"
                minLength={3}
                maxLength={255}
                placeholder="Type store description here."
                defaultValue={store.description ?? ""}
              />
            </div>
            <div className="grid gap-2.5">
  <Label htmlFor="update-store-headline">Headline</Label>
  <Textarea
    id="update-store-headline"
    aria-describedby="update-store-headline-description"
    name="headline"
    maxLength={100} // Maximum of 100 characters
    placeholder="Short description. Maximum of 100 characters."
    defaultValue={store.headline ?? ""} // Set the initial value from the database
  />
</div>
            <div className="flex flex-col gap-2 xs:flex-row">
              <LoadingButton>
                Update store
                <span className="sr-only">Update store</span>
              </LoadingButton>
              <LoadingButton
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                formAction={deleteStore}
                variant="destructive"
              >
                Delete store
                <span className="sr-only">Delete store</span>
              </LoadingButton>
            </div>
          </form>
        </CardContent>
        
      </Card> */}
       <Form {...form}>
       <form
         className="grid w-full max-w-2xl gap-5"
         onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
       >
         <FormItem>
           <FormLabel>Name</FormLabel>
           <FormControl>
             <Input
               aria-invalid={!!form.formState.errors.name}
               placeholder="Type store name here."
               {...form.register("name")}
               defaultValue={store.name}
             />
           </FormControl>
           <UncontrolledFormMessage
             message={form.formState.errors.name?.message}
           />
         </FormItem>
         <FormItem className="flex-col inline-flex px-2 items-center justify-center gap-1.5 w-1/2">
           <FormLabel>storeIcon</FormLabel>
           {!previewsIcon && files?.length ? (
  <div className="flex items-center justify-center">
    {files.map((file, i) => (
      <span className="relative shrink-0 flex justify-center w-20 h-20 overflow-hidden rounde-full">
      <Image
        key={`storeIcon-${i}`}
        src={file.preview}
        alt={file.name}
        className="shrink-0 rounded-md object-cover object-center"
        width={80}
        height={80}
      />
      </span>
    ))}
  </div>
) : store.storeIcon ? (
  <StoreIcon
    className=""
    images={store.storeIcon}
  />
) : (
  <div
    aria-label="Placeholder"
    role="img"
    aria-roledescription="placeholder"
    className="flex items-center justify-center mx-auto rounded-full bg-muted w-[80px] h-[80px]"
  >
    <Icons.placeholder
      className="h-6 w-6 text-muted-foreground rounded-full"
      aria-hidden="true"
    />
  </div>
  
)}
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

         <FormItem>
           <FormLabel>Description</FormLabel>
           <FormControl>
             <Textarea
               placeholder="Type store description here."
               {...form.register("description")}
               defaultValue={store.description ?? ""}
             />
           </FormControl>
           <UncontrolledFormMessage
             message={form.formState.errors.description?.message}
           />
         </FormItem>
         <FormItem>
           <FormLabel>Headline</FormLabel>
           <FormControl>
             <Textarea
               placeholder="Type store headline here."
               {...form.register("headline")}
               defaultValue={store.headline ?? ""}
             />
           </FormControl>
           <UncontrolledFormMessage
             message={form.formState.errors.headline?.message}
           />
         </FormItem>

         <FormItem className="flex w-full flex-col gap-1.5">
           <FormLabel>storeBanner</FormLabel>
           {!previewsBanner && files?.length ? (
             <div className="flex items-center gap-2">
               {files.map((file, i) => (
                   <Image
                    key={`storeBanner-${i}`}
                     src={file.preview}
                     alt={file.name}
                     className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                     width={80}
                     height={80}
                     
                   />
               ))}
             </div>
           ) :  store.storeBanner ? (  <StoreBanner
           className="object-contain" 
             images={store.storeBanner ?? []}/> 
             ) : (
              <div
                aria-label="Placeholder"
                role="img"
                aria-roledescription="placeholder"
                className="flex items-center justify-center mx-auto rounded-full bg-muted w-[80px] h-[80px]"
              >
                <Icons.placeholder
                  className="h-6 w-6 text-muted-foreground rounded-full"
                  aria-hidden="true"
                />
              </div>
              
            )}
           <FormControl>
             <FileDialog
               setValue={form.setValue}
               name="storeBanner"
               maxFiles={3}
               maxSize={1024 * 1024 * 4}
               files={files}
               setFiles={setFiles}
               isUploading={isUploadingBanner}
               disabled={isPending}
             />
           </FormControl>
           <UncontrolledFormMessage
             message={form.formState.errors.storeBanner?.message}
           />
         </FormItem>


         <div className="flex space-x-2">
           <Button disabled={isPending}>
             {isPending && (
               <Icons.spinner
                 className="mr-2 h-4 w-4 animate-spin"
                 aria-hidden="true"
               />
             )}
             Update Store
             <span className="sr-only">Update Store</span>
           </Button>
           <Button
             variant="destructive"
             onClick={() => {
               startTransition(async () => {
                 void form.trigger(["name", "headline", "description"])
                 await deleteStoreAction({
                  userId: store.userId,
                   id: store.id,
                 })
                 router.push(`/dashboard/stores/`)
               })
             }}
             disabled={isPending}
           >
             {isPending && (
               <Icons.spinner
                 className="mr-2 h-4 w-4 animate-spin"
                 aria-hidden="true"
               />
             )}
             Delete Store
             <span className="sr-only">Delete Store</span>
           </Button>
         </div>
       </form>
     </Form>
     </>
  )
}