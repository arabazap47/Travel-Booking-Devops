import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  const redirectTo = location.state?.from || "/user";

  const [step, setStep] = useState(1);
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");

  const sendOtp = async () => {
  if (!emailOrMobile) {
      setError("Email is required");
      return;
    }

    try {
      setError("");
      setLoading(true);
    // 1️⃣ Check if user already exists
    const check = await api.post("/auth/check-user", { emailOrMobile });

    // exists = true → old user → no name needed
    // exists = false → new user → ask name
    setIsNewUser(!check.data.exists);

    // 2️⃣ Send OTP
    await api.post("/auth/send-otp", { emailOrMobile });

    setStep(2);
    // alert("OTP sent to your email");
  } catch {
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
};

const changeEmail = () => {
  setStep(1);
  setOtp("");
  setName("");
  setError("");
};

const maskEmail = (email) => {
  const [name, domain] = email.split("@");
  if (!name || name.length < 8) return email;

  const start = name.slice(0, 4);
  const end = name.slice(-4);
  return `${start}****${end}@${domain}`;
};


  const verifyOtp = async () => {
  setError("");

  if (!otp.trim()) {
    setError("OTP is required");
    return;
  }

  if (isNewUser && !name.trim()) {
    setError("Name is required first-time login");
    return;
  }

  try {
    setLoadingVerify(true);
    const res = await api.post("/auth/verify-otp", {
      emailOrMobile,
      otp,
      name
    });

    localStorage.setItem("token", res.data.token);
setTimeout(() => {
    if (res.data.role === "USER") navigate(redirectTo);
    if (res.data.role === "OWNER") navigate("/owner");
    if (res.data.role === "ADMIN") navigate("/admin");
    
}, 2000);
  } catch {
    setLoadingVerify(false)
    setError("Invalid or expired OTP");
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">LogIn</h2>

       {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter email"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          </>
        )}

        {step === 2 && (
  <>
  {/* Masked email + change button */}
    <div className="flex items-center justify-between mb-4">
      <p className="text-sm text-gray-600">
        {maskEmail(emailOrMobile)}
      </p>
      <button
        onClick={changeEmail}
        className="text-sm text-primary hover:underline"
      >
        Change
      </button>
    </div>
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      className="w-full p-2 border rounded mb-3"
    />

    {isNewUser && (
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
    )}
    {error && (
  <p className="text-red-500 text-sm mb-3">{error}</p>
)}

    <button
  onClick={verifyOtp}
  disabled={loadingVerify}
  className="w-full bg-primary text-white py-2 rounded disabled:opacity-60"
>
  {loadingVerify ? "Verifying..." : "Verify & Login"}
</button>

  </>
)}

      </div>
    </div>
  );
}
