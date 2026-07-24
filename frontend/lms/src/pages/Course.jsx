import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import api from "../api/axios";
const Course = () => {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const categories = ["web", "app", "design", "marketing", "programming"];

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const { data } = await api.get(
                `/v1/courses?page=${page}&search=${search}&category=${category}`
            );
            setCourses(data.courses.docs);
            setTotalPages(data.courses.totalPages);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [page, search, category]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">
                {/* Banner */}
                <div className="relative bg-linear-to-r from-sky-600 to-cyan-600 py-16 px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="max-w-7xl mx-auto text-center relative">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                            Discover PrimeLearn Courses
                        </h1>
                        <p className="text-sky-100 text-lg md:text-xl max-w-2xl mx-auto">
                            Level up your skills with top courses from industry experts
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-10">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar - Filters */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                                    <span>🔍</span> Search & Filter
                                </h2>

                                {/* Search */}
                                <div className="relative mb-6">
                                    <input
                                        type="text"
                                        placeholder="Search courses..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setPage(1);
                                        }}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition"
                                    />
                                    <svg
                                        className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>

                                <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wider">
                                    Categories
                                </h3>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => {
                                            setCategory("");
                                            setPage(1);
                                        }}
                                        className={`text-left px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${category === ""
                                            ? "bg-sky-600 text-white shadow-md shadow-sky-200"
                                            : "bg-gray-50 hover:bg-sky-50 text-gray-700"
                                            }`}
                                    >
                                        📚 All Courses
                                    </button>
                                    {categories.map((cat, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setCategory(cat);
                                                setPage(1);
                                            }}
                                            className={`text-left px-4 py-2.5 rounded-xl font-medium capitalize transition-all duration-200 ${category === cat
                                                ? "bg-sky-600 text-white shadow-md shadow-sky-200"
                                                : "bg-gray-50 hover:bg-sky-50 text-gray-700"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Courses Grid */}
                        <div className="lg:col-span-3">
                            {loading ? (
                                <div className="flex flex-col justify-center items-center h-96">
                                    <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p className="text-gray-500">Loading courses...</p>
                                </div>
                            ) : courses.length === 0 ? (
                                <div className="bg-white rounded-3xl shadow-xl p-16 text-center border border-gray-100">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">No Courses Found</h2>
                                    <p className="text-gray-500">Try a different search term or category.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {courses.map((course) => (
                                            <div
                                                key={course._id}
                                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col"
                                            >
                                                <Link
                                                    to={`/course/detail/student/${course._id}`}
                                                    className="block overflow-hidden"
                                                >
                                                    <img
                                                        src={course.courseThumbnail}
                                                        alt={course.title}
                                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </Link>
                                                <div className="p-5 flex flex-col flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-xs font-semibold bg-sky-100 text-sky-700 px-2.5 py-1 rounded-full capitalize">
                                                            {course.category}
                                                        </span>
                                                        <span className="text-lg font-bold text-sky-600">
                                                            ${course.price}
                                                        </span>
                                                    </div>
                                                    <Link
                                                        to={`/course/detail/student/${course._id}`}
                                                        className="text-lg font-bold text-gray-800 hover:text-sky-600 transition line-clamp-2 mb-2"
                                                    >
                                                        {course.title}
                                                    </Link>
                                                    {/* Static rating to mimic Udemy */}
                                                    <div className="flex items-center gap-1 text-yellow-500 mb-2">
                                                        ⭐⭐⭐⭐<span className="text-gray-400 text-sm">(4.0)</span>
                                                        <span className="text-gray-400 text-sm ml-1">· 2.4k students</span>
                                                    </div>
                                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
                                                        {course.description}
                                                    </p>
                                                    <Link
                                                        to={`/course/detail/student/${course._id}`}
                                                        className="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white py-2.5 rounded-xl font-semibold text-center transition duration-300"
                                                    >
                                                        Enroll Now
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex justify-center items-center gap-2 mt-12">
                                            <button
                                                disabled={page === 1}
                                                onClick={() => setPage(page - 1)}
                                                className={`px-4 py-2 rounded-full font-medium transition ${page === 1
                                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                    : "bg-sky-500 text-white hover:bg-sky-600 shadow"
                                                    }`}
                                            >
                                                ← Prev
                                            </button>
                                            {[...Array(totalPages).keys()].map((num) => (
                                                <button
                                                    key={num}
                                                    onClick={() => setPage(num + 1)}
                                                    className={`w-10 h-10 rounded-full font-bold transition ${page === num + 1
                                                        ? "bg-sky-600 text-white shadow-lg"
                                                        : "bg-gray-100 text-gray-700 hover:bg-sky-100"
                                                        }`}
                                                >
                                                    {num + 1}
                                                </button>
                                            ))}
                                            <button
                                                disabled={page === totalPages}
                                                onClick={() => setPage(page + 1)}
                                                className={`px-4 py-2 rounded-full font-medium transition ${page === totalPages
                                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                    : "bg-sky-500 text-white hover:bg-sky-600 shadow"
                                                    }`}
                                            >
                                                Next →
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Course;