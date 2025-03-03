import { useState } from "react";

export function useFormLogic() {
  const [name, setName] = useState("Chris");
  const [email, setEmail] = useState("chris@systumboost.com");
  const [closuresSelection, setClosures] = useState<string[]>([
    "MKT Studewood Bridge",
  ]);
  const [neighborhood, setNeighborhood] = useState("Timbergrove/Lazybrook");
  const [otherComments, setOtherComments] = useState(
    "Someone Died the other day walking the detour"
  );
  const [trailUsagesSelection, setTrailUsage] = useState<string[]>([
    "I use it to go to work",
    "I bike there",
    "I walk there",
    "I walk my dog there",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClosureChange = (value: string) => {
    setClosures((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const handleUsageChange = (value: string) => {
    setTrailUsage((prev) =>
      prev.includes(value) ? prev.filter((u) => u !== value) : [...prev, value]
    );
  };

  return {
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
  };
}
