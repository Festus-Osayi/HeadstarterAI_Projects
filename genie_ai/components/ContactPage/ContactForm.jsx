"use client";
import React, { useState } from "react";
import { withSwal } from "react-sweetalert2";

function ContactForm({ swal }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleUser = async function (e) {
    e.preventDefault();

    try {
      const userData = {
        firstName,
        lastName,
        email,
        phone,
        message,
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        swal.fire({
          title: "Success",
          text: "Your message has been sent successfully",
          icon: "success",
        });
      } else {
        swal.fire({
          title: "Error",
          text: "Failed to send message",
          icon: "error",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }
  };

  return (

    /** Form */
    <form
      className="flex flex-col px-4 pt-10 pb-2.5 mt-9 max-w-full font-medium rounded-2xl bg-stone-50"
      onSubmit={handleUser}
    >
      <div className="flex flex-wrap gap-3 max-md:mr-1.5 max-md:max-w-full">
        <div className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit">
          <label htmlFor="firstName" className="self-start">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className="flex shrink-0 mt-3 rounded-lg bg-zinc-300 h-[30px]"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit">
          <label htmlFor="lastName" className="self-start">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className="flex shrink-0 mt-3 rounded-lg bg-zinc-300 h-[30px]"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>
      <label htmlFor="email" className="self-start mt-6">
        Email
      </label>
      <input
        id="email"
        type="email"
        className="flex shrink-0 mt-3 w-full rounded-lg bg-zinc-300 h-[30px] max-md:mr-1.5"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="phone" className="self-start mt-6">
        Phone
      </label>
      <input
        id="phone"
        type="tel"
        className="flex shrink-0 mt-3 w-full rounded-lg bg-zinc-300 h-[30px] max-md:mr-1.5"
        placeholder="optional"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <label htmlFor="message" className="self-start mt-6">
        Message
      </label>
      <textarea
        id="message"
        className="flex shrink-0 mt-3 w-full rounded-lg bg-zinc-300 h-[124px] max-md:mr-1"
        placeholder="optional"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="self-end px-10 pt-2 pb-4 mt-6 whitespace-nowrap bg-fuchsia-300 rounded-lg max-md:px-5"
      >
        Send
      </button>
    </form>
  );
}

export default withSwal(({ swal }) => <ContactForm swal={swal} />);
