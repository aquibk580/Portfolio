"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type Message = {
  email: string;
  message: string;
  name: string;
};

export default function Contact() {
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Message>();

  const onSubmit = async (data: Message) => {
    const response = await axios.post(`/api/message`, {
      email: data.email,
      name: data.name,
      message: data.message,
    });

    if(response.status === 201){
      setIsSent(true);
    }else {
      setError(true);
    }
  };

  return (
    <section id="contact" className="text-center">
      <h2 className="text-2xl font-semibold mb-6">Contact</h2>
      <p className="text-gray-300 mb-4">I'd Love to Hear from You</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#3b365d] p-6 rounded-lg max-w-md mx-auto space-y-4"
      >
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className="w-full p-3 rounded bg-[#4b437a] text-gray-200 outline-none"
        />
        {errors.name && <p className="text-red-500">{errors.name?.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
          className="w-full p-3 rounded bg-[#4b437a] text-gray-200 outline-none"
        />
        {errors.email && (
          <p className="text-red-500">{errors.email?.message}</p>
        )}

        <textarea
          placeholder="Message"
          rows={4}
          {...register("message", { required: "Message is required" })}
          className="w-full p-3 rounded bg-[#4b437a] text-gray-200"
        ></textarea>
        {errors.message && (
          <p className="text-red-500 outline-none">{errors.message?.message}</p>
        )}

        <button
          type="submit"
          className="w-full p-3 rounded bg-blue-500 hover:bg-blue-600 text-white"
        >
          Send Message
        </button>
        {isSent && <p className="text-green-500 outline-none">Message Sent!</p>}
        {error &&  <p className="text-red-500 outline-none">An Error Occured!</p>}
      </form>
    </section>
  );
}
