"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import LoginPageImage from "@/assets/LoginPageImage.jpg";
import { signIn } from "next-auth/react";

const Login = () => {
  const loginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "password should be 8 character long"),
  });

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    await signIn("with-email-password", {
      // it will be with-email-password not credentials
      email: values.email,
      password: values.password,
      // redirect: false,
      callbackUrl: "/",
    });
  };
  return (
    <div className="w-[90%] h-full md:h-[32rem] flex p-2 md:p-8 ">
      <div className="left flex-1 flex items-center justify-center">
        <div className="flex flex-col gap-4">
          <div className="top">
            <p className="text-sm text-slate-600 font-semibold text-center">
              Log in to
            </p>
            <h3 className="text-xl font-semibold text-slate-950 text-center ">
              Learning Management System
            </h3>

            <Button
              className="flex items-center mx-auto gap-2 mt-4 px-6 py-4"
              onClick={() => {
                signIn("github", {
                  callbackUrl: "/",
                });
              }}
            >
              <Github className="text-sm font-medium font-mono" />
              <p className="text-snm font-medium font-mono">
                Login With Github
              </p>
            </Button>
          </div>

          <div className="flex align-center w-full gap-4 justify-center mt-2">
            <hr className="w-20 h-full my-auto" />
            <p className="text-sm font-semibold text-slate-500">or</p>
            <hr className="w-20 h-full my-auto" />
          </div>

          <div>
            <FormProvider {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(handleSubmit)}
                className="flex flex-col gap-4 justify-center"
              >
                <FormField
                  name="email"
                  control={loginForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={loginForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mx-auto">
                  Log in
                </Button>
              </form>
            </FormProvider>
          </div>

          <div className="">
            <p className="text-base text-slate-600 text-center">
              Don't have an account ?{" "}
              <Link href={"/register"} className="font-semibold text-slate-900">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="right hidden flex-1 md:flex px-4 py-4 items-center justify-center">
        <div>
          <Image
            src={LoginPageImage}
            width={200}
            height={200}
            alt="Login Image"
            className="w-[40rem] h-[22rem] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
