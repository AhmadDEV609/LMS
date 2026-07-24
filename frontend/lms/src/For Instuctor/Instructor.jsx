import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useContext } from "react";
import { AuthContext } from "../contextApi/AuthContext";
export default function InstructorDashboard() {

    const [dropdown, setDropdown] = useState(false);

    const { loading, user, logout, getUser, setuser } = useContext(AuthContext);
    console.log(user.name)
    const [pageLoading, setPageLoading] = useState(true);
    const [courseLoading, setCourseLoading] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [course, setcourse] = useState({
        title: "",
        category: "",
        description: "",
        price: "",
        discount: ""
    });

    const [image, setimage] = useState(null);

    const navigate = useNavigate();



    //  course submit
    const handleSubmit = async () => {
        setCourseLoading(true);

        const formdata = new FormData();
        formdata.append("title", course.title);
        formdata.append("description", course.description);
        formdata.append("price", course.price);
        formdata.append("category", course.category);
        formdata.append("discount", course.discount);

        if (image) {
            formdata.append("courseThumbnail", image);
        }

        try {
            const res = await api.post(
                "http://localhost:5000/v1/courses",
                formdata,
                { withCredentials: true }
            );

            alert("Course Created Successfully");

            setcourse({
                title: "",
                category: "",
                description: "",
                price: "",
                discount: ""
            });

            setimage(null);
            console.log(res)

            const courseId = res.data?.newCourse?._id;

            if (!courseId) {
                alert("Course ID missing");
                return;
            }

            navigate(`/course/detail/${courseId}`);
        } catch (error) {
            console.log(error);
        } finally {
            setCourseLoading(false);
        }
    };




    return (
        <div className="flex min-h-screen bg-sky-50">

            {/* sidebar */}
            <>
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <aside className={`
                    fixed md:static z-50 top-0 left-0 h-full
                    bg-white border-r border-sky-100 p-5
                    w-64
                    transform transition-transform duration-300
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}>

                    {/* mobile sidebar */}
                    <div className="flex justify-between items-center mb-8 md:hidden">
                        <h2 className="text-xl font-bold text-sky-700">
                            LMS Panel
                        </h2>

                        <button onClick={() => setSidebarOpen(false)}>
                            ✕
                        </button>
                    </div>

                    {/* DESKTOP TITLE */}
                    <h2 className="hidden md:block text-xl font-bold text-sky-700 mb-8">
                        LMS Panel
                    </h2>

                    <nav className="flex flex-col gap-3">

                        <button className="bg-sky-100 px-4 py-2 rounded-xl font-semibold text-left">
                            ➕ Add Course
                        </button>

                        <Link to={'/enrollment'}>  <button className="hover:bg-sky-50 px-4 py-2 rounded-xl text-left">
                            📊 Enrollments
                        </button>
                        </Link>
                        <button className="hover:bg-sky-50 px-4 py-2 rounded-xl text-left">
                            <Link to={'/courses'}> 📚 My Courses</Link>
                        </button>

                    </nav>
                </aside>
            </>

            {/* main content*/}
            <div className="flex-1 flex flex-col">


                <div className="h-14 bg-white border-b flex items-center justify-between px-5">


                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setSidebarOpen(true)}
                    >
                        ☰
                    </button>

                    <div
                        className="relative ml-auto"
                        onMouseEnter={() => setDropdown(true)}
                        onMouseLeave={() => setDropdown(false)}
                    >
                        <img
                            src={user?.image}
                            className="w-10 h-10 rounded-full border cursor-pointer"
                        />

                        {dropdown && (
                            <div className="absolute right-0 top-10 w-56 bg-white shadow-xl border rounded-xl z-50">

                                <div className="p-3 border-b">
                                    <p className="font-bold">{user?.name}</p>
                                    <p className="text-sm text-gray-500">{user?.role}</p>
                                </div>



                                <button
                                    onClick={logout}
                                    className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-500"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>


                <div className="p-6">

                    <h1 className="text-2xl font-bold text-sky-700 mb-4">
                        Create Course
                    </h1>


                    <div className="relative bg-white p-6 rounded-2xl shadow-md max-w-2xl space-y-4">

                        {courseLoading && (
                            <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl z-10">
                                <ClipLoader color="#0ea5e9" size={45} />
                            </div>
                        )}

                        <input
                            value={course.title}
                            onChange={(e) => setcourse({ ...course, title: e.target.value })}
                            placeholder="Course Title"
                            className="w-full p-3 border rounded-xl"
                        />

                        <textarea
                            value={course.description}
                            onChange={(e) => setcourse({ ...course, description: e.target.value })}
                            placeholder="Course Description"
                            className="w-full p-3 border rounded-xl h-28"
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <input
                                value={course.price}
                                onChange={(e) => setcourse({ ...course, price: e.target.value })}
                                type="number"
                                placeholder="Price"
                                className="p-3 border rounded-xl"
                            />

                            <input
                                value={course.category}
                                onChange={(e) => setcourse({ ...course, category: e.target.value })}
                                placeholder="Category"
                                className="p-3 border rounded-xl"
                            />
                        </div>

                        <input
                            value={course.discount}
                            onChange={(e) => setcourse({ ...course, discount: e.target.value })}
                            type="number"
                            placeholder="Discount %"
                            className="w-full p-3 border rounded-xl"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setimage(e.target.files[0])}
                            className="w-full"
                        />

                        <button
                            onClick={handleSubmit}
                            disabled={courseLoading}
                            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
                        >
                            Create Course
                        </button>

                    </div>




                </div>
            </div>
        </div>
    );
}