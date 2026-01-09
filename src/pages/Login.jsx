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

const images = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
];

const [currentImage, setCurrentImage] = useState(0);

React.useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, 4000);

  return () => clearInterval(interval);
}, []);






//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-xl font-bold mb-4 text-center">LogIn</h2>

//        {step === 1 && (
//           <>
//             <input
//               type="email"
//               placeholder="Enter email"
//               value={emailOrMobile}
//               onChange={(e) => setEmailOrMobile(e.target.value)}
//               className="w-full p-2 border rounded mb-4"
//             />

//             <button
//               onClick={sendOtp}
//               disabled={loading}
//               className="w-full bg-primary text-white py-2 rounded flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
//                   Sending OTP...
//                 </>
//               ) : (
//                 "Send OTP"
//               )}
//             </button>
//           </>
//         )}

//         {step === 2 && (
//   <>
//   {/* Masked email + change button */}
//     <div className="flex items-center justify-between mb-4">
//       <p className="text-sm text-gray-600">
//         {maskEmail(emailOrMobile)}
//       </p>
//       <button
//         onClick={changeEmail}
//         className="text-sm text-primary hover:underline"
//       >
//         Change
//       </button>
//     </div>
//     <input
//       type="text"
//       placeholder="Enter OTP"
//       value={otp}
//       onChange={(e) => setOtp(e.target.value)}
//       className="w-full p-2 border rounded mb-3"
//     />

//     {isNewUser && (
//       <input
//         type="text"
//         placeholder="Your Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full p-2 border rounded mb-4"
//       />
//     )}
//     {error && (
//   <p className="text-red-500 text-sm mb-3">{error}</p>
// )}

//     <button
//   onClick={verifyOtp}
//   disabled={loadingVerify}
//   className="w-full bg-primary text-white py-2 rounded disabled:opacity-60"
// >
//   {loadingVerify ? "Verifying..." : "Verify & Login"}
// </button>

//   </>
// )}

//       </div>
//     </div>
//   );
return (
  <div className="relative min-h-screen overflow-hidden">
    {/* Background carousel */}
    {images.map((img, index) => (
      <div
        key={index}
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          index === currentImage ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${img})` }}
      />
    ))}

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/30"></div>

    {/* Login card */}
    <div className="relative z-10 flex items-center justify-center min-h-screen">
      <div className="bg-white/25 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Login using OTP
        </p>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter email"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-primary"
            />

            {error && (
              <p className="text-red-500 text-sm mb-3">{error}</p>
            )}

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded flex justify-center items-center gap-2 hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex justify-between mb-4">
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
              className="w-full p-2 border rounded mb-3 focus:ring-2 focus:ring-primary"
            />

            {isNewUser && (
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-primary"
              />
            )}

            {error && (
              <p className="text-red-500 text-sm mb-3">{error}</p>
            )}

            <button
              onClick={verifyOtp}
              disabled={loadingVerify}
              className="w-full bg-primary text-white py-2 rounded hover:opacity-90 disabled:opacity-60"
            >
              {loadingVerify ? "Verifying..." : "Verify & Login"}
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);



}
