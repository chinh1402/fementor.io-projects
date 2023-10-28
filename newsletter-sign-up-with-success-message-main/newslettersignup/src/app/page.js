"use client";
import { useState } from "react";
import Subscribe from "./components/Subscribe";
import Success from "./components/Success";

export default function Home() {
  const [email, setEmail] = useState("");
  const [displayNone, setDisplayNone] = useState(false);
  return (
    <>
      <main className="dark-wrapper">
        <Subscribe
          email={email}
          setEmail={setEmail}
          displayNone={displayNone}
          setDisplayNone={setDisplayNone}
        />
        <Success 
          email={email}
          setEmail={setEmail}
          displayNone={displayNone}
          setDisplayNone={setDisplayNone}
        />
      </main>
    </>
  );
}
