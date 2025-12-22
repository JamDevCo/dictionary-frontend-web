"use client";

import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function Page() {
  const params = useParams();
  const id = params?.id;

  const [word, setWord] = useState("nyam");
  const [pronunciation, setPronunciation] = useState("ni-yam");
  const [partOfSpeech, setPartOfSpeech] = useState("verb");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // audio handling
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);


     const getWord = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getWord/${id}`);
        const data = res.data;
        setWord(data?.word?.word || "nyam");
        setPronunciation(data?.word?.pronunciation || "ni-yam");
        setPartOfSpeech(data?.meaning?.part_of_speech || "verb");
        setDefinition(data?.meaning?.definition || "");
        setExample(data?.meaning?.example || "");
        setAudioUrl(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.word.audio_path}`);
        // if (data?.word?.audio_url) {
        //   setAudioUrl(data.word.audio_url);
        // } else if (data?.word?.audio_path) {
        //   setAudioUrl(`${process.env.NEXT_PUBLIC_API_URL}/${data.word.audio_path}`);
        // } 
     
        // console.log("Fetched word data:", data.word.audio_path);

         if (!audioUrl) {
      if (audioRef.current) {
        try { audioRef.current.pause(); } catch {}
        audioRef.current = null;
      }
      setIsPlaying(false);
      return;
    }
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    } else if (audioRef.current.src !== audioUrl) {
      audioRef.current.src = audioUrl;
    }

        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch word:", err);
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    getWord();
  }, [audioUrl]);

  // sync audio src when audioUrl changes
  // useEffect(() => {
   
  // }, [audioUrl]);

  // useEffect(() => {
  //   return () => {
  //     if (audioRef.current) {
  //       try { audioRef.current.pause(); } catch {}
  //       audioRef.current = null;
  //     }
  //   };
  // }, []);

  const toggleAudio = async () => {
    if (!audioUrl) return;
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.addEventListener("ended", () => setIsPlaying(false));
      }
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const p = audioRef.current.play();
        if (p && typeof p.then === "function") await p;
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Audio play error:", err);
      setIsPlaying(false);
    }
  };

  return (
    <main className="pb-[90px]">
      {isLoading && <div className="flex justify-center items-center h-screen"> 
       
  <div className="w-full flex justify-center items-center py-10">
    <div role="status">
       <div className="flex items-center justify-center">
  <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-600 border-t-transparent"></div>
</div>
      
    </div>
  </div>

      </div>}
      {!isLoading && <div className="max-w-6xl mx-auto p-8">
        {/* header with chevrons */}
        <div className="flex items-center justify-between mb-8">
          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <ChevronLeft className="w-6 h-6 text-green-500" />
          </button>

          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <ChevronRight className="w-6 h-6 text-green-500" />
          </button>
        </div>

        {/* centered word */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-6xl font-light text-gray-900">{word}</h2>
            <button
              onClick={toggleAudio}
              disabled={!audioUrl || isLoading}
              aria-label={audioUrl ? `${isPlaying ? "Pause" : "Play"} pronunciation of ${word}` : "No audio available"}
              className={`p-2 rounded-full transition-colors ${!audioUrl ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-200"}`}
            >
              <Volume2 className={`w-6 h-6 ${isPlaying ? "text-green-600" : "text-gray-600"}`} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span className="bg-gray-200 px-3 py-1 rounded-full">{partOfSpeech}</span>
            <span>|</span>
            <span>{pronunciation}</span>
          </div>
        </div>

        {/* thin green divider */}
        <div className="w-full h-px bg-green-300 mb-8"></div>

        {/* definition */}
        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-900 mb-4">What It means</h3>
          <p className="text-gray-700 leading-relaxed mb-4">{definition || (isLoading ? "Loading..." : "No definition available.")}</p>
        </div>

        <div className="pt-4">
          <button className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
            See the entry &gt;
          </button>
        </div>

        {/* two-column area: context + newsletter */}
        <div className="max-w-6xl mx-auto mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Context (left wide) */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-medium text-gray-900 mb-6">{word.toUpperCase()} in Context</h2>
              <p className="text-gray-700 leading-relaxed">
                {example ||
                  "Lorem ipsum dolor sit amet consectetur. A non ut blandit sit eget sodales malesuada laoreet. Tincidunt duis eget id integer eu arcu. Congue bibendum at eget bibendum. Consectetur nisl blandit mattis auctor scelerisque a ornare morbi. Rhoncus pulvinar justo elit faucibus. Aliquet lectus sit turpis pharetra sagittis. Quis mi euismod urna pellentesque placerat tempus. Sed et morbi vulputate elementum. Pellentesque malesuada sit massa arcu pretium. Eget quis malesuada cras a id cursus tristique viverra. Eros suspendisse et viverra purus enim ornare nisi nulla congue."}
              </p>
            </div>

            {/* Newsletter card (right) */}
            {/* <aside className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Build your vocabulary!</h3>
                <p className="text-gray-700 mb-1">Get Word of the Day</p>
                <p className="text-gray-700">in your inbox everyday.</p>
              </div>

              <div className="flex justify-center mb-6">
                <div className="w-24 h-px bg-gray-300"></div>
              </div>

              <form onSubmit={(e)=>{ e.preventDefault();}} className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="w-full bg-[#016701] hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 uppercase text-sm tracking-wide"
                >
                  SUBSCRIBE
                </button>
              </form>

              <div className="flex justify-center mt-6">
                <div className="w-24 h-px bg-gray-300"></div>
              </div>
            </aside> */}
          </div>
        </div>
      </div>}
    </main>
  );
}