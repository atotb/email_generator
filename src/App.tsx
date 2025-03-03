import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Form from "./components/forms/Form";
import FormResponse from "./components/FormResponse";

function App() {
  return (
    <section className=" bg-main h-full w-full flex flex-col items-center ">
      <Form></Form>
    </section>
  );
}

export default App;
