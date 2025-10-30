"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Laptop, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import RefillTransferScheduleForm from "@/components/common/refilltransferscheduleform/refilltransferscheduleform";
import LoginChoiceModal from "@/components/common/refilltransferscheduleform/LoginChoiceModal";
import { useAuth } from "@/userInfo.authProvide";

import useIcon from "@/hooks/useIcon";
interface RefillOption {
  title: string;
  description: string;
  buttonText: string;
  icon: "laptop" | "phone" | "globe";
  onClick?: () => void;
}

interface RefillTransferScheduleProps {
  pageTitle?: string;
  refillOptions: RefillOption[];
}

function RefillTransferSchedule({
  pageTitle = "Refill Your Prescription",
  refillOptions,
}: RefillTransferScheduleProps) {
  const router = useRouter();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isLoginChoiceModalOpen, setIsLoginChoiceModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  // Pre-fetch the globe icon
  const globeIcon = useIcon({ name: "globe" });

  const handleOnlineClick = () => {
    if (isLoggedIn) {
      // User is logged in, show form directly
      setIsFormModalOpen(true);
    } else {
      // User is not logged in, show login choice modal
      setIsLoginChoiceModalOpen(true);
    }
  };

  const handleSignIn = () => {
    setIsLoginChoiceModalOpen(false);
    router.push("/auth/login");
  };

  const handleGuestCheckout = () => {
    setIsLoginChoiceModalOpen(false);
    setIsFormModalOpen(true);
  };

  const handleFormNext = (formData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    countryCode: string;
    dateOfBirth: string;
  }) => {
    console.log("Form data:", formData);
    // Handle form submission logic here
    setIsFormModalOpen(false);
  };

  const steps = [
    {
      title: "Complete Refill From",
      description:
        "Fill out our secure online refill form with your prescription details",
    },
    {
      title: "We contact your pharmacy",
      description:
        "Our team will contact your pharmacy to refill your prescriptions",
    },
    {
      title: "Prescription Ready",
      description:
        "We'll notify you when your prescriptions are ready for delivery",
    },
  ];

  return (
    <section className="bg-white py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-6 md:mb-12">
          {pageTitle}
        </h1>

        <div className="mb-12">
          <p className="text-gray-800 text-sm md:text-base mb-6 text-center md:text-left">
            Need help? please call or text us at 917-993-0549
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 flex items-start gap-x-3 shadow-sm"
              >
                <div className="min-w-7 min-h-7 rounded-full bg-peter flex items-center justify-center text-white mt-0.5">
                  {index + 1}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 ">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base ">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {refillOptions.map((option, index) => (
            <Card key={index} className="bg-gray-50 border-none shadow-sm">
              <CardContent className="p-8 md:p-10 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div>
                    {option.icon === "laptop" ? (
                      <Laptop className="w-12 h-12 text-peter" />
                    ) : option.icon === "phone" ? (
                      <Phone className="w-12 h-12 text-peter" />
                    ) : option.icon === "globe" ? (
                      globeIcon
                    ) : null}
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {option.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base mb-6">
                  {option.description}
                </p>

                {/* Button */}
                <Button
                  className="bg-peter hover:bg-peter-dark text-white px-8 py-5 text-base font-medium cursor-pointer"
                  onClick={
                    option.title === "Refill Online" ||
                    option.title === "Transfer Online" ||
                    option.title === "Schedule Online"
                      ? handleOnlineClick
                      : option.onClick
                  }
                >
                  {option.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modals */}
      <RefillTransferScheduleForm
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onNext={handleFormNext}
      />

      <LoginChoiceModal
        isOpen={isLoginChoiceModalOpen}
        onClose={() => setIsLoginChoiceModalOpen(false)}
        onSignIn={handleSignIn}
        onGuestCheckout={handleGuestCheckout}
        description={`To continue with your ${pageTitle}, please choose one of the following options:`}
      />
    </section>
  );
}

export default RefillTransferSchedule;
