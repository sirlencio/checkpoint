"use client";
import { useState } from "react";
import { CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [touched, setTouched] = useState({
    email: false,
    username: false,
    password: false,
    confirm: false,
  });

  const emailValid = email.includes("@") && email.includes(".");
  const usernameValid = username.length >= 4;
  const passwordValid = password.length >= 6;
  const confirmValid = confirm === password && confirm !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, username: true, password: true, confirm: true });

    if (emailValid && usernameValid && passwordValid && confirmValid) {
      console.log("Registro enviado:", { email, username, password });
    }
  };

  const getBorder = (valid: boolean, isTouched: boolean) =>
    isTouched ? (valid ? "border-green-500" : "border-red-500") : "border-black";

  const getIcon = (valid: boolean, isTouched: boolean) =>
    isTouched
      ? valid
        ? <CheckCircle className="absolute right-10 top-1/2 -translate-y-1/2 text-green-400 size-5" />
        : <XCircle className="absolute right-10 top-1/2 -translate-y-1/2 text-red-400 size-5" />
      : null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* CARD GLASS */}
      <div className="w-full max-w-xl p-12 min-h-[650px] rounded-lg bg-white/5 backdrop-blur-lg shadow-2xl border-2 border-gray-700 mb-64">
        <h1 className="text-4xl text-gray-100 font-semibold text-center mb-8 drop-shadow-[2px_2px_2px_black]">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input
              type="text"
              placeholder="Email"
              className={`w-full bg-white/10 text-white border rounded-md pl-4 pr-12 py-3 outline-none transition ${getBorder(emailValid, touched.email)}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched({ ...touched, email: true })}
            />
            {getIcon(emailValid, touched.email)}
          </div>
          {touched.email && !emailValid && (
            <p className="text-red-400 text-sm -mt-4">Introduce un email válido.</p>
          )}

          {/* Username */}
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              className={`w-full bg-white/10 text-white border rounded-md pl-4 pr-12 py-3 outline-none transition ${getBorder(usernameValid, touched.username)}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched({ ...touched, username: true })}
            />
            {getIcon(usernameValid, touched.username)}
          </div>
          {touched.username && !usernameValid && (
            <p className="text-red-400 text-sm -mt-4">El usuario debe tener al menos 4 caracteres.</p>
          )}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full bg-white/10 backdrop-blur-sm text-gray-100 border rounded-md pl-4 pr-12 py-3 outline-none transition ${getBorder(passwordValid, touched.password)}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched({ ...touched, password: true })}
            />
            {getIcon(passwordValid, touched.password)}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {touched.password && !passwordValid && (
            <p className="text-red-400 text-sm -mt-4">La contraseña debe tener al menos 6 caracteres.</p>
          )}

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className={`w-full bg-white/10 backdrop-blur-sm text-gray-100 border rounded-md pl-4 pr-12 py-3 outline-none transition ${getBorder(confirmValid, touched.confirm)}`}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              onBlur={() => setTouched({ ...touched, confirm: true })}
            />
            {getIcon(confirmValid, touched.confirm)}
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {touched.confirm && !confirmValid && (
            <p className="text-red-400 text-sm -mt-4">Las contraseñas no coinciden.</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-cyan-700 hover:bg-green-500 text-white py-3 rounded-md font-semibold transition shadow-lg drop-shadow-[2px_2px_2px_black]"
          >
            Sign Up
          </button>
        </form>

        {/* Links */}
        <div className="text-center mt-6 space-y-2 drop-shadow-[2px_2px_2px_black]">
          <p className="text-gray-300 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-cyan-700 hover:text-green-500 font-medium">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
