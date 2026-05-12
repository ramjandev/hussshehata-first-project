import CommonButton from "@/common/button/CommonButton";
import CommonSwitch from "@/common/custom/CommonSwitch";
import DashboardTopSection from "@/common/DashboardTopSection";
import CommonHeader from "@/common/header/CommonHeader";
import { inputClass } from "@/components/programManagement/modal/showExerciseModal";
import React, { useState } from "react";

interface NotificationTemplate {
  id: string;
  name: string;
  category: string;
  enabled: boolean;
}

interface NotificationFormData {
  targetAudience: string;
  title: string;
  message: string;
}

const Settings: React.FC = () => {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([
    {
      id: "1",
      name: "Workout Reminder",
      category: "Engagement",
      enabled: true,
    },
    {
      id: "2",
      name: "Milestone Achievement",
      category: "Motivation",
      enabled: false,
    },
    {
      id: "3",
      name: "New Program Available",
      category: "Marketing",
      enabled: true,
    },
    { id: "4", name: "Premium Offer", category: "Marketing", enabled: false },
    {
      id: "5",
      name: "Weekly Progress Summary",
      category: "Engagement",
      enabled: true,
    },
  ]);

  const [formData, setFormData] = useState<NotificationFormData>({
    targetAudience: "",
    title: "",
    message: "",
  });

  const toggleTemplate = (id: string) => {
    setTemplates(
      templates.map((template) =>
        template.id === id
          ? { ...template, enabled: !template.enabled }
          : template,
      ),
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="">
      <DashboardTopSection
        title="Analytics & Reports"
        description="Track performance metrics and insights"
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <CommonHeader size="lg">Push Notification Templates</CommonHeader>

        <div className="space-y-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-900 font-medium">
                  {template.name}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium bg-[#DBEAFE] text-[#1447E6] hidden md:block`}
                >
                  {template.category}
                </span>
              </div>

              <CommonSwitch
                checked={template.enabled}
                onChange={() => {
                  toggleTemplate(template.id);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <CommonHeader size="lg">Send Custom Notification</CommonHeader>
        <div className="space-y-4 pt-2">
          <div>
            <label htmlFor="targetAudience" className={inputClass.label}>
              Target Audience
            </label>
            <input
              type="text"
              id="targetAudience"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleInputChange}
              className={inputClass.input}
              placeholder="target audience..."
            />
          </div>

          <div>
            <label htmlFor="title" className={inputClass.label}>
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={inputClass.input}
              placeholder="Notification title..."
            />
          </div>

          <div>
            <label htmlFor="message" className={inputClass.label}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className={inputClass.input}
              placeholder="Notification message..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <CommonButton className="w-full">Send Now</CommonButton>
            <CommonButton
              variant="secondary"
              className="border border-[#D1D5DC]! text-[#0A0A0A]!"
            >
              Schedule
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
