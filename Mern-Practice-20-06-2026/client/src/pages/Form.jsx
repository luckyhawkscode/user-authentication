import { useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
const initialState = { name: "", age: "", email: "", phone: "", feedback: "" };
const initialErrors = { name: "", age: "", email: "", phone: "", feedback: "" };

export default function Form() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
const navigate = useNavigate();
  const validate = () => {
    const newErrors = { ...initialErrors };
    let isValid = true;
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Min 2 characters required";
      isValid = false;
    }
    const age = parseInt(formData.age);
    if (!formData.age || isNaN(age) || age < 1 || age > 120) {
      newErrors.age = "Enter valid age (1–120)";
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Must be exactly 10 digits";
      isValid = false;
    }
    if (!formData.feedback || formData.feedback.trim().length < 10) {
      newErrors.feedback = "Min 10 characters required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^[0-9]*$/.test(value)) return;
    if (name === "feedback" && value.length > 500) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()){
        toast.error("please check all the fields before submitting!");
    return;
    } 
    setIsSubmitting(true);
    try {
      const res = await axios.post("http://localhost:8000/api/users/create", formData);
    if(res) setTimeout(res, 1200);
      setIsSuccess(true);
      toast.success(res?.data?.msg);
      navigate('/userdata');
    } catch (err) {
        toast.error(err?.response?.data?.msg)
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialState);
    setErrors(initialErrors);
    setIsSuccess(false);
  };

  const inputClass = (field) =>
    `w-full px-2 py-1.5 text-sm rounded-lg border-2 outline-none transition-all duration-200 bg-white text-slate-800 placeholder:text-slate-300
    ${errors[field]
      ? "border-rose-400 focus:border-rose-500 ring-2 ring-rose-100"
      : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center p-3"
      style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 40%, #166534 70%, #3f6212 100%)" }}>

      {/* Outer card */}
      <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-480px]">

        {/* ── LEFT PANEL ── */}
        <div className="relative md:w-5/12 flex flex-col justify-between p-8 overflow-hidden"
          style={{ background: "linear-gradient(145deg, #065f46 0%, #047857 40%, #15803d 70%, #3f6212 100%)" }}>

          {/* Blob decorations */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #a3e635, transparent)" }} />
          <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #34d399, transparent)" }} />
          <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #d9f99d, transparent)" }} />

          {/* Top nav */}
          <div className="relative z-10">
            <span className="text-emerald-200 text-sm font-medium cursor-pointer hover:text-white transition-colors">
              ← Home Page
            </span>
          </div>

          {/* Center content */}
          <div className="relative z-10 py-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Get<br />Started
            </h1>
            <p className="text-emerald-200 text-sm mb-8 leading-relaxed">
              Already submitted your feedback?
            </p>
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-full border-2 border-white/50 text-white text-sm font-semibold hover:bg-white/10 active:scale-95 transition-all duration-200"
            >
              View responses
            </button>
          </div>

          {/* Bottom tag */}
          <div className="relative z-10">
            <p className="text-emerald-400/60 text-xs">Your feedback helps us grow ✦</p>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="md:w-7/12 bg-white flex flex-col">

          {/* Top bar */}
          <div className="flex justify-end px-8 pt-4">
            <span className="text-slate-400 text-sm cursor-pointer hover:text-emerald-600 transition-colors">
              Need help?
            </span>
          </div>

          <div className="flex-1 px-8 md:px-12 py-4">
            <h2 className="text-2xl font-bold text-emerald-700 mb-1">Share Feedback</h2>
            <p className="text-slate-400 text-sm mb-7">Fill in the details below and submit</p>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-lime-400 flex items-center justify-center text-3xl text-white font-bold mb-4 shadow-lg">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-emerald-700 mb-2">Thank you!</h3>
                <p className="text-slate-400 text-sm mb-6">We've received your feedback successfully.</p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-emerald-500 to-lime-500 text-white hover:from-emerald-400 hover:to-lime-400 active:scale-95 transition-all duration-200"
                >
                  Submit another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>

                {/* Name + Age row */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      id="name" name="name" type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass("name")}
                    />
                    {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide" htmlFor="age">
                      Age
                    </label>
                    <input
                      id="age" name="age" type="number"
                      placeholder="22" min="1" max="120"
                      value={formData.age}
                      onChange={handleChange}
                      className={inputClass("age")}
                    />
                    {errors.age && <p className="text-xs text-rose-500 mt-1">{errors.age}</p>}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass("email")}
                  />
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone" name="phone" type="tel"
                    placeholder="1111111111" maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass("phone")}
                  />
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                {/* Feedback */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide" htmlFor="feedback">
                    Feedback
                  </label>
                  <textarea
                    id="feedback" name="feedback"
                    placeholder="Tell us what you think..."
                    value={formData.feedback}
                    onChange={handleChange}
                    rows={3}
                    className={`${inputClass("feedback")} resize-none leading-relaxed`}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.feedback
                      ? <p className="text-xs text-rose-500">{errors.feedback}</p>
                      : <span />}
                    <span className="text-xs text-slate-300 ml-auto">{formData.feedback.length} / 500</span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300
                    ${isSubmitting
                      ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 text-white hover:from-emerald-400 hover:to-lime-400 active:scale-95 shadow-lg shadow-emerald-200"
                    }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback →"}
                </button>

              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}