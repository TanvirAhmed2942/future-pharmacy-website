"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function BusinessInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    emailAddress: "",
    organizationName: "",
    businessType: "",
    otherBusinessType: "",
    availability: "",
    regionOfInterest: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
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
      businessType: value,
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
          <CardContent className="pt-6 pb-6">
            <h2 className="text-xl font-semibold text-center mb-6">
              Business Inquiry Form
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

              {/* Organization Name Field */}
              <div>
                <Label
                  htmlFor="organizationName"
                  className="text-sm text-gray-700"
                >
                  Organization name
                </Label>
                <Input
                  id="organizationName"
                  name="organizationName"
                  type="text"
                  placeholder="Select your organization name..."
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="mt-1 bg-gray-50"
                />
              </div>

              {/* Business Type Field */}
              <div>
                <Label htmlFor="businessType" className="text-sm text-gray-700">
                  Business Type
                </Label>
                <Select
                  value={formData.businessType}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="mt-1 bg-gray-50 text-[14px]">
                    <SelectValue placeholder="Select your business type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employers">Employers</SelectItem>
                    <SelectItem value="health-plans">Health Plans</SelectItem>
                    <SelectItem value="providers-health-systems">
                      Providers/Health Systems
                    </SelectItem>
                    <SelectItem value="mocs">MOCs</SelectItem>
                    <SelectItem value="acos">ACOs</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Other Business Type Field - Conditional */}
              {formData.businessType === "others" && (
                <div>
                  <Label
                    htmlFor="otherBusinessType"
                    className="text-sm text-gray-700"
                  >
                    Specify Other Business Type
                  </Label>
                  <Input
                    id="otherBusinessType"
                    name="otherBusinessType"
                    type="text"
                    placeholder="Please specify your business type..."
                    value={formData.otherBusinessType}
                    onChange={handleChange}
                    className="mt-1 bg-gray-50"
                  />
                </div>
              )}

              {/* Availability Field */}
              <div>
                <Label htmlFor="availability" className="text-sm text-gray-700">
                  Availability
                </Label>
                <Input
                  id="availability"
                  name="availability"
                  type="text"
                  placeholder="Enter your availability here..."
                  value={formData.availability}
                  onChange={handleChange}
                  className="mt-1 bg-gray-50"
                />
              </div>

              {/* Region of Interest Field */}
              <div>
                <Label
                  htmlFor="regionOfInterest"
                  className="text-sm text-gray-700"
                >
                  Region of Interest
                </Label>
                <Textarea
                  id="regionOfInterest"
                  name="regionOfInterest"
                  placeholder="Type your message here..."
                  value={formData.regionOfInterest}
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

export default BusinessInquiryForm;
