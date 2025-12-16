"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Page() {
   const params = useParams();
      const id = params?.id;
  const [timerOn, setTimerOn] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedCount, setSelectedCount] = useState<number>(5);

  const [isFetching, setIsFetching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

 
  const [lockedQuestions, setLockedQuestions] = useState<Record<number, boolean>>({});

  const secondsPerQuestion = 15; 
  const [remainingTime, setRemainingTime] = useState<number>(secondsPerQuestion);
  const intervalRef = useRef<number | null>(null);

  const startQuiz = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getQuizzes/${selectedCount}/${id}`
      );

      setQuestions(response.data || []);
      console.log("Fetched questions:", response.data);
      setCurrentIndex(0);
      setAnswers({});
      setShowResults(false);
      setScore(0);
      setRemainingTime(secondsPerQuestion);
      setLockedQuestions({}); 
    } catch (err) {
      console.error("Failed to fetch quizzes:", err);
    } finally {
      setIsFetching(false);
    }
  };

  const selectOption = (opt: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: opt }));
  };


  const goPrev = () => {
    const target = Math.max(0, currentIndex - 1);
    if (target === currentIndex) return;
    if (lockedQuestions[target]) {
      alert("You cannot go back to a question that timed out.");
      return;
    }
    setCurrentIndex(target);
  };

  const goNext = () => {
    setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));
  };

  const handleNext = (forceFinish = false) => {
    const answeredCount = Object.keys(answers).length;
    if (currentIndex < questions.length - 1) {
      goNext();
      return;
    }

    // if (!forceFinish && answeredCount !== questions.length) {
    //   alert("Please answer all questions before finishing the quiz.");
    //   return;
    // }

    let correct = 0;
    questions.forEach((q, idx) => {
      const userAns = (answers[idx] || "").toString().trim().toLowerCase();
      const correctAns = (q.answer || "").toString().trim().toLowerCase();
      if (userAns && userAns === correctAns) correct += 1;
    });
    setScore(correct);
    setShowResults(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentIndex(0);
    setShowResults(false);
    setScore(0);
    setRemainingTime(secondsPerQuestion);
    setLockedQuestions({}); 
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!timerOn || questions.length === 0 || showResults) {
      setRemainingTime(secondsPerQuestion);
      return;
    }

    setRemainingTime(secondsPerQuestion);

    intervalRef.current = window.setInterval(() => {
      setRemainingTime((t) => {
        if (t <= 1) {
         
          setAnswers((prev) => {
            if (prev[currentIndex] !== undefined) return prev;
            setLockedQuestions((l) => ({ ...l, [currentIndex]: true }));
            return { ...prev, [currentIndex]: "" };
          });

          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          if (currentIndex === questions.length - 1) {
            handleNext(true);
          } else {
            setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));
          }
          return secondsPerQuestion;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timerOn, currentIndex, questions.length, showResults]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-serif text-gray-800 leading-tight mb-2">
              Jamaican Dialect Quiz
            </h1>
            <p className="text-gray-600">
              Anser the question correctly to test your knowledge of Jamaican dialect
            </p>
          </div>
        </div>

        <div className="my-8 border-t border-gray-200" />

        <div className="flex items-center justify-start gap-6">
          <div className="flex items-center gap-4">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Question timer:
            </div>

            <button
              onClick={() => setTimerOn((s) => !s)}
              aria-pressed={timerOn}
              aria-label="Toggle question timer"
              className={`relative inline-flex items-center h-6 w-12 rounded-full transition-colors duration-200 focus:outline-none ${
                timerOn ? "bg-green-800" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                  timerOn ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">
              Questions:
            </label>
            <select
              value={selectedCount}
              onChange={(e) => setSelectedCount(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="h-8 w-px bg-gray-200 mx-4" />

          <button
            type="button"
            onClick={() => startQuiz()}
            className="ml-2 bg-green-700 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-md transition-colors uppercase text-sm tracking-wider"
          >
            Start the Quiz
          </button>
        </div>

        
        <div className="mt-8">
          {isFetching ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center text-sm text-gray-500 py-10">No questions loaded. Click "Start the Quiz" to fetch questions.</div>
          ) : showResults ? (
            
            <div className="bg-white border border-gray-100 rounded-md p-6 shadow-sm text-center">
              <h2 className="text-2xl font-semibold mb-2">Quiz Complete</h2>
              <p className="text-lg text-gray-800 mb-4">You scored {score} / {questions.length}</p>
              <div className="text-sm text-gray-600 mb-6">Review your answers below or retry the quiz.</div>

              <div className="space-y-3 text-left mb-6">
                {questions.map((q, idx) => (
                  <div key={q.id || idx} className="p-3 border rounded">
                    <div className="font-medium">{idx + 1}. {q.question}</div>
                    <div className="text-sm mt-1">Your answer: <span className="font-semibold">{answers[idx] ?? "—"}</span></div>
                    <div className="text-sm text-green-700">Correct answer: <span className="font-semibold">{q.answer}</span></div>
                    {lockedQuestions[idx] && <div className="text-xs text-red-600 mt-1">Timed out</div>}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4">
                <button onClick={handleRetry} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Retry</button>
                <button onClick={() => startQuiz()} className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800">Fetch New Quiz</button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-md p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-gray-500">Question {currentIndex + 1} of {questions.length}</div>
                  {timerOn && (
                    <div className="text-xs text-red-600 mt-1">Time left: {remainingTime}s</div>
                  )}
                  <div className="font-semibold text-lg mt-1">{questions[currentIndex].type === "multiple_choice" ? "Multiple choice" : "Fill in the blank"}</div>
                </div>
                <div className="text-sm text-gray-500">{questions[currentIndex].created_at ? new Date(questions[currentIndex].created_at).toLocaleDateString() : ""}</div>
              </div>

              <div className="mb-6">
                <div className="text-xl font-medium text-gray-800">{questions[currentIndex].question}</div>
              </div>

              <div className="grid gap-3">
                {(JSON.parse(questions[currentIndex].options) || []).map((opt: string) => {
                  const selected = answers[currentIndex] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => selectOption(opt)}
                      className={`text-left w-full px-4 py-3 rounded-md border transition ${selected ? "bg-green-700 text-white border-green-700" : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2">
                  {/* <button
                    onClick={goPrev}
                    className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
                    disabled={currentIndex === 0 || !!lockedQuestions[currentIndex - 1]}
                    title={lockedQuestions[currentIndex - 1] ? "Cannot go back to a timed-out question" : undefined}
                  >
                    Prev
                  </button> */}
                  <button onClick={() => handleNext(false)} className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm">
                    {currentIndex === questions.length - 1 ? "Finish" : "Next"}
                  </button>
                </div>

                {/* <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-600">Progress</div>
                  <div className="w-40 bg-gray-200 h-2 rounded overflow-hidden">
                    <div className="h-2 bg-green-600" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
                  </div>
                </div> */}
              </div>

              
              <div className="mt-4 text-sm text-gray-600">
                Selected: {answers[currentIndex] ?? "—"}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
