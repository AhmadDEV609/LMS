import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import api from "../api/axios";

const CourseLearning = () => {
    const { courseId } = useParams();

    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [trackingData, setTrackingData] = useState(null);
    const [isComplete, setIsComplete] = useState(false);

    // AI Chat state
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chatOpen, setChatOpen] = useState(false);

    const videoRef = useRef(null);

    // =========================
    // GET VIDEOS
    // =========================
    const getVideos = async () => {
        try {
            const res = await api.get(
                `/v1/video/getVideos/${courseId}`
            );
            const videos = res?.data?.videos || [];
            setVideos(videos);
            if (videos.length > 0) {
                setSelectedVideo(videos[0]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getVideos();
    }, []);

    // =========================
    // PROGRESS TRACKING
    // =========================
    const calculateProgress = async () => {
        if (!selectedVideo?._id) return;
        try {
            await api.post(
                `/v1/progress/${selectedVideo._id}`,
                {
                    currentDuration: videoRef.current?.currentTime || 0,
                },
                { withCredentials: true }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const getProgress = async () => {
        if (!selectedVideo?._id) return;
        try {
            const res = await api.get(
                `/v1/progress/video/${selectedVideo._id}`,
                { withCredentials: true }
            );
            setTrackingData(res.data?.getVideo);
            setIsComplete(res.data?.getVideo?.isComplete || false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (selectedVideo?._id) {
            getProgress();
        }
    }, [selectedVideo?._id]);

    useEffect(() => {
        if (!selectedVideo?._id) return;
        const interval = setInterval(() => {
            calculateProgress();
        }, 5000);
        return () => clearInterval(interval);
    }, [selectedVideo?._id]);

    const percentage = Math.round(trackingData?.watchPercentage || 0);

    const handleCompleted = async () => {
        try {
            const newValue = !isComplete;
            setIsComplete(newValue);
            const res = await api.post(
                `/v1/progress/complete/${selectedVideo._id}`,
                { isComplete: newValue },
                { withCredentials: true }
            );
            await getProgress();
            setIsComplete(res.data?.getVideos?.isComplete);
        } catch (error) {
            console.log(error);
        }
    };

    const courseProgress = async () => {
        try {
            await api.get(
                `/v1/progress/course/${courseId}`,
                { withCredentials: true }
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        courseProgress();
    }, []);

    // =========================
    // AI CHAT
    // =========================
    const askQuestion = async () => {
        if (!question.trim()) return;
        const userQuestion = question;
        setMessages((prev) => [...prev, { type: "user", text: userQuestion }]);
        setQuestion("");
        setLoading(true);
        try {
            const res = await api.post(
                `/v1/chat/${selectedVideo?._id}`,
                { question: userQuestion },
                { withCredentials: true }
            );
            setMessages((prev) => [
                ...prev,
                { type: "ai", text: res.data?.answer || "No answer received." },
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { type: "ai", text: "Sorry, I couldn't answer your question." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // UI
    // =========================
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
                {/* LEFT SIDE – Video & Info */}
                <div className="flex-1 p-4 lg:p-6">
                    {/* Video Player */}
                    <div className="bg-black rounded-2xl overflow-hidden shadow-xl">
                        <video
                            src={selectedVideo?.videoUrl}
                            controls
                            ref={videoRef}
                            onEnded={calculateProgress}
                            className="w-full aspect-video lg:max-h-[70vh] object-contain"
                        />
                    </div>

                    {/* Video Details Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6 p-5">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                            {selectedVideo?.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 mt-4">
                            {/* Progress Indicator */}
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-16 relative">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                        <circle
                                            cx="18" cy="18" r="15.5"
                                            fill="none" stroke="#e2e8f0" strokeWidth="3"
                                        />
                                        <circle
                                            cx="18" cy="18" r="15.5"
                                            fill="none"
                                            stroke="url(#gradient)" strokeWidth="3"
                                            strokeDasharray={`${percentage} 100`}
                                            strokeLinecap="round"
                                        />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#0ea5e9" />
                                                <stop offset="100%" stopColor="#06b6d4" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-sky-600">
                                        {percentage}%
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500">Watched</span>
                            </div>

                            {/* Mark Complete Toggle */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={isComplete}
                                        onChange={handleCompleted}
                                        className="sr-only"
                                    />
                                    <div
                                        className={`w-10 h-5 rounded-full transition-colors ${isComplete ? "bg-sky-500" : "bg-gray-300"
                                            }`}
                                    />
                                    <div
                                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${isComplete ? "translate-x-5" : ""
                                            }`}
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                    {isComplete ? "Completed" : "Mark Complete"}
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR – Course Videos List */}
                <div className="w-full lg:w-96 bg-white border-l border-gray-200 p-4 lg:p-6 overflow-y-auto">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        📚 Course Content
                    </h3>
                    <div className="space-y-2">
                        {videos.map((video) => {
                            const isActive = selectedVideo?._id === video._id;
                            return (
                                <div
                                    key={video._id}
                                    onClick={() => { setSelectedVideo(video); setMessages([]); setQuestion(""); }}
                                    className={`p-3 rounded-xl cursor-pointer transition-all duration-200 border ${isActive
                                        ? "bg-sky-50 border-sky-200 shadow-sm"
                                        : "hover:bg-gray-50 border-transparent"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-black overflow-hidden shrink-0">
                                            <video
                                                src={video.videoUrl}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-800 truncate">
                                                {video.title}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {video.description}
                                            </p>
                                        </div>
                                        {isActive && (
                                            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* FLOATING AI TUTOR BUTTON & CHAT PANEL */}
            <div className="fixed bottom-6 right-6 z-50">
                {/* Chat Panel */}
                {chatOpen && (
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 sm:w-96 mb-4 overflow-hidden animate-slide-up">
                        {/* Chat Header */}
                        <div className="bg-linear-to-r from-sky-500 to-cyan-500 text-white px-5 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🤖</span>
                                <div>
                                    <h3 className="font-bold text-sm">AI Tutor</h3>
                                    <p className="text-xs opacity-80">Ask about this lecture</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setChatOpen(false)}
                                className="text-white/80 hover:text-white text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
                            {messages.length === 0 && (
                                <div className="text-center text-gray-400 mt-10">
                                    <span className="text-4xl">💬</span>
                                    <p className="mt-2">Ask me anything about the current lecture.</p>
                                </div>
                            )}
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.type === "user"
                                            ? "bg-sky-600 text-white rounded-br-md"
                                            : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md p-3 shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-gray-200 bg-white">
                            <div className="flex gap-2">
                                <input
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") askQuestion();
                                    }}
                                    placeholder="Type your question..."
                                    className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                                />
                                <button
                                    onClick={askQuestion}
                                    disabled={loading || !question.trim()}
                                    className="bg-sky-600 hover:bg-sky-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-xl font-medium transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.925a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.114A28.897 28.897 0 003.105 2.289z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Toggle Button */}
                <button
                    onClick={() => setChatOpen(!chatOpen)}
                    className="bg-linear-to-r from-sky-500 to-cyan-500 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-2xl relative"
                >
                    {chatOpen ? "✕" : "💬"}
                    {!chatOpen && messages.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {messages.length}
                        </span>
                    )}
                </button>
            </div>

            <Footer />

            {/* Keyframe for slide-up animation */}
            <style>{`
        .animate-slide-up {
          animation: slideUp 0.25s ease-out;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </>
    );
};

export default CourseLearning;