import React from 'react';
import "./Contact.css"
import contactImage from '../Assets/banner_women.png'; 

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "0527a7dd-d80b-4708-ac26-f633916f2555");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="contact-us-section">
        <div className="colorcon">
      <h2 className="contact-us-title">Contact Us</h2>
      <div className="contact-us-content">
        <form className="contact-us-form" onSubmit={onSubmit}>

          <input type="text" className="contact-us-input" name='name' placeholder="Name" />
          <input type="email" className="contact-us-input" name='email' placeholder="Email" />
          <input type="tel" className="contact-us-input" name='phone number' placeholder="Phone Number" />
          <textarea className="contact-us-textarea" name='message' placeholder="Message"></textarea>
          <button className="contact-us-button">Contact Us</button>
        </form>
        <div className="contact-us-image">
          <img src={contactImage} alt="Contact Us" />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Contact;
