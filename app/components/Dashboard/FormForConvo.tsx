"use client";
import { Button } from "@/components/ui/button";
import { createStartupConvo } from "@/lib/server/appwrite";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const StartupForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    startupName: "",
    startupDescription: "",
    industrySector: "",
    stageOfStartup: "",
    purposeOfFunding: "",
    countryRegion: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors on change
  };

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.startupName)
      newErrors.startupName = "Startup Name is required";
    if (!formData.startupDescription)
      newErrors.startupDescription = "Startup Description is required";
    if (!formData.industrySector)
      newErrors.industrySector = "Industry/Sector is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.stageOfStartup)
      newErrors.stageOfStartup = "Stage of Startup is required";

    if (!formData.purposeOfFunding)
      newErrors.purposeOfFunding = "Purpose of Funding is required";
    if (!formData.countryRegion)
      newErrors.countryRegion = "Country/Region is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (validateStep2() && validateStep1()) {
        console.log(formData);
        // Handle form submission logic here
        const res = await fetch(`/api/assistants/threads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        const convo = await createStartupConvo({
          startupName: formData.startupName,
          startupDescription: formData.startupDescription,
          industrySector: formData.industrySector,
          stageOfStartup: formData.stageOfStartup,
          purposeOfFunding: formData.purposeOfFunding,
          countryRegion: formData.countryRegion,
          threadId: data.threadId,
        });
        console.log(convo);
        if (convo) {
          router.push(`/dashboard/${convo.$id}`);
        }
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create startup convo. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className=" p-4">
      <h2 className="text-2xl font-bold mb-6">Startup Information</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <div className="mb-4">
              <label
                htmlFor="startupName"
                className="block text-sm font-medium"
              >
                Startup Name
              </label>
              <input
                type="text"
                id="startupName"
                name="startupName"
                value={formData.startupName}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.startupName ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-black`}
              />
              {errors.startupName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.startupName}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="startupDescription"
                className="block text-sm font-medium"
              >
                Startup Description
              </label>
              <textarea
                id="startupDescription"
                name="startupDescription"
                value={formData.startupDescription}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.startupDescription
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-black`}
                rows={4}
              />
              {errors.startupDescription && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.startupDescription}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="industrySector"
                className="block text-sm font-medium"
              >
                Industry/Sector
              </label>
              <input
                type="text"
                id="industrySector"
                name="industrySector"
                value={formData.industrySector}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.industrySector ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-black`}
              />
              {errors.industrySector && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.industrySector}
                </p>
              )}
            </div>

            <div className=" flex justify-end">
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-4">
              <label
                htmlFor="stageOfStartup"
                className="block text-sm font-medium"
              >
                Stage of Startup
              </label>
              <select
                id="stageOfStartup"
                name="stageOfStartup"
                value={formData.stageOfStartup}
                onChange={(e) => {
                  setFormData({ ...formData, stageOfStartup: e.target.value });
                  setErrors({ ...errors, stageOfStartup: "" }); // Clear errors on change
                }}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.stageOfStartup ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-black`}
              >
                <option value="">Select Stage of Startup</option>
                <option value="Idea/Concept">Idea/Concept</option>
                <option value="Prototype/MVP">Prototype/MVP</option>
                <option value="Early Stage">Early Stage</option>
                <option value="Growth Stage">Growth Stage</option>
                <option value="Established">Established</option>
                <option value="Pre-Seed">Pre-Seed</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
                <option value="Series B and Beyond">Series B and Beyond</option>
              </select>
              {errors.stageOfStartup && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.stageOfStartup}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="purposeOfFunding"
                className="block text-sm font-medium"
              >
                Purpose of Funding
              </label>
              <select
                id="purposeOfFunding"
                name="purposeOfFunding"
                value={formData.purposeOfFunding}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    purposeOfFunding: e.target.value,
                  });
                  setErrors({ ...errors, purposeOfFunding: "" }); // Clear errors on change
                }}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.purposeOfFunding ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-black`}
              >
                <option value="">Select Purpose of Funding</option>
                <option value="Product Development">Product Development</option>
                <option value="Marketing and Sales">Marketing and Sales</option>
                <option value="Hiring and Team Expansion">
                  Hiring and Team Expansion
                </option>
                <option value="Research and Development">
                  Research and Development
                </option>
                <option value="Market Expansion">Market Expansion</option>
                <option value="Operational Costs">Operational Costs</option>
                <option value="Technology Upgrades">Technology Upgrades</option>
                <option value="Inventory and Supplies">
                  Inventory and Supplies
                </option>
                <option value="Legal and Compliance">
                  Legal and Compliance
                </option>
                <option value="Debt Repayment">Debt Repayment</option>
              </select>

              {errors.purposeOfFunding && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.purposeOfFunding}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="countryRegion"
                className="block text-sm font-medium"
              >
                Country/Region
              </label>
              <input
                type="text"
                id="countryRegion"
                name="countryRegion"
                value={formData.countryRegion}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.countryRegion ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-gray-500                 focus:border-gray-500 sm:text-sm text-black`}
              />
              {errors.countryRegion && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.countryRegion}
                </p>
              )}
            </div>

            <div className="mt-1 flex justify-between">
              <Button type="button" onClick={handleBack} disabled={loading}>
                Back
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating Startup Convo..." : "Create Startup Convo"}
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default StartupForm;
