import React from "react";
import { send } from "vite";

interface FormResponseProps {
  subject: string;
  body: string;
}
const FormResponse: React.FC<FormResponseProps> = ({ subject, body }) => {
  const [emailSubject, setEmailSubject] = React.useState(subject);
  const [emailBody, setEmailBody] = React.useState(body);
  const sendToEmails = [
    "HOU-PIOWebMail@txdot.gov",
    "info@houstonparksboard.org",
    "districtc@houstontx.gov",
    "mayor@houstontx.gov",
    "publicworks@houstontx.gov",
    "info@bikehouston.org",
    "emily@houstonheights.org",
    "molly.cook@senate.texas.gov",
    "Christina.morales@house.texas.gov",
  ];
  return (
    <div className=" flex flex-col w-full items-center  px-10 py-10 space-y-10 lg:w-3/4 ">
      <h2 className="font-bold text-2xl">Your Email is Ready</h2>
      <p>
        Thanks for taking steps to contact our city officials. We generated a
        unique email for you to send directly to relevant stakeholders.
      </p>

      <div className="flex flex-col space-y-2">
        <h3 className="font-bold text-xl text-left">To:</h3>
        <div className="flex flex-wrap space-x-2">
          {sendToEmails.map((email, i) => (
            <span className="badge m-1" key={i}>
              {email}
            </span>
          ))}
        </div>
      </div>

      <h3 className="w-full font-bold text-xl text-left">Subject:</h3>
      <input
        className="input w-full"
        type="text"
        name="subject"
        id="emailSubject"
        value={emailSubject}
        onChange={(e) => {
          setEmailSubject(e.target.value);
        }}
      />
      <h3 className="w-full font-bold text-xl text-left">Body:</h3>
      <textarea
        className="textarea w-full h-80"
        name="body"
        value={emailBody}
        onChange={(e) => {
          setEmailBody(e.target.value);
        }}
      ></textarea>
      <button className="btn my-10">Send Now</button>
    </div>
  );
};

export default FormResponse;
