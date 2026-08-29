import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import api from "../api/axios";
const CourseDetailStudent = () => {
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [previewVideos, setPreviewVideos] = useState([]);
    const [activeVideo, setActiveVideo] = useState("");
    const [showPayment, setShowPayment] = useState(false);
    const [currentRating, setcurrentRating] = useState(0);
    const [avgRating, setavgRating] = useState([]);

    const rating = ["☆", "☆", "☆", "☆", "☆"];

    const fetchCourseDetail = async () => {
        try {
            setLoading(true);
            const { data } = await api.get(`/v1/courses/${id}`, {
                withCredentials: true,
            });
            setCourse(data.course);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const fetchPreviewVideos = async () => {
        try {
            const res = await api.get(`/v1/video/preview/videos/${id}`);
            setPreviewVideos(res.data.videos || []);
            if (res.data.videos?.length > 0) {
                setActiveVideo(res.data.videos[0].videoUrl);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCourseDetail();
        fetchPreviewVideos();
    }, [id]);

    const handleEnroll = async () => {
        try {
            const { data } = await api.post(
                "/v1/payment/create",
                { courseId: course._id },
                { withCredentials: true }
            );
            window.location.href = data.url;
        } catch (error) {
            console.log(error);
        }
    };

    const handleRating = async (index) => {
        try {
            const res = await api.post(
                `/v1/rating/${id}`,
                { rating: index },
                { withCredentials: true }
            );
            if (res.status === 200) {
                alert("Rating submitted successfully");
            }
            getRating();
        } catch (error) {
            console.log(error);
        }
    };

    const getRating = async () => {
        try {
            const res = await api.get(
                `/v1/rating/getRating/${id}`,
                { withCredentials: true }
            );
            setcurrentRating(res.data.result?.rating || 0);
            setavgRating(res.data?.avg);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRating();
    }, [currentRating]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <Navbar />


            <div className="min-h-screen bg-gray-50 py-10">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-10">


                    <div className="lg:col-span-2 space-y-8">


                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                            <span className="inline-block bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                                {course?.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                                {course?.title}
                            </h1>
                        </div>

                        {/* About this course */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                About This Course
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-base">
                                {course?.description}
                            </p>
                        </div>

                        {/* Preview Video Player */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-5">
                                Preview Lecture
                            </h2>
                            {activeVideo ? (
                                <div className="rounded-xl overflow-hidden bg-black shadow-lg">
                                    <video
                                        src={activeVideo}
                                        controls
                                        className="w-full aspect-video"
                                    />
                                </div>
                            ) : (
                                <p className="text-gray-500">No preview available</p>
                            )}
                        </div>

                        {/* Preview Lectures List */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Preview Lectures ({previewVideos.length})
                            </h2>
                            <div className="space-y-3">
                                {previewVideos.map((video) => (
                                    <div
                                        key={video._id}
                                        onClick={() => setActiveVideo(video.videoUrl)}
                                        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${activeVideo === video.videoUrl
                                            ? "bg-sky-50 border border-sky-200 shadow-md"
                                            : "hover:bg-gray-50 border border-transparent"
                                            }`}
                                    >
                                        {/* Thumbnail with Play Icon */}
                                        <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-black shrink-0">
                                            <video
                                                src={video.videoUrl}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-sm">
                                                    ▶
                                                </div>
                                            </div>
                                        </div>
                                        {/* Info */}
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold text-gray-900">
                                                    {video.title || "Untitled Lecture"}
                                                </h3>
                                                <span className="text-xs px-2 py-1 rounded-full bg-sky-100 text-sky-600 font-medium">
                                                    Preview
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Watch sample lecture
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                All Lectures
                            </h2>
                            <div className="space-y-3">

                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50"
                                    >
                                        <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-gray-300 shrink-0">
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <span className="text-white text-2xl">🔒</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-700">
                                                Lecture {item}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Locked - Enroll to access
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 sticky top-6">

                            <img
                                src={course?.courseThumbnail}
                                alt={course?.title}
                                className="w-full h-48 object-cover rounded-xl mb-6 shadow-sm"
                            />

                            <h2 className="text-xl font-bold text-gray-900 mb-5">
                                Course Details
                            </h2>

                            <div className="space-y-4 text-sm">

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Price</span>
                                    <span className="text-lg font-bold text-sky-600">
                                        ${course?.price}
                                    </span>
                                </div>


                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Your Rating</span>
                                    <div className="flex items-center gap-1">
                                        {rating.map((star, index) => (
                                            <span
                                                key={index}
                                                onClick={() => handleRating(index + 1)}
                                                className={`text-xl cursor-pointer transition-colors ${index + 1 <= currentRating
                                                    ? "text-amber-400"
                                                    : "text-gray-300 hover:text-amber-300"
                                                    }`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>


                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Avg Rating</span>
                                    <span className="font-semibold text-yellow-600 flex items-center gap-1">
                                        ★{" "}
                                        {avgRating && avgRating.length > 0
                                            ? avgRating[0]?.average || "N/A"
                                            : "N/A"}
                                    </span>
                                </div>

                                {/* Reviews Count */}
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Reviews</span>
                                    <span className="font-semibold">
                                        {course?.totalRatings || 0}
                                    </span>
                                </div>

                                {/* Lectures Count */}
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Lectures</span>
                                    <span className="font-semibold">
                                        {course?.lectures?.length || 0}
                                    </span>
                                </div>
                            </div>


                            <button
                                onClick={handleEnroll}
                                className="w-full mt-6 bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white py-3.5 rounded-xl font-semibold transition duration-200 shadow-md shadow-sky-200"
                            >
                                Enroll Now
                            </button>
                            <p className="text-xs text-gray-400 text-center mt-3">
                                30-day money-back guarantee
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default CourseDetailStudent;