import React from "react";
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

const artStyles = [
  "Abstract Art",
  "Realistic Portrait",
  "Ceramics",
  "Glassblowing",
  "Minimalist Portrait",
  "Pop Art",
  "Impressionism",
  "Realism",
  "Baroque",
  "Caricature",
  "Leatherworking",
  "Gothic",
  "Fauvism",
  "Conceptual Art",
  "Dadaism",
  "Weaving",
  "Embroidery",
  "Renaissance",
];

const ProfileComp = () => {
  const form = useForm({
    defaultValues: {
      name: "Kartik Thakur",
      email: "thakurkartik2262@gmail.com",
      username: "itskartik",
      countryCode: "+91",
      phone: "9608446908",
      dob: "May 18, 2002",
      location: "India, Mumbai",
    },
  });

  return (
    <Card className="w-full border-none">
      <CardContent>
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

        {/* Personal Info Section Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="border-t w-6 border-gray-900" />
          <span className="font-medium">Personal</span>
          <div className="flex-1 border-t border-gray-900" />
        </div>

        {/* Form Start */}
        <Form {...form}>
          <form className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">Name</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel className="text-sm text-gray-700">Mobile</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    value={form.getValues("countryCode")}
                    readOnly
                    className="w-16"
                  />
                </FormControl>
                <FormControl>
                  <Input value={form.getValues("phone")} readOnly />
                </FormControl>
              </div>
            </FormItem>
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">
                    Date of Birth
                  </FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <Button variant="default">Edit Profile</Button>
          <Button variant="default">Change Password</Button>
        </div>

        {/* Art Style Preferences */}
        <div className="flex items-center gap-2 mt-8 mb-2">
          <div className="border-t w-6 border-gray-900" />
          <span className="font-medium">Preferences Art Style</span>
          <div className="flex-1 border-t border-gray-900" />
        </div>
        <div className="flex flex-wrap gap-2">
          {artStyles.map((style) => (
            <span
              key={style}
              className="bg-black text-white rounded-md px-4 py-1 text-sm mb-1 cursor-pointer shadow"
            >
              {style}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileComp;
