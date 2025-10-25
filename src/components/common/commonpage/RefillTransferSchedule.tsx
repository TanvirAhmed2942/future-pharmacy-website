"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Laptop, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import RefillTransferScheduleForm from "@/components/common/refilltransferscheduleform/refilltransferscheduleform";
import LoginChoiceModal from "@/components/common/refilltransferscheduleform/LoginChoiceModal";
import { useAuth } from "@/userInfo.authProvide";
interface RefillOption {
  title: string;
  description: string;
  buttonText: string;
  icon: "laptop" | "phone";
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

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          {pageTitle}
        </h1>

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
                    ) : (
                      <Phone className="w-12 h-12 text-peter" />
                    )}
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
