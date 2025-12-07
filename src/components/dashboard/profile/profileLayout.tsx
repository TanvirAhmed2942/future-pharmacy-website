"use client";
import React from "react";
import PersonalInfo from "./personalInfo";
import PasswordAnd2FA from "./passwordAnd2F";
import ActivityLog from "./acitvityLog";
import { useGetProfileQuery } from "@/store/Apis/profileApi/profileApi";
function ProfileLayout() {
  const { data: profile } = useGetProfileQuery();
  console.log(profile?.data);
  const personalInfo = {
    firstName: profile?.data?.first_name || "N/A",
    lastName: profile?.data?.last_name || "N/A",
    gender: profile?.data?.gender || "N/A",
    email: profile?.data?.email || "N/A",
    phone: profile?.data?.phone || "N/A",
    dateOfBirth: profile?.data?.dateOfBirth || "N/A",
    profile: profile?.data?.profile || "",
  };

  console.log("personalInfo", personalInfo);
  const twofaInfo = {
    twoStepVerification: profile?.data?.twoStepVerification || false,
  };
  console.log("twofaInfo", twofaInfo);
  return (
    <div className="bg-white space-y-6">
      <PersonalInfo personalInfo={personalInfo} />
      <PasswordAnd2FA twofaInfo={twofaInfo} />
      <ActivityLog />
    </div>
  );
}

export default ProfileLayout;
