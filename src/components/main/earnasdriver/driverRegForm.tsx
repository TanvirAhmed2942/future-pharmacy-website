"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function DriverRegForm() {
  const [formData, setFormData] = useState({
    name: "",
    emailAddress: "",
    phoneNumber: "",
    zipCode: "",
    vehicleType: "",
    otherVehicleType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      vehicleType: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="bg-white py-10 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-center mb-6">
              Apply to become a Driver
            </h2>

            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <Label htmlFor="name" className="text-sm text-gray-700">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name here..."
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 bg-gray-50"
                />
              </div>

              {/* Email Address Field */}
              <div>
                <Label htmlFor="emailAddress" className="text-sm text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  placeholder="Enter your email address here..."
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="mt-1 bg-gray-50"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <Label htmlFor="phoneNumber" className="text-sm text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number here..."
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 bg-gray-50"
                />
              </div>

              {/* Zip Code Field */}
              <div>
                <Label htmlFor="zipCode" className="text-sm text-gray-700">
                  Zip Code
                </Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  placeholder="Enter your zip code here..."
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="mt-1 bg-gray-50"
                />
              </div>

              {/* Vehicle Type Field */}
              <div>
                <Label htmlFor="vehicleType" className="text-sm text-gray-700">
                  Vehicle Type
                </Label>
                <Select
                  value={formData.vehicleType}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="mt-1 bg-gray-50">
                    <SelectValue placeholder="Select your vehicle type here..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="motorcycle">Motorcycle</SelectItem>
                    <SelectItem value="bicycle">Bicycle</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Other Vehicle Type Field - Conditional */}
              {formData.vehicleType === "others" && (
                <div>
                  <Label
                    htmlFor="otherVehicleType"
                    className="text-sm text-gray-700"
                  >
                    Specify Other Vehicle Type
                  </Label>
                  <Input
                    id="otherVehicleType"
                    name="otherVehicleType"
                    type="text"
                    placeholder="Please specify your vehicle type..."
                    value={formData.otherVehicleType}
                    onChange={handleChange}
                    className="mt-1 bg-gray-50"
                  />
                </div>
              )}

              {/* Message Field */}
              <div>
                <Label htmlFor="message" className="text-sm text-gray-700">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 bg-gray-50 min-h-[100px]"
                />
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                className="w-full bg-peter hover:bg-peter-dark text-white py-2 cursor-pointer"
              >
                Submit Interest
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DriverRegForm;
