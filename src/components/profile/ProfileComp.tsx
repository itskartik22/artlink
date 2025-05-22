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
import { getUser, updateUser } from "@/actions/userAction";

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
  phone: string;
  // dob: Date | string;
  location: string;
};

const ProfileComp = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    username: "",
    countryCode: "",
    phone: "",
    // dob: "",
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
      username: data.user?.username || "",
      email: data.user?.email || "",
      countryCode: data.user?.countryCode || "",
      phone: data.user?.phone || "",
      // dob: data.user?.dob || "",
      location: data.user?.location || "",
    });
  };

  useEffect(() => {
    handleGetUserInfo();
    // console.log("userInfo", userInfo);
  }, [user]);

  const handleEdit = () => setEdit((prev) => !prev);

  const handleSave = async () => {
    if (!user) {
      setEdit(false);
      return;
    }
    // Get latest values from the form
    const values = userInfo;
    const res = await updateUser(user.id, {
      ...values,
    });
    console.log("res", res);
    if (!res || res.error) {
      // Optionally show error feedback here
      setEdit(false);
      return;
    }
    setUserInfo(values); // Update local state with saved values
    setEdit(false);
  };

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
            size="icon"
            onClick={handleEdit}
            className={`${edit ? "bg-red-500 text-white font-extrabold" : ""} `}
          >
            {edit ? "X" : "Edit"}
          </Button>
          <div className="w-6 border-t border-gray-900" />
        </div>

        <Form {...form}>
          <form className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                    Name
                  </FormLabel>
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
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} value={userInfo.email} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="text-sm text-gray-700 min-w-[110px]">
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
            <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
              <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                phone
              </FormLabel>
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
                    value={userInfo.phone}
                    disabled={!edit}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, phone: e.target.value })
                    }
                  />
                </FormControl>
              </div>
            </FormItem>
            {/* <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="text-sm text-gray-700 min-w-[110px] item-center">
                    Date of Birth
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
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
            /> */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="text-sm text-gray-700 min-w-[110px]">
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
          <Button
            onClick={() => {
              handleSave();
              setEdit(false);
            }}
            className={`${edit ? "bg-blue-500 text-white" : "hidden"}`}
          >
            Save
          </Button>
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
