import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import api from '../api/axios'
export const Courses = () => {

    const [courseData, setcourseData] = useState([])
    const courses = async () => {
        try {
            const res = await api.get("/v1/courses/featured")
            setcourseData(res?.data?.courses)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        courses()
    }, [])
    console.log(courseData)

    return (
        <section className="py-20 bg-sky-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold text-slate-900">
                        Popular Courses
                    </h2>
                    <p className="text-slate-500 mt-3">
                        Top trending courses in PrimeLearn
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courseData.map((course, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                            <div className="overflow-hidden">
                                <img
                                    src={course?.courseThumbnail || 'https://via.placeholder.com/400x225?text=Course'}
                                    alt={course.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">{course.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Learn {course.title} with practical projects.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-sky-600">paid</span> {/* ya price */}
                                    <button className="px-4 py-2 bg-sky-500 text-white rounded-xl text-sm font-medium hover:bg-sky-600 transition cursor-pointer">
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}