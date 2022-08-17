import React, { useEffect, useRef, useState } from "react";
import Notification from "../ui/notification";
import classes from "./contact-form.module.css";

function ContactForm(props) {
  const emailValue = useRef();
  const nameValue = useRef();
  const messageValue = useRef();
  const [requestStatus, setRequestStatus] = useState("");

  useEffect(() => {
    if (requestStatus === "pending" || requestStatus === "success") {
      const timer = setTimeout(() => {
        setRequestStatus("");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [requestStatus]);

  const submitHandler = async (event) => {
    event.preventDefault();

    setRequestStatus("pending");
    const response = await fetch(`/api/contact`, {
      method: "post",
      body: JSON.stringify({
        email: emailValue.current.value,
        name: nameValue.current.value,
        message: messageValue.current.value,
      }),
    });

    const data = response.json();

    if (!response.ok) {
      setRequestStatus("error");
      throw new Error(data.message || "something went wrong");
    }

    setRequestStatus("success");
  };

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      message: "msg send",
      title: "sending msg",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      message: "msg sent",
      title: "success",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      message: "msg failed to send",
      title: "sending msg failed",
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type={"email"} id="email" required ref={emailValue} />
          </div>

          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input type={"text"} id="name" required ref={nameValue} />
          </div>
        </div>

        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="msg">Message</label>
            <textarea id="msg" required rows={5} ref={messageValue}></textarea>
          </div>
        </div>

        <div className={classes.action}>
          <button>Send Message</button>
        </div>
      </form>

      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
          title={notification.title}
        />
      )}
    </section>
  );
}

export default ContactForm;
