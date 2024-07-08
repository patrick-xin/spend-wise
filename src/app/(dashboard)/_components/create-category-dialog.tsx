"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from "@/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import EmojiPicker from "emoji-picker-react";
import { CircleOff } from "lucide-react";
import { TransactionType } from "@/lib/types";
import { Category } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../_actions";
import { toast } from "sonner";

interface Props {
  type: TransactionType;
  successCallback: (category: Category) => void;
  trigger?: ReactNode;
}

function CreateCategoryDialog({ type, successCallback, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      type,
    },
  });
  const mutation = useMutation({
    mutationFn: createCategory,
    onError: () => {
      toast.error("category created falied", {
        id: "category",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      successCallback(data);
      toast.success("category created", {
        id: "category",
      });
      setOpen(false);
    },
  });
  function onSubmit(values: CreateCategorySchemaType) {
    mutation.mutate(values);
    toast.loading("creating category", {
      id: "category",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
          <DialogDescription>
            Create a category for transaction
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Popover modal onOpenChange={setOpenEmoji} open={openEmoji}>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="h-[100px] w-full"
                        >
                          {form.watch("icon") ? (
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-2xl" role="img">
                                {field.value}
                              </span>
                              <p className="text-xs text-muted-foreground">
                                Click to change
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <CircleOff className="size-6" />
                              <p className="text-xs text-muted-foreground">
                                Click to select
                              </p>
                            </div>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full overflow-y-scroll">
                        <EmojiPicker
                          onEmojiClick={({ emoji }) => {
                            field.onChange(emoji);
                            setOpenEmoji(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    This is how your category will appear in the app
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => form.reset()}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(onSubmit)} type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCategoryDialog;
