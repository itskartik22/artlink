"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
  FormDescription,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegisterSchema } from "@/schema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { CardWrapper } from "./card-wrapper";
import { useState, useTransition } from "react";
import register from "@/actions/register";
import FormSuccess from "../form-success";
import FormError from "../form-error";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const [isPending, setTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      // contact: "",
      password: "",
    },
  });

  const handleRegister = (data: z.infer<typeof RegisterSchema>) => {
    console.log("Register action");
    setTransition(() => {
      register(data).then((res) => {
        setError(res?.error);
        setSuccess(res?.success);
        console.log(res.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Register"
      backButtonHref="/login"
      backButtonLabel="Already have account? Login"
      headerDescription="Create your account to get started"
    >
      {/* <Button onClick={handleRegister} disabled={isPending}>Create</Button> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className="flex flex-col gap-3"
        >
          <div>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Prabhash Roy"
                      {...field}
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="prabhashroy@gmail.com"
                      {...field}
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      {...field}
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type="submit" disabled={isPending}>
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
