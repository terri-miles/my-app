"use client";

import Link from "next/link";
import styles from "./registerForm.module.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    country: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();

  const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "NurseLink");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/oteridev/image/upload",
        data
      );

      const { url } = res.data;
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const clearErrorTimeout = () => {
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    // Client-side validation
    for (const key in user) {
      if (!user[key]) {
        setError("Fill in all the fields!");
        clearErrorTimeout();
        return;
      }
    }

    if (!file) {
      setError("Please upload a profile picture!");
      clearErrorTimeout();
      return;
    }

    const url = await upload(file);

    try {
      const res = await axios.post("https://nurselink.vercel.app/api/register", {
        ...user,
        profileImage: url,
      });

      if (res.status === 201) {
        // User successfully created
        router.push("/login");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        // Handle "User already exists" error
        setError(error.response.data.error);
        clearErrorTimeout();
      } else {
        // Handle other errors
        setError("Failed to register. Please try again later!");
        clearErrorTimeout();
      }
    }
  };

  return (
    <div className={styles.formDetails}>
      <h2>Register</h2>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full name*"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email*"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password*"
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address*"
          onChange={handleChange}
        />
        <div className={styles.location}>
          <input
            type="text"
            name="country"
            placeholder="City/Country*"
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone number*"
            onChange={handleChange}
          />
        </div>
        <div className={styles.numbers}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button>Register</button>
        <Link href="/login" className={styles.login}>
          Have an account? <b>Login</b>
        </Link>
      </form>
    </div>
  );
}
