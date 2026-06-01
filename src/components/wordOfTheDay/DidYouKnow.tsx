"use client";

import React from "react";
import TextCard from "../card/TextCard";

export default function DidYouKnow() {
  return (
    <TextCard className="max-w-6xl mx-auto">
      {/* Top decorative line */}
      <div className="w-full h-px bg-green-300 mb-8"></div>

      <div className="mb-8">
        <h2 className="text-2xl font-medium text-gray-900 mb-6">
          Did You Know?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Viverra nunc quis quis sit.
          Sem nunc et condimentum sit volutpat. Purus sed egestas viverra varius
          tellus aliquet egestas. Commodo ultrices non morbi varius interdum. Ac
          iaculis netus dignissim magna. Lorem ultrices volutpat in vitae aenean
          suspendisse et. Quisque eget ut convallis aliquet et blandit enim
          euismod sodales. Ut sem lacinia sed cursus posuere. Nec aliquam sed
          prasent tincidunt diam scelerisque. Congue libero vel in aliquam
          turpis amet iaculis.
        </p>
      </div>
    </TextCard>
  );
}
