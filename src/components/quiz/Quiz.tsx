"use client";

import React, { useState } from "react";

export default function Quiz() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    // Handle subscription logic here
  };

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 p-8">
      {/* Top decorative line */}
      <div className="w-full h-px bg-green-300 mb-14"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Card - Quiz */}
        <div className="bg-white rounded-lg border-2 border-gray-400 overflow-hidden">
          <div className="p-6">
            {/* Quiz Image */}
            <div className="mb-6">
              <img
                src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=200&fit=crop&crop=center"
                alt="Jamaican Food"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            <div className="text-center mb-6">
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                Guesa the Animal Quiz
              </h3>
              <button className="text-green-600 hover:text-green-700 font-bold text-lg transition-colors">
                PLAY NOW
              </button>
            </div>
          </div>

          {/* Yellow bottom section */}
          <div className="bg-yellow-400 p-6 text-center">
            <h4 className="text-xl font-semibold text-gray-900">
              <u>More quizzes available here</u>
            </h4>
          </div>
        </div>

        {/* Right Card - Word of the Day */}
        <div className="bg-white rounded-lg border-2 border-gray-400 overflow-hidden">
          <div className="p-6 text-center">
            {/* Logo */}
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto rounded-full border-2 border-green-600 flex items-center justify-center">
                <div className="text-green-600">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2 tracking-widest">
                PATWANARY
              </p>
            </div>

            <p className="text-sm text-gray-700 font-medium mb-2 tracking-wide">
              WORD OF THE DAY
            </p>

            <h2 className="text-4xl font-light text-gray-900 mb-4">Nyam</h2>

            <button className="text-gray-600 hover:text-gray-800 underline mb-6 transition-colors">
              See Definitions and Examples
            </button>
          </div>

          {/* Green bottom section */}
          <div className="bg-green-200 p-6">
            <p className="text-center text-gray-800 font-medium mb-4">
              Get Word of the Day daily email!
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-[#016701] hover:bg-green-700 text-white font-medium px-6 py-2 rounded transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
