import React from "react";
import ContactForm from "../components/contact/contact-form";

function Contact(props) {
  return (
    <div>
      <h1
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        Contact page
      </h1>
      <ContactForm />
    </div>
  );
}

export default Contact;
