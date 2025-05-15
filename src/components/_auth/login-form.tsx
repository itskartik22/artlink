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

import { LoginSchema } from "@/schema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { CardWrapper } from "./card-wrapper";
import { useEffect, useState, useTransition } from "react";
import login from "@/actions/login";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [isPending, setTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setTransition(() => {
      login(data).then( async (res) => {
        if (res?.error) {
          setError(res.error);
        } else {
          setSuccess(res?.success);
          router.push("/profile");
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Login"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have account? Register"
      headerDescription="Login to your account to get started"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="flex flex-col gap-3"
        >
          <div>
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
                      disabled={isPending}
                      type="email"
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
                      disabled={isPending}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
