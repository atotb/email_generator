import { useState } from "react";

export function useFormLogic() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [closuresSelection, setClosures] = useState<string[]>([]);
  const [neighborhood, setNeighborhood] = useState("");
  const [otherComments, setOtherComments] = useState("");
  const [trailUsagesSelection, setTrailUsage] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [closureError, setClosureError] = useState<string | null>(null);
  const [usageError, setUsageError] = useState<string | null>(null);
  const [formSubmissionError, setFormSubmissionError] = useState<string | null>(
    null
  );
  const [neighborhoodError, setneighborhoodError] = useState<string | null>(
    null
  );

  const handleClosureChange = (value: string) => {
    setClosures((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
    setClosureError(null); // Clear error when user selects an option
  };

  const handleUsageChange = (value: string) => {
    setTrailUsage((prev) =>
      prev.includes(value) ? prev.filter((u) => u !== value) : [...prev, value]
    );
    setUsageError(null); // Clear error when user selects an option
  };
  const handleNeighborhoodChange = (value: string) => {
    setNeighborhood(value);
    setneighborhoodError(null); // Clear error when user selects an option
  };

  return {
    name,
    setName,
    email,
    setEmail,
    closuresSelection,
    handleClosureChange,
    neighborhood,
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
    closureError,
    setClosureError,
    usageError,
    setUsageError,
    formSubmissionError,
    setFormSubmissionError,
    neighborhoodError,
    setneighborhoodError,
    handleNeighborhoodChange,
  };
}
