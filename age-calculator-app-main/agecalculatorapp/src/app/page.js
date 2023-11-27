"use client"
import { useSpring, animated } from "react-spring";
import { useState, useRef } from "react";
import svgImg from "public/assets/images/icon-arrow.svg";
import Image from "next/image";
import "./style.css";

const dom = [31,28,31,30,31,30,31,31,30,31,30,31]
const leapdom = [31,29,31,30,31,30,31,31,30,31,30,31]

export default function Main() {
  const [day, setDay] = useState(0)
  const [month, setMonth] = useState(0)
  const [year, setYear] = useState(0)
  const [daySubtraction, setDaySub] = useState(null)
  const [monthSubtraction, setMonthSub] = useState(null)
  const [yearSubtraction, setYearSub] = useState(null)
  const [animationTriggered, setAnimationTriggered] = useState(false);


  const dayRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();
  const dayTitleRef = useRef();
  const monthTitleRef = useRef();
  const yearTitleRef = useRef();
  const dayErrorRef = useRef();
  const monthErrorRef = useRef();
  const yearErrorRef = useRef();

  const animationConfig = { tension: 120, friction: 14, precision: 0.8 };

  // Animated values
  const animatedDay = useSpring({
    number: daySubtraction ?? 0,
    from: { number: 0 },
    config: animationConfig,
    onStart: () => setAnimationTriggered(true),
  });

  const animatedMonth = useSpring({
    number: monthSubtraction ?? 0,
    from: { number: 0 },
    config: animationConfig,
    onStart: () => setAnimationTriggered(true),
  });

  const animatedYear = useSpring({
    number: yearSubtraction ?? 0,
    from: { number: 0 },
    config: animationConfig,
    onStart: () => setAnimationTriggered(true),
  });

  function calculateDateDifference(inputDay, inputMonth, inputYear) {
    const currentDate = new Date(); // Get the current date
    const inputDate = new Date(inputYear, inputMonth - 1, inputDay); // Note: Months are zero-indexed in JavaScript
  
    const daysInYear = 365.25; // On average, a year is 365.25 days, accounting for leap years
    const daysInMonth = 30.44; // On average, a month is 30.44 days 
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = currentDate - inputDate;
  
    // Convert the difference to days
    const diff = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    // Convert the difference to months and years
    const differenceInYears = Math.floor(diff / daysInYear)

    const remainingDays = diff % daysInYear;

    const differenceInMonths = Math.floor(remainingDays / daysInMonth);
    const differenceInDays = Math.round(remainingDays % daysInMonth);
  
    setDaySub(differenceInDays)
    setMonthSub(differenceInMonths)
    setYearSub(differenceInYears)
  }

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    const numericValue = inputText.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    // Update the input value
    e.target.value = numericValue;
    e.target.classList.remove("invalid")
    e.target.nextElementSibling.classList.remove("invalid")
    e.target.nextElementSibling.nextElementSibling.classList.add("hidden")
  };

  const saveDayInput = (e) => {
    setDay(e.target.value)
  }

  const saveMonthInput = (e) => {
    setMonth(e.target.value)
  }

  const saveYearInput = (e) => {
    setYear(e.target.value)
  }

  function isValidDay(day, month, year) {
    const maxDaysInMonth = isLeapYear(year) ? leapdom[month - 1] : dom[month - 1];
    return day >= 1 && day <= maxDaysInMonth;
  }
  
  function isValidMonth(month) {
    return month >= 1 && month <= 12;
  }
  
  function isValidYear(year) {
    const currentYear = new Date().getFullYear(); 
    console.log(currentYear)
    return year >= 1 && year<=currentYear;
  }
  
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  const handleCalculate = () => {
    if (!isValidDay(day,month,year) || !isValidMonth(month) || !isValidYear(year)) {
      if(!isValidDay(day,month,year)) {
        dayRef.current.classList.add("invalid");
        dayTitleRef.current.classList.add("invalid");
        dayErrorRef.current.classList.remove("hidden");
      }
      
      if(!isValidMonth(month)) {
        monthRef.current.classList.add("invalid");
        monthTitleRef.current.classList.add("invalid");
        monthErrorRef.current.classList.remove("hidden");
      }
      
      if(!isValidYear(year)) {
        yearRef.current.classList.add("invalid");
        yearTitleRef.current.classList.add("invalid");
        yearErrorRef.current.classList.remove("hidden");
      }
    } else {
      // bad codes ;( removing current invalid fields
        dayRef.current.classList.remove("invalid");
        dayTitleRef.current.classList.remove("invalid");
        dayErrorRef.current.classList.add("hidden");
        monthRef.current.classList.remove("invalid");
        monthTitleRef.current.classList.remove("invalid");
        monthErrorRef.current.classList.add("hidden");
        yearRef.current.classList.remove("invalid");
        yearTitleRef.current.classList.remove("invalid");
        yearErrorRef.current.classList.add("hidden");

        calculateDateDifference(day,month,year)
      }
    
  }
  return (
    <>
      <main className="w-full bg-[#F0F0F0] flex py-[60px] px-[20px] lg:px-0 lg:py-0 lg:w-[1440px] lg:h-[960px]">
        <div
          className="bg-white m-auto rounded-[22px] px-[24px] py-[52px] w-full  lg:p-[60px]  rounded-br-[186px] lg:w-[840px] 
        lg:relative lg:top-[12px]"
        >
          <div className="inputs flex">
            <div className="inputitem uppercase flex flex-col pr-[8px]">
              <input
                ref={dayRef}
                type="text"
                className=" focus:border-[#864DFB] hide-input-arrows border border-[#DCDCDC] text-[16px] p-[8px] w-full font-bold rounded-[6px] focus:outline-none order-2
                lg:max-w-[160px] lg:w-full lg:text-[32px] lg:pl-[20px] lg:p-3 lg:m-0 lg:mr-6 lg:relative lg:bottom-[8px] lg:right-[4px] 
                "
                minLength={1} 
                maxLength={2}
                placeholder="24"
                onChange={handleInputChange}
                onBlur={saveDayInput}
              />
              <span
              ref={dayTitleRef}
              className="tracking-[3px] text-[#000] text-[15px] mb-[14px] order-1">
                DAY
              </span>
              <span 
              ref={dayErrorRef}
              className="hidden normal-case italic order-3 mt-[4px] text-[#DD6C71] lg:text-[#DD6C71] lg:text-[18px] lg:mt-[8px]">
                Must be valid day
              </span>
            </div>
            <div className="inputitem uppercase flex flex-col pr-[8px]">
              <input
                ref={monthRef}
                type="text"
                className=" focus:border-[#864DFB] hide-input-arrows border border-[#DCDCDC] text-[16px] p-[8px] w-full font-bold rounded-[6px] focus:outline-none order-2
                lg:max-w-[160px] lg:w-full lg:text-[32px] lg:pl-[20px] lg:p-3 lg:m-0 lg:mr-6 lg:relative lg:bottom-[8px] lg:right-[4px] 
                "
                minLength={1} 
                maxLength={2}
                placeholder="09"
                onChange={handleInputChange}
                onBlur={saveMonthInput}
              />
              <span
              ref={monthTitleRef}
              className="tracking-[3px] text-[#000] text-[15px] mb-[14px] order-1">
                MONTH
              </span>
              <span 
              ref={monthErrorRef}
              className="hidden normal-case italic order-3 mt-[4px] text-[#DD6C71] lg:text-[#DD6C71] lg:text-[18px] lg:mt-[8px]">
                Must be valid month
              </span>
            </div>
            <div className="inputitem uppercase flex flex-col pr-[8px]">
              <input
                ref={yearRef}
                type="text"
                className=" focus:border-[#864DFB] hide-input-arrows border border-[#DCDCDC] text-[16px] p-[8px] w-full font-bold rounded-[6px] focus:outline-none order-2
                lg:max-w-[160px] lg:w-full lg:text-[32px] lg:pl-[20px] lg:p-3 lg:m-0 lg:mr-6 lg:relative lg:bottom-[8px] lg:right-[4px] 
                "
                maxLength={4}
                placeholder="1984"
                onChange={handleInputChange}
                onBlur={saveYearInput}
              />
              <span
              ref={yearTitleRef}
              className="tracking-[3px] text-[#000] text-[15px] mb-[14px] order-1">
                YEAR
              </span>
              <span 
              ref={yearErrorRef}
              className="hidden normal-case italic order-3 mt-[4px] text-[#DD6C71] lg:text-[#DD6C71] lg:text-[18px] lg:mt-[8px]">
                Must be in the past
              </span>
            </div>
          </div>
          <div className="wrapper items-center relative max-h-[68px] my-[20px] lg:my-0">
            <div className="aestheticline h-[2px] block bg-[#ECECEC] w-full relative top-[32px] lg:top-[56px]"></div>

            <div 
            onClick={handleCalculate}
            className="Icon aspect-square bg-[#864CFF] rounded-full relative active:bg-black cursor-pointer ml-auto mr-auto w-[64px] lg:mr-0 lg:w-[100px]">
              <Image
                src={svgImg}
                alt=""
                className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] scale-[0.6] lg:scale-100"
              />
            </div>
          </div>
          <div className="relative top-[12px] left-[2px]">
            <div className=" text-black text-[40px] font-extrabold italic lg:text-[103px] lg:leading-[114px]">
            <animated.span className="lg:text-[103px] text-[#864DFB] mr-[4px]">
            {animatedYear.number.to((val) =>
              animationTriggered && val !== undefined ? Math.round(val) : "--"
            )}
          </animated.span>
              years
            </div>
            <div className=" text-black text-[40px] font-extrabold italic lg:text-[103px] lg:leading-[114px]">
              
            <animated.span className="lg:text-[103px] text-[#864DFB] mr-[4px]">
              {animatedMonth.number.to((val) =>
                animationTriggered && val !== undefined ? Math.round(val) : "--"
              )}
            </animated.span>
              month
            </div>
            <div className=" text-black text-[40px] font-extrabold italic lg:text-[103px] lg:leading-[114px]">
            <animated.span className="lg:text-[103px] text-[#864DFB] mr-[4px]">
              {animatedDay.number.to((val) =>
                animationTriggered && val !== undefined ? Math.round(val) : "--"
              )}
            </animated.span>
              day
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
