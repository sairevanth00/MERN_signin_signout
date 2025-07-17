import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser, sendOtp, verifyOtp } from "../api/authApi";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const apiCallToSendOtp = async () => {
    await sendOtp(formData.email);
    setOtpSent(true);
    alert(`OTP sent to your email id ${formData.email}`);
  };

  const validateEmail = (email) => {
    const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert("Invalid email address");
      return;
    }
    apiCallToSendOtp();
  };

  const handleVerifyOtp = async () => {
    await verifyOtp({ email: formData.email, otp: formData.otp });
    alert("OTP Verified Successfully!");
    setOtpSent(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if(!formData.firstName || !formData.lastName || !formData.email || !formData.mobile || !formData.password) {
      return alert("Please fill in all fields correctly");
    }
    try {
      await signupUser(formData);
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Signup</h1>
      <form className="flex flex-col space-y-2" onSubmit={handleSignup}>
        <input
          className="border p-2 rounded"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          className="border p-2 rounded"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input
          className="border p-2 rounded"
          name="email"
          placeholder="Email"
          onBlur={handleSendOtp}
          onChange={handleChange}
        />
        {otpSent && (
          <>
            <input
              className="border p-2 rounded"
              name="otp"
              placeholder="Enter OTP"
              onChange={handleChange}
            />
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </>
        )}
        <input
          className="border p-2 rounded"
          name="mobile"
          placeholder="Mobile Number"
          onChange={handleChange}
        />
        <input
          className="border p-2 rounded"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer rounded-full">
          Signup
        </button>
        <button className="text-red-600 cursor-pointer" onClick={(e) => {
          e.preventDefault()
          navigate("/")}}>
          Already have an account? Click here to Login
        </button>
      </form>
    </div>
  );
};
export default Signup;
