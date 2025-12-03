"use client";
import { useState } from "react";
import { CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailValid = email.length >= 4;
  const passwordValid = password.length >= 6;

  const showEmailError = emailTouched && !emailValid;
  const showPasswordError = passwordTouched && !passwordValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    if (emailValid && passwordValid) {
      console.log("Login enviado:", { email, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="w-full max-w-xl p-12 min-h-[550px] rounded-lg bg-white/5 backdrop-blur-lg shadow-2xl border-2 border-gray-700 mb-64">
        <h1 className="text-4xl text-gray-100 font-semibold text-center mb-8 drop-shadow-[2px_2px_2px_black]">
          Welcome back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 ">
          {/* Email */}
          <div className="relative">
            <input
              type="text"
              placeholder="Email / Username"
              className={`w-full bg-white/10 text-white border rounded-md pl-4 pr-12 py-3 outline-none transition
                ${
                  showEmailError
                    ? "border-red-500"
                    : emailValid && emailTouched
                    ? "border-green-500"
                    : "border-black"
                }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
            />
            {emailTouched &&
              (emailValid ? (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 size-5" />
              ) : (
                <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 size-5" />
              ))}
          </div>
          {showEmailError && (
            <p className="text-red-400 text-sm -mt-4">
              Introduce un email o usuario válido.
            </p>
          )}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full bg-white/10 backdrop-blur-sm text-gray-100 border rounded-md pl-4 pr-12 py-3 outline-none transition
                ${
                  showPasswordError
                    ? "border-red-500"
                    : passwordValid && passwordTouched
                    ? "border-green-500"
                    : "border-black"
                }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
            />
            {passwordTouched &&
              (passwordValid ? (
                <CheckCircle className="absolute right-10 top-1/2 -translate-y-1/2 text-green-400 size-5" />
              ) : (
                <XCircle className="absolute right-10 top-1/2 -translate-y-1/2 text-red-400 size-5" />
              ))}

            {/* Toggle password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {showPasswordError && (
            <p className="text-red-400 text-sm -mt-4">
              La contraseña debe tener al menos 6 caracteres.
            </p>
          )}

          {/* Remember me */}
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 accent-pink-600" />
            <label className="text-gray-200 text-sm drop-shadow-[2px_2px_2px_black]">Remember me</label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-cyan-700 hover:bg-green-500 text-white py-3 rounded-md font-semibold transition shadow-lg drop-shadow-[2px_2px_2px_black]"
          >
            Log In
          </button>
        </form>

        {/* Links */}
        <div className="text-center mt-6 space-y-2 drop-shadow-[2px_2px_2px_black]">
          <p className="text-gray-300 text-sm">
            New User?{" "}
            <a href="/register" className="text-cyan-700 hover:text-green-500 font-medium">
              Sign up here
            </a>
          </p>

          <a href="#" className="block text-cyan-700 hover:text-green-500 text-sm">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}
