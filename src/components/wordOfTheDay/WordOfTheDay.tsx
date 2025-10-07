"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import { format, parseISO, subDays, addDays } from "date-fns";

interface Meaning {
  part_of_speech: string;
  definition: string;
  example: string;
  usage: string;
}

interface WordOfTheDayData {
  date: string;
  word: string;
  pronunciation: string;
  audio_path: string;
  audio_url: string;
  meanings: Meaning[] | [];
}

export default function WordOfTheDay() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [wordData, setWordData] = useState<WordOfTheDayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string | null>(null);
  const today = format(new Date(), "yyyy-MM-dd");

  const fetchWord = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log(apiBaseUrl);
      const res = await axios.get(`${apiBaseUrl}/api/word/daily`);
      console.log(res);
      if (Array.isArray(res.data) && res.data.length > 0) {
        setWordData({
          date: format(new Date(), "EEEE, MMM dd, yyyy"),
          word: res.data[0].word,
          pronunciation: res.data[0].pronunciation,
          audio_path: res.data[0].audio_path || "",
          audio_url: res.data[0].audio_url || "",
          meanings: res.data[0].meanings || [],
        });
        setCurrentDate(today);
      } else {
        setError("No word available for today.");
      }
    } catch (err) {
      setError("Failed to load word of the day.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWordDate = async (dateParam: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${apiBaseUrl}/api/word/daily?date=${dateParam}`
      );
      console.log(res);
      if (Array.isArray(res.data) && res.data.length > 0) {
        const dateObj = parseISO(dateParam);
        setWordData({
          date: format(dateObj, "EEEE, MMM dd, yyyy"),
          word: res.data[0].word,
          pronunciation: res.data[0].pronunciation,
          audio_path: res.data[0].audio_path || "",
          audio_url: res.data[0].audio_url || "",
          meanings: res.data[0].meanings || [],
        });
        setCurrentDate(dateParam);
      } else {
        setError("No word available for this date.");
      }
    } catch (err) {
      setError("Failed to load word of the day.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  const handlePronunciation = () => {
    if (wordData) {
      const audioSrc = wordData.audio_url || wordData.audio_path;
      console.log("Playing audio from:", audioSrc);
      if (audioSrc) {
        const audio = new Audio(audioSrc);
        audio.play().catch((err) => {
          console.error("Audio playback failed:", err);
        });
      } else {
        console.log(`No audio available for: ${wordData.word}`);
      }
    }
  };

  const handlePrevious = () => {
    if (!currentDate) return;

    const prevDate = format(subDays(parseISO(currentDate), 1), "yyyy-MM-dd");
    console.log("Fetching previous word for date:", prevDate);
    fetchWordDate(prevDate);
  };

  const handleNext = () => {
    if (!currentDate) return;

    const nextDate = format(addDays(parseISO(currentDate), 1), "yyyy-MM-dd");
    console.log("Fetching next word for date:", nextDate);

    if (nextDate <= today) {
      fetchWordDate(nextDate);
    }
  };


  const earliestDate = format(subDays(parseISO(today), 6), "yyyy-MM-dd");

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center text-gray-500">
        Loading word of the day...
      </div>
    );
  }

  if (error || !wordData) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center text-red-500">
        {error || "No word available."}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <button
          className={`p-2 rounded-full hover:bg-gray-200 transition-colors ${!currentDate || currentDate <= earliestDate
            ? "opacity-50 cursor-not-allowed"
            : ""
            }`}
          onClick={handlePrevious}
          disabled={!currentDate || currentDate <= earliestDate}
        >
          <ChevronLeft className="w-6 h-6 text-gray-400" />
        </button>

        <div className="text-center">
          <h1 className="text-lg font-medium text-gray-700 mb-1">
            Word of the day
          </h1>
          <p className="text-sm text-gray-500">{wordData.date}</p>
        </div>

        <button
          className={`p-2 rounded-full hover:bg-gray-200 transition-colors ${!currentDate || currentDate >= today ? "opacity-50 cursor-not-allowed" : ""
            }`}
          onClick={handleNext}
          disabled={!currentDate || currentDate >= today}
        >
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h2 className="text-6xl font-light text-gray-900">{wordData.word}</h2>
          <button
            onClick={handlePronunciation}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label={`Play pronunciation of ${wordData.word}`}
          >
            <Volume2 className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          {wordData.meanings && wordData.meanings.length > 0 ? (
            wordData.meanings.map((m, i) => (
              <span key={i} className="bg-gray-200 px-3 py-1 rounded-full">
                {m.part_of_speech}
              </span>
            ))
          ) : (
            <span className="bg-gray-200 px-3 py-1 rounded-full">-</span>
          )}
          <span>|</span>
          <span>{wordData.pronunciation}</span>
        </div>
      </div>
      <div className="w-full h-px bg-green-300 mb-8"></div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Meaning and Usage</h1>
      {wordData.meanings.length > 0 ? (
        wordData.meanings.map((m, i) => (
          <div key={i} className="mb-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {i + 1}. {m.definition}{" "}
              <span className="font-bold text-black">|</span> {m.usage || ""}
            </p>
          </div>
        ))
      ) : (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">N/A</p>
        </div>
      )}
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Example Sentences</h1>
      {wordData.meanings.length > 0 ? (
        wordData.meanings.map((m, i) => (
          <div key={i} className="mb-8">
            <p className="text-gray-600 italic text-lg leading-relaxed">
              {i + 1}. {m.example || "N/A"}
            </p>
          </div>
        ))
      ) : (
        <div className="mb-8">
          <p className="text-gray-600 italic text-sm leading-relaxed">N/A</p>
        </div>
      )}
      <div className="pt-4">
        <button className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
          See the entry &gt;
        </button>
      </div>
    </div>
  );
}