"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { type z } from "zod";
import { type Store } from "@/db/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { storeSchema } from "@/lib/validations/store";

import { useForm } from "react-hook-form";
import { Icon } from "@/components/icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { catchError, isArrayOfFile } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form";
import { useUploadThing } from "@/lib/uploadthing";
import type { FileWithPreview } from "@/types";
import {
  checkStoreAction,
  deleteStoreAction,
  updateStoreAction,
} from "@/app/_actions/store";
import { Button } from "@/components/ui/button";
import { FileDialog } from "@/components/file-dialog";
import { StoreBanner } from "@/components/store-banner";
import { StoreIcon } from "@/components/store.icon";
interface UpdateStoreFormProps {
  store: Store;
}
type Inputs = z.infer<typeof storeSchema>;

export function UpdateStoreForm({ store }: UpdateStoreFormProps) {
  const router = useRouter();
  const [StoreBanners, setStoreBanners] = React.useState<
    FileWithPreview[] | null
  >(null);
  const [StoreIcons, setStoreIcons] = React.useState<FileWithPreview[] | null>(
    null
  );
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<Inputs>({
    resolver: zodResolver(storeSchema),
  });
  const { isUploading: isUploadingBanner, startUpload: startUploadBanner } =
    useUploadThing("storeBanner");
  const { isUploading: isUploadingIcon, startUpload: startUploadIcon } =
    useUploadThing("storeIcon");
  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await checkStoreAction({
          name: data.name,
          id: store.id,
        });
        const storeBanner = isArrayOfFile(data.storeBanner)
          ? await startUploadBanner(data.storeBanner).then((res) => {
              const formattedStoreBanner = res?.map((storeBanner) => ({
                id: storeBanner.key,
                name: storeBanner.key.split("_")[1] ?? storeBanner.key,
                url: storeBanner.url,
              }));
              return formattedStoreBanner ?? null;
            })
          : null;

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

        await updateStoreAction({
          ...data,
          id: store.id,
          storeBanner: storeBanner ?? store.storeBanner,
          storeIcon: storeIcon ?? store.storeIcon, // Add userId property         // Add id property
        });

        toast.success("Store updated successfully.");
        setStoreBanners(null); // Set your new value for StoreBanners here
        setStoreIcons(null);
      } catch (err) {
        catchError(err);
      }
    });
  }
  return (
    <>
      <Card
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
          <Form {...form}>
            <form
              className="grid w-full max-w-2xl gap-5"
              onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="update-store-name"
                    aria-describedby="update-store-name-description"
                    required
                    minLength={3}
                    maxLength={50}
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
                <FormLabel>Store Icon</FormLabel>
                {StoreIcons?.length ? (
                  <div className="flex items-center justify-center">
                    {StoreIcons.map((file, i) => (
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
                  <StoreIcon className="" images={store.storeIcon} />
                ) : (
                  <div
                    aria-label="Placeholder"
                    role="img"
                    aria-roledescription="placeholder"
                    className="flex items-center justify-center mx-auto rounded-full bg-muted w-[80px] h-[80px]"
                  >
                    <Icon
                      name="placeholder"
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
                    files={StoreIcons}
                    setFiles={setStoreIcons}
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
                    id="update-store-description"
                    aria-describedby="update-store-description"
                    minLength={3}
                    maxLength={255}
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
                    id="update-store-headline"
                    aria-describedby="update-store-headline-description"
                    maxLength={100} // Maximum of 100 characters
                    placeholder="Short description. Maximum of 100 characters."
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
                {StoreBanners?.length ? (
                  <div className="flex items-center gap-2">
                    {StoreBanners.map((file, i) => (
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
                ) : store.storeBanner ? (
                  <StoreBanner
                    className="object-contain"
                    images={store.storeBanner ?? []}
                  />
                ) : (
                  <div
                    aria-label="Placeholder"
                    role="img"
                    aria-roledescription="placeholder"
                    className="flex items-center justify-center mx-auto rounded-full bg-muted w-[80px] h-[80px]"
                  >
                    <Icon
                      name="placeholder"
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
                    files={StoreBanners}
                    setFiles={setStoreBanners}
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
                    <Icon
                      name="spinner"
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
                      void form.trigger(["name", "headline", "description"]);
                      await deleteStoreAction({
                        userId: store.userId,
                        id: store.id,
                      });
                      router.push(`/dashboard/stores/`);
                    });
                  }}
                  disabled={isPending}
                >
                  {isPending && (
                    <Icon
                      name="spinner"
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
        </CardContent>
      </Card>
    </>
  );
}
