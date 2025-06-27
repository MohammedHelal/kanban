"use client";
import { useState } from "react";

function CredentialSignIn({ adjSignIn }) {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          email: "Please make sure email is in proper format",
        };
      });
    }

    if (password.length < 6) {
      setErrors((prevState) => {
        return {
          ...prevState,
          password: "Password can't be less than 6 characters",
        };
      });
    }

    if (
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) &&
      password.length >= 6
    ) {
      await adjSignIn(formData);

      setErrors((prevState) => {
        return {
          ...prevState,
          email: "",
          password: "",
        };
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-[15px] text-3xl text-darkPurple">Sign in</h2>
      <div className="my-[5px]">
        <label className="text-md text-darkPurple" htmlFor="email">
          Email:
        </label>
        <input
          name="email"
          type="text"
          className="w-full border-[1px] rounded-md border-lightPurple p-1 pl-3"
        />
        {errors.email !== "" && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>
      <div className="my-[5px]">
        <label className="text-md text-darkPurple" htmlFor="password">
          Password:
        </label>
        <input
          name="password"
          type="password"
          className="w-full border-[1px] rounded-md border-lightPurple p-1 pl-3"
        />
        {errors.password !== "" && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>
      <button
        id="submitCredentialBtn"
        name="submitCredentialBtn"
        type="submit"
        className="py-[10px] px-[25px] mt-[15px] text-white bg-indigo-500 hover:bg-indigo-700 border-0 rounded-md w-full w-[calc(50% - 10px)]"
      >
        Sign in
      </button>
    </form>
  );
}

export default CredentialSignIn;
