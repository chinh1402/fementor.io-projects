import Image from "next/image"
import iconSuccess from "public/assets/images/icon-success.svg";

export default function Success({ email, displayNone, setDisplayNone }) {
  const handleClick = () => {
      setDisplayNone(false);

  };  
  
  return (
      <>
        <div 
            className={`success-card ${!displayNone ? "hidden" : ""}`}
        >
          <Image 
            alt=""
            src={iconSuccess}
          />
          <h2 className="success-headline">Thanks for subscribing!</h2>
          <p className="success-description">A confirmation email has been sent to  
          <b> {email}</b>
          . Please
          open it and click the button inside to comfirm your subscription.</p>
          <button 
            className="success-button"
            onClick={handleClick}
          >Dismiss message</button>
        </div>
      </>
    )
}