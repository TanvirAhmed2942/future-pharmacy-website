"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Cloud } from "lucide-react";
import { BiCloudUpload } from "react-icons/bi";
function PartnerRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    emailAddress: "",
    vehicleType: "",
    licenseFile: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      licenseFile: file,
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
          Driver Registration Form
        </h1>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Driver Registration Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name here..."
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border-gray-200 focus:border-peter focus:ring-peter/20"
                />
              </div>

              {/* Email Address Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="emailAddress"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </Label>
                <Input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  placeholder="Enter your email address here..."
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="bg-gray-50 border-gray-200 focus:border-peter focus:ring-peter/20"
                />
              </div>

              {/* Vehicle Type Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="vehicleType"
                  className="text-sm font-medium text-gray-700"
                >
                  Vehicle Type
                </Label>
                <Select
                  value={formData.vehicleType}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-peter focus:ring-peter/20">
                    <SelectValue placeholder="Select your vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="motorcycle">Motorcycle</SelectItem>
                    <SelectItem value="bicycle">Bicycle</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Upload License Section */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Upload License
                </Label>
                <div className="border-2 border-dashed border-peter rounded-lg p-8 text-center hover:bg-peter/5 transition-colors">
                  <div className="flex flex-col items-center space-y-4">
                    <Cloud className="w-12 h-12 text-peter" />
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Upload License
                      </h3>
                      <p className="text-sm text-peter">
                        Drag and drop or click to upload{" "}
                        {formData.licenseFile
                          ? formData.licenseFile.name
                          : "Image or PDF"}
                      </p>
                    </div>
                    <input
                      type="file"
                      id="licenseFile"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-blue-900/90 hover:bg-blue-900 hover:text-white cursor-pointer text-white "
                      onClick={() =>
                        document.getElementById("licenseFile")?.click()
                      }
                    >
                      <BiCloudUpload className="w-4 h-4 mr-2" />
                      Upload File
                    </Button>
                  </div>
                </div>
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
