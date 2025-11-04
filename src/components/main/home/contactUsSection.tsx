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
    <section className="  py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-4">
        {/* Send Us a Message Form */}
        <div id="contact-us" className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Send Us a Message
          </h2>

          <Card className="shadow-lg p-2 border-gray-200 bg-white ">
            <CardContent className="p-6">
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
                      className="bg-gray-50 placeholder:text-[14px] h-11"
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
                      className="bg-gray-50 placeholder:text-[14px] h-11"
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
                      className="bg-gray-50 placeholder:text-[14px] h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-lg font-medium">
                      Subject
                    </Label>
                    <Select onValueChange={handleSelectChange}>
                      <SelectTrigger className="bg-gray-50 placeholder:text-[14px] h-11 text-[14px]">
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
                    className="bg-gray-50 placeholder:text-[14px] min-h-[120px] resize-none h-11"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center ">
                  <Button
                    onClick={handleSubmit}
                    className="bg-peter hover:bg-peter-dark text-white px-8 py-4 text-base font-medium"
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
