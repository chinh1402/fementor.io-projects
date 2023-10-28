"use client";
import { useState } from "react";
import Image from "next/image";
import illustrationDesktop from "public/assets/images/illustration-sign-up-desktop.svg";
import illustrationMobile from "public/assets/images/illustration-sign-up-mobile.svg";
import itemIcon from "public/assets/images/icon-list.svg";

export default function Subscribe({ email, setEmail ,displayNone, setDisplayNone }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isFirstLoad, setFirstLoad] = useState(true);
  
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleBlur = () => {
    setFirstLoad(false);
    if (!email) {
      setErrorMessage("Email is required");
      setIsValid(false);
    } else if (!validateEmail(email)) {
      setErrorMessage("Invalid email format");
      setIsValid(false);
    } else {
      setErrorMessage("");
      setIsValid(true);
    }
  };

  const handleSubmit = () => {
    if (isValid && !isFirstLoad) {
      setDisplayNone(true);
    }
  };

  return (
    <>
      <div 
       className={`card ${displayNone ? "hidden" : ""}`}
      >
        <div className="card-left ">
          <h2 className="card-left__headline">Stay updated!</h2>
          <p className="card-left__description">
            Join 60,000+ product managers receiving monthly updates on:
          </p>

          <ul className="card-left__list">
            <li className="card-left__list-item">
              <Image alt="" src={itemIcon} className="itemIcon" />
              <span className="card-left__list-item-text">
                Product discovery and building what matters
              </span>
            </li>
            <li className="card-left__list-item">
              <Image alt="" src={itemIcon} className="itemIcon" />
              <span className="card-left__list-item-text">
                Measuring to ensure updates are a success
              </span>
            </li>
            <li className="card-left__list-item">
              <Image alt="" src={itemIcon} className="itemIcon" />
              <span className="card-left__list-item-text">And much more!</span>
            </li>
          </ul>

          <div className="form-wrapper">
            <span className={`invalid-text ${!isValid ? "show" : ""}`}>
              {errorMessage}
            </span>
            <label htmlFor="input-id" className="input-label">
              Email address
            </label>
            <input
              className={`form__email-input ${!isValid ? "invalid" : ""}`}
              id="input-id"
              type="text"
              placeholder="email@company.com"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
            />
            <button 
            className="form__submitBtn"
            onClick={handleSubmit}
            >
              Subscribe to monthly newsletter
            </button>
          </div>
        </div>
        <div className="card-right ">
          <Image
            alt="Email Illustration"
            src={illustrationDesktop}
            className="illustration-img-desktop hide-on-mobile"
            priority
          />

          <Image
            alt="Email Illustration"
            src={illustrationMobile}
            className="illustration-img-mobile hide-on-desktop"
            priority
          />
        </div>
      </div>
    </>
  );
}
