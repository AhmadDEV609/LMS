import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);

                const res = await api.get(
                    "http://localhost:5000/v1/courses/my-courses",
                    { withCredentials: true }
                );

                setCourses(res.data.course || []);
            } catch (error) {
                console.log("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sky-50">
                <p className="text-sky-600 text-xl font-bold">
                    Loading your courses...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sky-50 p-6">


            <div className="max-w-7xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-sky-700">
                    My Courses
                </h1>
                <p className="text-gray-500">
                    Manage all your created courses
                </p>
            </div>

            {courses.length === 0 ? (
                <div className="text-center mt-20">
                    <h2 className="text-xl font-semibold text-gray-600">
                        No courses found
                    </h2>
                    <p className="text-gray-400 mt-2">
                        Start creating your first course
                    </p>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                        >


                            <img
                                src={course.courseThumbnail}
                                alt={course.title}
                                className="w-full h-44 object-cover"
                            />


                            <div className="p-5 space-y-2">

                                <h2 className="text-xl font-bold text-gray-800">
                                    {course.title}
                                </h2>

                                <p className="text-sm text-gray-500 line-clamp-2">
                                    {course.description}
                                </p>

                                <div className="flex justify-between items-center mt-3">

                                    <span className="text-sky-600 font-bold text-lg">
                                        ${course.price}
                                    </span>

                                    <span className="text-xs bg-sky-100 text-sky-700 px-3 py-1 rounded-full">
                                        {course.category}
                                    </span>

                                </div>


                                <div className="flex gap-2 mt-4">

                                    <button
                                        onClick={() => navigate(`/course/detail/${course._id}`)}
                                        className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-xl font-semibold"
                                    >
                                        View
                                    </button>



                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}