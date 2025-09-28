"use client";

import React, { useState } from "react";

export default function WordContext() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    // Handle subscription logic here
  };

  return (
    <div className="max-w-6xl mx-auto  p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column - Context */}
        <div>
          <h2 className="text-2xl font-medium text-gray-900 mb-6">
            NYAM in Context
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. A non ut blandit sit eget
            sodales malesuada laoreet. Tincidunt duis eget id integer eu arcu.
            Congue bibendum ut eget bibendum. Consectetur nisl blandit mattis
            auctor scelerisque a ornare morbi. Rhoncus pulvinar justo elit
            faucibus. Aliquet lectus sit turpis pharetra sagittis. Quis est mi
            euismod urna pellentesque placerat tempus. Sed et morbi vulputate
            elementum. Pellentesque malesuada sit massa arcu pretium. Eget quis
            malesuada cras a id cursus tristique viverra. Eros suspendisse et
            viverra quis enim ornare nisl nulla congue.
          </p>
        </div>

        {/* Right Column - Newsletter Signup */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Build your vocabulary!
            </h3>
            <p className="text-gray-700 mb-1">Get Word of the Day</p>
            <p className="text-gray-700">in your inbox everyday.</p>
          </div>

          {/* Decorative lines */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-px bg-gray-300"></div>
          </div>

          <form onSubmit={handleSubscribe} className="space-y-4">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 uppercase text-sm tracking-wide"
            >
              SUBSCRIBE
            </button>
          </form>

          {/* Bottom decorative line */}
          <div className="flex justify-center mt-6">
            <div className="w-24 h-px bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
