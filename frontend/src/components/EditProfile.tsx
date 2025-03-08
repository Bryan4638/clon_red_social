import { BiCamera, BiMapPin, BiSave } from "react-icons/bi";
import { FaGithub, FaLink, FaTwitter } from "react-icons/fa";
import { User } from "../types";
import { FC, useRef, useState } from "react";
import {
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  Textarea,
} from "@heroui/react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

interface EditProfileProps {
  user: User;
  isOpen: boolean;
  onOpenChange: () => void;
}

const EditProfile: FC<EditProfileProps> = ({ user, isOpen, onOpenChange }) => {
  const [profile, setProfile] = useState<{ avatar: string; banner: string }>({
    avatar: user.avatar,
    banner: user.banner,
  });
  const { user: userAuth } = useAuth();
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "banner"
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setProfile((prev) => ({
          ...prev,
          [type]: base64,
        }));
      };
      reader.readAsDataURL(file);
    }
    // Reset the input
    if (type === "avatar" && avatarInputRef.current) {
      avatarInputRef.current.value = "";
    } else if (type === "banner" && bannerInputRef.current) {
      bannerInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    formData.append("image", data["image"])


    try {
      const response = await axios.put(`/user/${userAuth?.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Usuario actualizado:", response.data);
      onOpenChange();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {() => (
          <>
            <ModalBody>
              <div className=" overflow-hidden">
                {/* Header */}
                <Form onSubmit={handleSubmit} className="p-6">
                  <div className="relative w-full">
                    <div className="h-32 overflow-hidden relative group">
                      <img
                        src={profile.banner}
                        alt="Profile Banner"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <input
                          type="file"
                          ref={bannerInputRef}
                          onChange={(e) => handleImageUpload(e, "banner")}
                          accept="image/*"
                          className="hidden"
                          id="banner-upload"
                          name="banner-upload"
                        />
                        <label
                          htmlFor="banner-upload"
                          className="cursor-pointer bg-gray-900 bg-opacity-75 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-opacity-90 transition-colors"
                        >
                          <BiCamera size={20} />
                          <span>Change Banner</span>
                        </label>
                      </div>
                    </div>
                    <h1 className="text-white text-2xl font-bold absolute bottom-4 left-4">
                      Edit Profile
                    </h1>
                  </div>

                  {/* Avatar Section */}
                  <div className="flex items-center space-x-6 mb-8">
                    <div className="relative -mt-16">
                      <img
                        src={profile.avatar}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-gray-800 shadow-lg object-cover"
                      />
                      <input
                        type="file"
                        ref={avatarInputRef}
                        onChange={(e) => handleImageUpload(e, "avatar")}
                        accept="image/*"
                        className="hidden"
                        name="image"
                        id="avatar-upload"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 bg-emerald-500 p-2 rounded-full text-white hover:bg-emerald-600 transition-colors cursor-pointer"
                      >
                        <BiCamera size={16} />
                      </label>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-200"
                      >
                        Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={user.firstName}
                        className="mt-1 block w-full  text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                      />
                    </div>

                    {/* Bio */}
                    <div>
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-200"
                      >
                        Bio
                      </label>
                      <Textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        value={user.bio}
                        className="mt-1 block w-full  text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                      />
                    </div>

                    {/* Location */}
                    <div className="relative">
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-200"
                      >
                        Location
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <Input
                          startContent={
                            <BiMapPin className="h-5 w-5 text-gray-400" />
                          }
                          type="text"
                          id="location"
                          name="location"
                          value={user.location}
                          className=" w-full text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* Website */}
                    <div className="relative">
                      <label
                        htmlFor="website"
                        className="block text-sm font-medium text-gray-200"
                      >
                        Website
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <Input
                          startContent={<FaLink />}
                          type="text"
                          id="website"
                          name="website"
                          value={user.url}
                          className=" w-full text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {/* Twitter */}
                      <div className="relative">
                        <label
                          htmlFor="twitter"
                          className="block text-sm font-medium text-gray-200"
                        >
                          Twitter
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <Input
                            startContent={
                              <FaTwitter className="h-5 w-5 text-gray-400" />
                            }
                            type="text"
                            id="twitter"
                            name="twitter"
                            className="w-full text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      {/* GitHub */}
                      <div className="relative">
                        <label
                          htmlFor="github"
                          className="block text-sm font-medium text-gray-200"
                        >
                          GitHub
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <Input
                            startContent={
                              <FaGithub className="h-5 w-5 text-gray-400" />
                            }
                            type="text"
                            id="github"
                            name="github"
                            className="w-full text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="mt-8">
                    <button
                      type="submit"
                      className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      <BiSave className="w-5 h-5 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </Form>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;
