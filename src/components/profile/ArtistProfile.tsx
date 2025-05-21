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
// import { Plus } from "lucide-react";
import { getUser } from "@/actions/userAction";
import { useCurrentUser } from "@/hooks/useCurrentUser";

type UserInfo = {
  name?: string;
  username?: string;
  bio: string;
  email: string;
  countryCode: string;
  mobile: string;
  dob?: Date | string;
  location: string;
  medium: string;
  experience: string;
  education: string;
  portfolio?: string;
  award?: string;
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
    defaultValues: userInfo,
  });
  const user = useCurrentUser();
  // console.log(user);
  const handleGetUserInfo = async () => {
    const data = await getUser(user?.id || null);
    if (!data || data.error) return;
    setUserInfo({
      name: data.user?.name || "",
      username: "",
      bio: data.user?.bio || "",
      email: data.user?.email || "",
      countryCode: data.user?.country || "",
      mobile: data.user?.phone || "",
      dob: data.user?.dob || "",
      location: data.user?.location || "",
      medium: data.user?.medium || "",
      experience: data.user?.experience || "",
      education: data.user?.education || "",
      portfolio: data.user?.portfolio || "",
      // award: data.user?.award || "",
    });
    console.log(userInfo);
  };

  useEffect(() => {
    handleGetUserInfo();
  }, [user]);

  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(!edit);
  };

  const [editProfessional, setEditProfessional] = useState(false);
  const handleEditProfessional = () => {
    setEditProfessional(!editProfessional);
  };

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
            <div className="font-semibold text-xl">{userInfo.name}</div>
            <div className="text-gray-500 text-sm">{userInfo.email}</div>
          </div>
        </div>

        {/* Personal Info */}
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
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
                  <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={userInfo.username}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, username: e.target.value })
                      }
                      disabled={!edit}
                    />
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
                    <Textarea
                      {...field}
                      rows={2}
                      disabled={!edit}
                      value={userInfo.bio}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, bio: e.target.value })
                      }
                    />
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
                    <Input {...field} value={userInfo.email} disabled={!edit} />
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
                  <Input
                    {...form.register("countryCode")}
                    className="w-16"
                    placeholder="+91"
                    disabled={!edit}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    {...form.register("mobile")}
                    disabled={!edit}
                    value={userInfo.mobile}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, mobile: e.target.value })
                    }
                  />
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
                    <Input
                      {...field}
                      value={
                        field.value instanceof Date
                          ? field.value.toISOString().slice(0, 10)
                          : field.value || ""
                      }
                      disabled={!edit}
                      type="date"
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, dob: e.target.value })
                      }
                      placeholder="YYYY-MM-DD"
                    />
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

            {/* Professional Info */}
            <div className="flex md:items-center gap-2 mt-4 mb-2">
              <div className="border-t w-6 border-gray-900" />
              <span className="font-medium">Professional</span>
              <div className="flex-1 border-t border-gray-900" />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleEditProfessional}
              >
                {editProfessional ? "Save" : "Edit"}
              </Button>
              <div className="w-6 border-t border-gray-900" />
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
                    <Input
                      {...field}
                      value={userInfo.medium}
                      disabled={!editProfessional}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, medium: e.target.value })
                      }
                      placeholder="e.g. Painting, Sculpture"
                    />
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
                    <Input
                      {...field}
                      value={userInfo.experience}
                      disabled={!editProfessional}
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          experience: e.target.value,
                        })
                      }
                    />
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
                    <Input
                      {...field}
                      value={userInfo.education}
                      disabled={!editProfessional}
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          education: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
              <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                Portfolio
              </FormLabel>
              <div className="flex gap-2 flex-1">
                <FormControl>
                  <Input
                    {...form.register("portfolio")}
                    value={userInfo.portfolio}
                    disabled={!editProfessional}
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        portfolio: e.target.value,
                      })
                    }
                    placeholder="https://yourportfolio.com"
                  />
                </FormControl>
                {/* <Button type="button" size="icon" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button> */}
              </div>
            </FormItem>
            <FormItem className="flex flex-col md:flex-row md:items-center gap-2">
              <FormLabel className="text-sm text-gray-700 min-w-[110px]">
                Award
              </FormLabel>
              <div className="flex gap-2 flex-1">
                <FormControl>
                  <Input
                    {...form.register("award")}
                    value={userInfo.award}
                    disabled={!editProfessional}
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        award: e.target.value,
                      })
                    }
                    placeholder="e.g. Best Artist 2023"
                  />
                </FormControl>
                {/* <Button type="button" size="icon" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button> */}
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
