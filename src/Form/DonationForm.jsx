import React, { useState } from "react";

export default function DonationForm() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    pan: "",
    item: "",
    delivery: "courier",
    proof: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleFile(e) {
    setForm((s) => ({ ...s, proof: e.target.files[0] ?? null }));
  }

  function validate() {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.contact.trim()) err.contact = "Email / Phone Required";
    if (!form.item.trim()) err.item = "Select an item";
    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    console.log("Form Submitted:", form);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#000] font-inter">
      {/* HEADER */}
      <header className="bg-[#FAC610] text-black shadow">
        <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-2xl font-extrabold tracking-wide uppercase">
            Maatram Foundation
          </div>
          <nav className="space-x-8 hidden md:block font-semibold">
            <a className="hover:underline">Home</a>
            <a className="hover:underline">Needs List</a>
            <a className="underline underline-offset-4">Donate</a>
          </nav>
        </div>
      </header>

      {/* MAIN FORM CONTAINER */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Donate</h1>
          <p className="mt-3 text-gray-600 text-lg">
            Select an item you wish to donate and fill in your details.
          </p>

          {/* SUCCESS MESSAGE */}
          {submitted && (
            <div className="mt-6 p-5 bg-green-100 border border-green-300 rounded-xl flex items-start gap-3">
              <strong className="text-green-800">Thank you!</strong>
              <span className="text-green-700">
                Your donation request has been submitted.
              </span>
            </div>
          )}

          {/* FORM */}
          <form className="mt-10 space-y-7" onSubmit={handleSubmit}>
            {/* NAME */}
            <div>
              <label className="block font-semibold text-gray-800 tracking-wide">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`mt-2 w-full px-4 py-3 rounded-lg border shadow-sm bg-white focus:ring-2 focus:ring-[#FAC610] focus:border-[#FAC610] ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            {/* CONTACT */}
            <div>
              <label className="block font-semibold text-gray-800 tracking-wide">
                Email / Phone
              </label>
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className={`mt-2 w-full px-4 py-3 rounded-lg shadow-sm border bg-white focus:ring-2 focus:ring-[#FAC610] focus:border-[#FAC610] ${
                  errors.contact ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="example@gmail.com / +91 XXXXX"
              />
              {errors.contact && (
                <p className="text-sm text-red-600 mt-1">{errors.contact}</p>
              )}
            </div>

            {/* PAN */}
            <div>
              <label className="block font-semibold text-gray-800 tracking-wide">
                PAN Number (optional)
              </label>
              <input
                name="pan"
                value={form.pan}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 rounded-lg shadow-sm border border-gray-300 bg-white focus:ring-2 focus:ring-[#FAC610] focus:border-[#FAC610]"
                placeholder="ABCDE1234F"
              />
            </div>

            {/* ITEM */}
            <div>
              <label className="block font-semibold text-gray-800 tracking-wide">
                Item You're Donating
              </label>
              <select
                name="item"
                value={form.item}
                onChange={handleChange}
                className={`mt-2 w-full px-4 py-3 rounded-lg border shadow-sm bg-white focus:ring-2 focus:ring-[#FAC610] focus:border-[#FAC610] ${
                  errors.item ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">-- Select Item --</option>
                <option value="laptop">Laptop</option>
                <option value="phone">Phone</option>
                <option value="printer">Printer</option>
                <option value="other">Other</option>
              </select>
              {errors.item && (
                <p className="text-sm text-red-600 mt-1">{errors.item}</p>
              )}
            </div>

            {/* DELIVERY METHOD */}
            <div>
              <label className="block font-semibold text-gray-800 tracking-wide">
                Delivery Method
              </label>

              <div className="mt-4 flex gap-8">
                {/* Courier */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value="courier"
                    checked={form.delivery === "courier"}
                    onChange={handleChange}
                    className="h-5 w-5 text-[#FAC610] focus:ring-[#FAC610]"
                  />
                  <span className="font-medium">Courier</span>
                </label>

                {/* Drop */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value="drop"
                    checked={form.delivery === "drop"}
                    onChange={handleChange}
                    className="h-5 w-5 text-[#FAC610] focus:ring-[#FAC610]"
                  />
                  <span className="font-medium">Drop at Foundation Office</span>
                </label>
              </div>
            </div>

            {/* FILE UPLOAD */}
            <div>
              <label className="block font-semibold text-gray-800 tracking-wide">
                Upload Proof
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFile}
                className="mt-2 block text-gray-700"
              />
              <p className="text-sm text-gray-600 mt-1">
                {form.proof ? form.proof.name : "No file selected"}
              </p>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="mt-4 w-full md:w-auto bg-[#FAC610] text-black px-8 py-3 rounded-xl font-bold shadow-md hover:bg-[#e0b00f] transition-all"
            >
              Submit Donation
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
