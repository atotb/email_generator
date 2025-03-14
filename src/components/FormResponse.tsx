import React from "react";
import { useEffect } from "react";

interface FormResponseProps {
  subject: string;
  body: string;
}
const FormResponse: React.FC<FormResponseProps> = ({ subject, body }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" }); // Scroll to top when the component mounts
    document.body.style.zoom = "1";
  }, []);
  const [emailSubject, setEmailSubject] = React.useState(subject);
  const [emailBody, setEmailBody] = React.useState(body);
  const sendToEmails = [
    "HOU-PIOWebMail@txdot.gov",
    "info@houstonparksboard.org",
    "districtc@houstontx.gov",
    "districth@houstontx.gov",
    "mayor@houstontx.gov",
    "publicworks@houstontx.gov",
    "info@bikehouston.org",
    "emily@houstonheights.org",
    "molly.cook@senate.texas.gov",
    "Christina.morales@house.texas.gov",
  ];
  let encodedSubject = encodeURIComponent(emailSubject);
  let encodedBody = encodeURIComponent(emailBody.replace(/\n/g, "\r\n"));
  let emailLink = `mailto:${sendToEmails}?subject=${encodedSubject}&body=${encodedBody}`;
  let gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${sendToEmails}&su=${encodedSubject}&body=${encodedBody}`;

  console.log("Gmail Link: ", gmailLink);
  console.log("Iphone Email Link: ", emailLink);

  return (
    <div className=" flex flex-col w-full items-center  px-10 py-10 space-y-10 lg:w-3/4 ">
      <h2 className="font-bold text-2xl">Your Email is Ready</h2>
      <p className="">
        Thanks for taking steps to contact our city officials. We generated a
        unique email for you to send directly to relevant stakeholders.
      </p>
      <div className="flex flex-col space-y-2">
        <h3 className="font-bold text-xl text-left">To:</h3>
        <div className="flex flex-wrap space-x-2">
          {sendToEmails.map((email, i) => (
            <span className="badge badge-secondary m-1" key={i}>
              {email}
            </span>
          ))}
        </div>
      </div>
      <h3 className="w-full font-bold text-xl text-left">Subject:</h3>
      <input
        className="input input-secondary text-secondary font-bold dark:text-primary w-full"
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
        className="textarea textarea-secondary text-secondary font-bold dark:text-primary w-full h-80"
        name="body"
        value={emailBody}
        onChange={(e) => {
          setEmailBody(e.target.value);
        }}
      ></textarea>
      <div className="w-full flex flex-col space-y-5 items-start md:flex-row md:justify-between md:space-y-0">
        <div>
          <span>I'm on the computer</span>
          <a
            href={gmailLink}
            target="_blank"
            className="btn btn-wide btn-secondary"
          >
            Gmail on Web
          </a>
        </div>

        <div>
          <span>I'm on my phone</span>
          <a
            href={emailLink}
            target="_blank"
            className="btn btn-wide btn-secondary"
          >
            iPhone
          </a>
        </div>
      </div>
    </div>
  );
};

export default FormResponse;
