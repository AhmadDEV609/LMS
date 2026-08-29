import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from '../api/axios'
import { useNavigate } from "react-router-dom";

const MyEnrollments = () => {
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [progressMap, setProgressMap] = useState({});

    const navigate = useNavigate();


    const Courses = async () => {
        try {
            setLoading(true);
            const res = await api.get("/v1/enrollments", {
                withCredentials: true,
            });
            setData(res?.data?.checkPayment || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // 2. Get progress for single course
    const getCourseProgress = async (courseId) => {
        try {
            const res = await api.get(
                `/v1/progress/course/${courseId}`,
                { withCredentials: true }
            );
            return res.data.progressPercentage || 0;
        } catch (error) {
            console.log(error);
            return 0;
        }
    };

    useEffect(() => {
        const fetchProgress = async () => {
            const temp = {};

            for (const item of Data) {

                if (!item?.courseID) continue;

                const progress = await getCourseProgress(
                    item.courseID._id
                );

                temp[item.courseID._id] = progress;
            }

            setProgressMap(temp);
        };

        if (Data.length > 0) {
            fetchProgress();
        }
    }, [Data]);

    useEffect(() => {
        Courses();
    }, []);


    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex justify-center items-center h-[80vh]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-500 font-medium">Loading your enrollments...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
                            My Enrollments 📚
                        </h1>
                        <p className="text-gray-500 mt-2 text-lg">
                            Pick up where you left off and continue mastering new skills.
                        </p>
                    </div>

                    {/* Enrollments Grid */}
                    {Data.length > 0 ? (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Data.map((item) => {
                                const course = item?.courseID;
                                const progress = Math.round(progressMap[course?._id] || 0);

                                return (
                                    <div
                                        key={item._id}
                                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                                    >
                                        {/* Thumbnail + Overlay */}
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={course?.courseThumbnail}
                                                alt={course?.title}
                                                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Category badge */}
                                            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-sky-700 px-3 py-1 rounded-full uppercase tracking-wide shadow">
                                                {course?.category}
                                            </span>
                                            {/* Progress pill (if not 0) */}
                                            {progress > 0 && (
                                                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                                    {progress}% done
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-1">
                                            <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2">
                                                {course?.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                                                {course?.description}
                                            </p>

                                            {/* Progress Bar */}
                                            <div className="mb-5">
                                                <div className="flex justify-between text-sm mb-1.5">
                                                    <span className="text-gray-500">Progress</span>
                                                    <span className="font-semibold text-sky-600">
                                                        {progress}%
                                                    </span>
                                                </div>
                                                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-linear-to-r from-sky-500 to-cyan-500 rounded-full transition-all duration-500"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Buttons */}
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() =>
                                                        navigate(`/learn/${course?._id}`)
                                                    }
                                                    className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-2.5 rounded-xl font-semibold transition-colors shadow-md shadow-sky-200"
                                                >
                                                    Continue
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        navigate(`/course/detail/student/${course?._id}`)
                                                    }
                                                    className="flex-1 border border-sky-200 text-sky-700 bg-white hover:bg-sky-50 py-2.5 rounded-xl font-semibold transition-colors"
                                                >
                                                    Course Detail
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (

                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-16 text-center">
                            <div className="text-5xl mb-4">📭</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                No Enrollments Yet
                            </h2>
                            <p className="text-gray-500 mb-6">
                                You haven’t enrolled in any course. Explore our catalog and start
                                learning today!
                            </p>
                            <button
                                onClick={() => navigate("/courses")}
                                className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                            >
                                Browse Courses
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyEnrollments;