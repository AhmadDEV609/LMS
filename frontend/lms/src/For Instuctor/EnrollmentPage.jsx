import React, { useEffect, useState } from 'react'
import api from '../api/axios'

const EnrollmentPage = () => {
    const [enrollments, setEnrollments] = useState([])
    const [loading, setLoading] = useState(true)


    const getEnrollments = async () => {
        try {
            const res = await api.get(
                "http://localhost:5000/v1/enrollments/all",
                { withCredentials: true }
            )



            setEnrollments(res.data.enrollments)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getEnrollments()
    }, [])



    const total = enrollments.map((element) => {
        return element.courseID.price
    })

    const totalAmount = total.reduce((a, b) => {
        return a + b
    }, 0)

    console.log(totalAmount)

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6">

            <div className="mb-8">
                <h1 className="text-4xl font-bold text-sky-600">
                    Student Enrollments
                </h1>
                <p className="text-gray-500 mt-2">
                    Manage and monitor enrolled students
                </p>
            </div>


            <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-sky-100">
                <h2 className="text-lg font-semibold text-gray-700">
                    Total Enrollments || Total Earning
                </h2>
                <p className="text-4xl font-bold text-sky-600 mt-2">
                    {enrollments.length} || ${totalAmount}
                </p>


            </div>



            {enrollments.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                    <h2 className="text-2xl font-semibold text-gray-700">
                        No Enrollments Found
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Students enrolled in your courses will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {enrollments.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-sky-100 overflow-hidden"
                        >

                            <div className="bg-linear-to-r from-sky-500 to-cyan-400 p-5">
                                <h2 className="text-white text-xl font-bold">
                                    {item.courseID?.title}
                                </h2>
                            </div>


                            <div className="p-5 space-y-3">
                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Student Name
                                    </p>
                                    <p className="font-semibold text-gray-800">
                                        {item.user?.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Email
                                    </p>
                                    <p className="font-medium text-gray-700 break-all">
                                        {item.user?.email}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Course Price
                                    </p>
                                    <p className="font-semibold text-green-600">
                                        ${item.courseID?.price}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Payment Status
                                    </p>
                                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                        {item.paymentStatus}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Enrollment Date
                                    </p>
                                    <p className="font-medium text-gray-700">
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )


}

export default EnrollmentPage
