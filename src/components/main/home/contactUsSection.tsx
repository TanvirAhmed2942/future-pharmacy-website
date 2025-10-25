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
import useIcon from "@/hooks/useIcon";

function ContactUsSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
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
      subject: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Message sent:", formData);
    // Handle form submission logic here
  };

  return (
    <section className=" py-16 md:py-24 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Contact Us
        </h1>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Visit Our Store */}
          <Card className="shadow-sm border-gray-200 hover:border-[#8d4585]">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-6">
                {useIcon({ name: "map_fill" })}
              </div>
              <h3 className="font-semibold text-2xl text-gray-900 mb-3">
                Visit Our Store
              </h3>
              <p className="text-gray-600 text-lg mb-4">
                2972 Westheimer Rd. Santa Ana, Illinois 85486
              </p>
              <div className="space-y-2 pt-4">
                <p className="font-semibold text-gray-900 text-2xl mb-2">
                  Hours:
                </p>
                <p className="text-gray-600 text-lg">Mon-Fri: 8AM-8PM</p>
                <p className="text-gray-600 text-lg">Sat: 9AM-4PM</p>
                <p className="text-gray-600 text-lg">Sun: 9AM-8PM</p>
              </div>
            </CardContent>
          </Card>

          {/* Call US */}
          <Card className="shadow-sm border-gray-200 hover:border-[#8d4585] hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-6">
                {useIcon({ name: "phone" })}
              </div>

              <h3 className="font-semibold text-2xl text-gray-900 mb-3">
                Call US
              </h3>
              <div className="space-y-4 ">
                <div>
                  <p className="font-medium text-gray-900 text-lg">
                    Main Line:
                  </p>
                  <p className="text-gray-600 text-lg">917-993-0549</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-lg">
                    Main Patients:
                  </p>
                  <p className="text-gray-600 text-lg">917-993-0549</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-lg">
                    Emergency:
                  </p>
                  <p className="text-gray-600 text-lg">917-993-0549</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Us */}
          <Card className="shadow-sm border-gray-200 hover:border-[#8d4585]">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-6">
                {useIcon({ name: "message" })}
              </div>
              <h3 className="font-semibold text-2xl text-gray-900 mb-3">
                Email Us
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-lg text-gray-900">General:</p>
                  <p className="text-gray-600 text-lg">info@optimus.com</p>
                </div>
                <div>
                  <p className="font-medium text-lg text-gray-900">
                    Prescriptions:
                  </p>
                  <p className="text-gray-600 text-lg">rx@optimus.com</p>
                </div>
                <div>
                  <p className="font-medium text-lg text-gray-900">Support:</p>
                  <p className="text-gray-600 text-lg">support@optimus.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Send Us a Message Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Send Us a Message
          </h2>

          <Card className="shadow-lg border-gray-200 bg-white">
            <CardContent className="p-6 md:p-8">
              <div className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg    font-medium">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name here..."
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-50 placeholder:text-[16px] h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email here..."
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-50 placeholder:text-[16px] h-12"
                    />
                  </div>
                </div>

                {/* Phone and Subject Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-lg font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter phone number here..."
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-gray-50 placeholder:text-[16px] h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-lg font-medium">
                      Subject
                    </Label>
                    <Select onValueChange={handleSelectChange}>
                      <SelectTrigger className="bg-gray-50 placeholder:text-[16px] h-12">
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="prescription">
                          Prescription Question
                        </SelectItem>
                        <SelectItem value="delivery">Delivery Issue</SelectItem>
                        <SelectItem value="partnership">
                          Partnership Opportunity
                        </SelectItem>
                        <SelectItem value="support">
                          Technical Support
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-lg font-medium">
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-gray-50 placeholder:text-[16px] min-h-[120px] resize-none"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleSubmit}
                    className="bg-peter hover:bg-peter-dark text-white px-8 py-5 text-base font-medium"
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default ContactUsSection;
