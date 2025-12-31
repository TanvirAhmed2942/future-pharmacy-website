"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProfileInfoEditModal from "./profileInfoEditModal";
import { imgUrl } from "@/lib/img_url";

type PersonalInfoProps = {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  profile: string;
};
export default function PersonalInfo({
  personalInfo,
}: {
  personalInfo: PersonalInfoProps;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Use the same logic as navbar for consistency
  const profileImage = personalInfo.profile
    ? imgUrl(personalInfo.profile) || "/testimonials/user.png"
    : "/testimonials/user.png";

  // Use fallback image if there's an error or no profile image
  const displayImage =
    imageError || !profileImage || profileImage === "/testimonials/user.png"
      ? "/testimonials/user.png"
      : profileImage;

  // Check if image is external (http/https) for unoptimized prop
  const isExternalImage =
    profileImage.startsWith("http://") || profileImage.startsWith("https://");
  return (
    <>
      <div className="w-full mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-8">
          {/* Mobile Layout */}
          <div className="block sm:hidden">
            <div className="flex flex-col items-center space-y-6">
              {/* Profile Image */}
              <div className="flex-shrink-0 aspect-square">
                <Image
                  src={displayImage}
                  alt="Profile"
                  width={500}
                  height={500}
                  quality={100}
                  className="w-full h-full rounded-full object-cover"
                  onError={() => setImageError(true)}
                  unoptimized={isExternalImage}
                />
              </div>

              {/* Profile Information - Mobile Grid */}
              <div className="w-full grid grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">First Name</p>
                  <p className="text-base font-medium text-gray-900">
                    {personalInfo.firstName}
                  </p>
                </div>

                {/* Last Name */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Last Name</p>
                  <p className="text-base font-medium text-gray-900">
                    {personalInfo.lastName}
                  </p>
                </div>

                {/* Gender */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Gender</p>
                  <p className="text-base font-medium text-gray-900">
                    {personalInfo.gender}
                  </p>
                </div>

                {/* Email Address */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-base font-medium text-gray-900 break-words">
                    {personalInfo.email}
                  </p>
                </div>

                {/* Phone Number */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="text-base font-medium text-gray-900">
                    {personalInfo.phone}
                  </p>
                </div>

                {/* DOB */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">DOB</p>
                  <p className="text-base font-medium text-gray-900">
                    {personalInfo.dateOfBirth}
                  </p>
                </div>
              </div>

              {/* Edit Profile Button - Mobile */}
              <div className="w-full">
                <Button
                  className="bg-peter hover:bg-peter-dark text-white w-full cursor-pointer"
                  onClick={() => setIsOpen(true)}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:block">
            <div className="flex items-start gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <Image
                  src={displayImage}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full border-2 border-gray-200 object-cover"
                  onError={() => setImageError(true)}
                  unoptimized={isExternalImage}
                />

                {/* <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                /> */}
              </div>

              {/* Profile Information */}
              <div className="flex-1 grid grid-cols-3 gap-x-12 gap-y-6">
                {/* First Name */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">First Name</p>
                  <p className="text-base font-medium text-gray-900">
                    {personalInfo.firstName}
                  </p>
                </div>

                {/* Last Name */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Last Name</p>
                  <p className="text-base font-medium text-gray-900">
                    {personalInfo.lastName}
                  </p>
                </div>

                {/* Gender */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Gender</p>
                  <p className="text-base font-medium text-gray-900">
                    {personalInfo.gender}
                  </p>
                </div>

                {/* Email Address */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <p className="text-base font-medium text-gray-900">
                    {personalInfo.email}
                  </p>
                </div>

                {/* Phone Number */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                  <p className="text-base font-medium text-gray-900">
                    {personalInfo.phone}
                  </p>
                </div>

                {/* DOB */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">DOB</p>
                  <p className="text-base font-medium text-gray-900">
                    {personalInfo.dateOfBirth}
                  </p>
                </div>
              </div>

              {/* Edit Profile Button */}
              <div className="flex-shrink-0">
                <Button
                  className="bg-peter hover:bg-peter-dark text-white px-6 cursor-pointer"
                  onClick={() => setIsOpen(true)}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Edit Modal */}
        <ProfileInfoEditModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </>
  );
}
