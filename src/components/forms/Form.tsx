"use client";
import React from "react";
import FormResponse from "../FormResponse";
import { useFormLogic } from "../UseFormLogic";
import { createNotionPage, sendWebhook } from "../../api/api";

const Form = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    closuresSelection,
    handleClosureChange,
    neighborhood,
    setNeighborhood,
    otherComments,
    setOtherComments,
    trailUsagesSelection,
    handleUsageChange,
    isLoading,
    setIsLoading,
    emailSubject,
    setEmailSubject,
    emailBody,
    setEmailBody,
    submitted,
    setSubmitted,
  } = useFormLogic();
  const trailUsages = [
    "I use it to go to work",
    "I bike there",
    "I walk there",
    "I walk my dog there",
    "I run errands using the trail",
    "I use it with family and kids",
    "My running group runs there",
  ];
  const neighborhoods = [
    "Houston Heights",
    "Woodland Heights",
    "Timbergrove/Lazybrook",
    "Cottage Grove",
    "Washington Ave",
    "Northside",
    "Downtown",
    "Other",
  ];
  const activeTrailClosures = [
    {
      name: "MKT Studewood Bridge",
      description: "White Oak Bayou Under Studewood Bridge",
    },
    {
      name: "MKT Hogan Bridge",
      description: "White Oak Bayou Under Hogan Bridge",
    },
    {
      name: "White Oak Bayou Under Hogan Bridge",
      description: "White Oak Bayou Under Hogan Bridge",
    },
    {
      name: "White Oak Bayou at Studemont due to I-10 Construction",
      description: "White Oak Bayou Under Hogan Bridge",
    },
    {
      name: "Houston Avenue Bridge Over I-10",
      description: "White Oak Bayou Under Hogan Bridge",
    },
    {
      name: "White Oak Bayou Yale/Heights due to North Canal Construction",
      description: "White Oak Bayou Under Hogan Bridge",
    },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    console.log({
      name,
      email,
      closuresSelection,
      neighborhood,
      otherComments,
      trailUsagesSelection,
    });
    const formData = {
      Name: { title: [{ text: { content: name } }] },
      Email: { email },
      "Active Trail Closure in Plain Text": {
        multi_select: closuresSelection.map((closure) => ({ name: closure })),
      },
      "How do you use the trail?": {
        multi_select: trailUsagesSelection.map((usage) => ({ name: usage })),
      },
      "Which neighborhood do you live in?": {
        multi_select: [{ name: neighborhood }],
      },
      "Anything else you want to mention?": {
        rich_text: [{ text: { content: otherComments } }],
      },
    };
    try {
      // console.log("Form Data:", formData);
      const notionData = await createNotionPage(formData);
      console.log("Notion Data:", notionData);
      if (notionData) {
        console.log("Notion table ID:", notionData.id);
        const webhookResponse = await sendWebhook(notionData, formData);
        console.log("webhook response data:", webhookResponse.response.data);

        setEmailSubject(webhookResponse.response.subject);
        setEmailBody(webhookResponse.response.email_body);
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {submitted ? (
        <FormResponse subject={emailSubject} body={emailBody}></FormResponse>
      ) : (
        <div className="px-10 py-10 flex flex-col items-center space-y-10">
          <h1 className="text-4xl text-center font-bold">
            Fill Form to Generate Personalized Email
          </h1>
          <form
            className="flex flex-col space-y-4 w-full max-w-lg"
            onSubmit={handleSubmit}
          >
            <label htmlFor="" className="font-bold text-xl">
              Name:
              <input
                required
                className="input w-full"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label htmlFor="" className="font-bold text-xl">
              Email:
              <input
                required
                className="input w-full"
                type="text"
                placeholder="john@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <div>
              <h3 className="font-bold text-xl">
                Which of the Active Trail Closures affect you?
              </h3>
              <div className="flex flex-col space-y-2">
                <p className="mt-3 mb-5">(Select as many as you like)</p>
                {activeTrailClosures.map((closure, i) => (
                  <label className="" key={`closure-${i}`}>
                    <input
                      className="checkbox mr-2"
                      type="checkbox"
                      name="trailClosures"
                      value={closure.name}
                      onChange={(e) => handleClosureChange(e.target.value)}
                    />
                    {closure.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="font-bold text-xl">How do you use the trail?</h3>
              {trailUsages.map((usage, i) => (
                <label className="" key={`usage-${i}`}>
                  <input
                    className="checkbox mr-2"
                    type="checkbox"
                    name="trailUsage"
                    value={usage}
                    onChange={(e) => handleUsageChange(e.target.value)}
                  />
                  {usage}
                </label>
              ))}
            </div>

            <div className="flex flex-col space-y-2">
              <h3 className="font-bold text-xl">
                Which neighborhood do you live in?
              </h3>
              {neighborhoods.map((neighborhood, i) => (
                <label className="" key={`neighborhood-${i}`}>
                  <input
                    className="radio mr-2"
                    type="radio"
                    name="neighborhood"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                  />
                  {neighborhood}
                </label>
              ))}
            </div>

            <h3 className="font-bold text-xl">
              Anything else you want to mention?
            </h3>
            <textarea
              className="textarea w-full h-32"
              placeholder="Additional Comments"
              value={otherComments}
              onChange={(e) => setOtherComments(e.target.value)}
            ></textarea>
            <button type="submit" className="btn my-10" disabled={isLoading}>
              {isLoading ? (
                <span className="loading loading-infinity loading-lg"></span>
              ) : (
                "Send Now"
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Form;
