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
import { Textarea } from "@/components/ui/textarea";

function InvestorsInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    emailAddress: "",
    investmentInterest: "",
    message: "",
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
      investmentInterest: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
          Investor Inquiry Form
        </h1>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Investor Inquiry Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name here..."
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50"
                />
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="Enter your company name here..."
                  value={formData.companyName}
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

              {/* Investment Interest */}
              <div className="space-y-2">
                <Label
                  htmlFor="investmentInterest"
                  className="text-sm font-medium"
                >
                  Investment Interest
                </Label>
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className="bg-gray-50">
                    <SelectValue placeholder="Select Investment Interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seed">Seed Round</SelectItem>
                    <SelectItem value="series-a">Series A</SelectItem>
                    <SelectItem value="series-b">Series B</SelectItem>
                    <SelectItem value="series-c">Series C</SelectItem>
                    <SelectItem value="strategic">
                      Strategic Investment
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Your Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleChange(
                      e as unknown as React.ChangeEvent<HTMLInputElement>
                    )
                  }
                  className="bg-gray-50 min-h-[120px] resize-none"
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

export default InvestorsInquiryForm;
