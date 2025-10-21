"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function PartnerRegistrationForm() {
  const [formData, setFormData] = useState({
    pharmacyName: "",
    licenseNumber: "",
    address: "",
    contactPerson: "",
    emailAddress: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className=" bg-gray-50 py-16  px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
          Partner Registration Form
        </h1>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Partner Registration Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Pharmacy Name */}
              <div className="space-y-2">
                <Label htmlFor="pharmacyName" className="text-sm font-medium">
                  Pharmacy Name
                </Label>
                <Input
                  id="pharmacyName"
                  name="pharmacyName"
                  type="text"
                  placeholder="Enter your pharmacy name here..."
                  value={formData.pharmacyName}
                  onChange={handleChange}
                  className="bg-gray-50"
                />
              </div>

              {/* License Number */}
              <div className="space-y-2">
                <Label htmlFor="licenseNumber" className="text-sm font-medium">
                  License Number
                </Label>
                <Input
                  id="licenseNumber"
                  name="licenseNumber"
                  type="text"
                  placeholder="Enter your license number here..."
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  className="bg-gray-50"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter your pharmacy address here..."
                  value={formData.address}
                  onChange={handleChange}
                  className="bg-gray-50"
                />
              </div>

              {/* Contact Person */}
              <div className="space-y-2">
                <Label htmlFor="contactPerson" className="text-sm font-medium">
                  Contact Person
                </Label>
                <Input
                  id="contactPerson"
                  name="contactPerson"
                  type="text"
                  placeholder="Enter your contact person's name here..."
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="bg-gray-50"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label htmlFor="emailAddress" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  placeholder="Enter your email address here..."
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="bg-gray-50"
                />
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                className="w-full bg-peter hover:bg-peter-dark text-white py-6 text-base font-medium"
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PartnerRegistrationForm;
