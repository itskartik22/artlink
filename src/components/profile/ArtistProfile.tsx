"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { getUser } from "@/actions/userAction";
import { useCurrentUser } from "@/hooks/useCurrentUser";

type UserInfo = {
  name: string;
  username: string;
  bio: string;
  email: string;
  countryCode: string;
  mobile: string;
  dob: string;
  location: string;
  medium: string;
  experience: string;
  education: string;
  portfolio: string;
  award: string;
};



export default function ArtistProfile() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    username: "",
    bio: "",
    email: "",
    countryCode: "",
    mobile: "",
    dob: "",
    location: "",
    medium: "",
    experience: "",
    education: "",
    portfolio: "",
    award: "",
  });
  const form = useForm<UserInfo>({
    defaultValues:  userInfo,
  });
  const user = useCurrentUser();
  // console.log(user);
  const handleGetUserInfo = async () => {
    const data = await getUser(user?.id || null);
    if (!data) return;
    // setUserInfo(data);
  };

  useEffect(() => {
    handleGetUserInfo();
  }, [user]);

  return (
    <Card className="w-full mx-auto border-none">
      <CardContent className="p-6">
        {/* Avatar and Name */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-4xl">
            <span role="img" aria-label="avatar">
              👤
            </span>
          </div>
          <div>
            <div className="font-semibold text-xl">Kartik Thakur</div>
            <div className="text-gray-500 text-sm">
              thakurkartik2262@gmail.com
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="flex items-center gap-2 mb-2">
          <div className="border-t w-6 border-gray-900" />
          <span className="font-medium">Personal</span>
          <div className="flex-1 border-t border-gray-900" />
        </div>

        <Form {...form}>
          <form className="flex flex-col gap-3">
            {/* Personal Fields */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="bio"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
              <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                Mobile
              </FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input {...form.register("countryCode")} className="w-16" />
                </FormControl>
                <FormControl>
                  <Input {...form.register("mobile")} />
                </FormControl>
              </div>
            </FormItem>
            <FormField
              name="dob"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                    Date of Birth
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Professional Info */}
            <div className="flex md:items-center gap-2 mt-4 mb-2">
              <div className="border-t w-6 border-gray-900" />
              <span className="font-medium">Professional</span>
              <div className="flex-1 border-t border-gray-900" />
            </div>
            <FormField
              name="medium"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                    Artistic Medium
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="experience"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                    Years of Experience
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="education"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                    Education
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
              <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                Portfolio
              </FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input {...form.register("portfolio")} />
                </FormControl>
                <Button type="button" size="icon" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </FormItem>
            <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
              <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                Award
              </FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input {...form.register("award")} />
                </FormControl>
                <Button type="button" size="icon" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </FormItem>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button type="submit" variant="default">
                Save Changes
              </Button>
              <Button type="button" variant="default">
                Change Password
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
