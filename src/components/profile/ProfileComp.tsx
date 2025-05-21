import React, { useState, useEffect } from "react";
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
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getUser } from "@/actions/userAction";

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

type UserInfo = {
  name: string;
  email: string;
  username: string;
  countryCode: string;
  mobile: string;
  dob: Date | string;
  location: string;
};


const ProfileComp = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    username: "",
    countryCode: "",
    mobile: "",
    dob: "",
    location: "",
  });
  const [edit, setEdit] = useState(false);

  const form = useForm<UserInfo>({
    defaultValues: userInfo,
  });

  const user = useCurrentUser();

  const handleGetUserInfo = async () => {
    console.log("user", user?.id);
    const data = await getUser(user?.id || null);
    // console.log("user", data);
    if (!data || data.error) return;
    setUserInfo({
      name: data.user?.name || "",
      username: "",
      email: data.user?.email || "",
      countryCode: data.user?.country || "",
      mobile: data.user?.phone || "",
      dob: data.user?.dob || "",
      location: data.user?.location || "",
    });
  };

  useEffect(() => {
    handleGetUserInfo();
    console.log("userInfo", userInfo);
  }, [user]);

  const handleEdit = () => setEdit((prev) => !prev);

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
            <div className="font-semibold text-xl">{userInfo.name}</div>
            <div className="text-gray-500 text-sm">{userInfo.email}</div>
          </div>
        </div>

        {/* Personal Info Section Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="border-t w-6 border-gray-900" />
          <span className="font-medium">Personal</span>
          <div className="flex-1 border-t border-gray-900" />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleEdit}
          >
            {edit ? "Save" : "Edit"}
          </Button>
          <div className="w-6 border-t border-gray-900" />
        </div>

        <Form {...form}>
          <form className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={userInfo.name}
                      disabled={!edit}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, name: e.target.value })
                      }
                    />
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
                    <Input
                      {...field}
                      value={userInfo.email}
                      disabled={!edit}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, email: e.target.value })
                      }
                    />
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
                    <Input
                      {...field}
                      value={userInfo.username}
                      disabled={!edit}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, username: e.target.value })
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel className="text-sm text-gray-700">Mobile</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    value={userInfo.countryCode}
                    disabled={!edit}
                    className="w-16"
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, countryCode: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <Input
                    value={userInfo.mobile}
                    disabled={!edit}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, mobile: e.target.value })
                    }
                  />
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
                    <Input
                      {...field}
                      value={
                        field.value instanceof Date
                          ? field.value.toISOString().slice(0, 10)
                          : field.value || ""
                      }
                      disabled={!edit}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, dob: e.target.value })
                      }
                    />
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
                    <Input
                      {...field}
                      value={userInfo.location}
                      disabled={!edit}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, location: e.target.value })
                      }
                    />
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
