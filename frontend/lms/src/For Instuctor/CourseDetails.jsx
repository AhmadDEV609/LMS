import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CourseDetails() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    const [videos, setVideos] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [updateVideoData, setUpdateVideoData] = useState({
        chapter: "",
        title: "",
        description: "",
        isPreview: false,
    });

    const [videoThumbnail, setvideoThumbnail] = useState(null)
    const [video, setvideo] = useState(null)





    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                setLoading(true);

                const courseRes = await api.get(
                    `http://localhost:5000/v1/courses/${id}`,
                    { withCredentials: true }
                );

                setCourse(courseRes.data.course);

            } catch (error) {
                console.log("Error fetching course:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [id]);


    const handleVideoSubmit = async () => {
        try {
            const formData = new FormData();
            setLoading(true)
            formData.append("chapter", updateVideoData.chapter);
            formData.append("title", updateVideoData.title);
            formData.append("description", updateVideoData.description);
            formData.append("isPreview", updateVideoData.isPreview);
            formData.append("courseId", id);

            if (videoThumbnail) formData.append("thumbnail", videoThumbnail);
            if (video) formData.append("videoUrl", video);

            await api.post(
                `http://localhost:5000/v1/video/add/${id}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Video uploaded successfully");
            setShowModal(false);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    const deletebtn = async () => {
        setLoading(true)
        try {
            await api.delete(`http://localhost:5000/v1/courses/${id}`,
                { withCredentials: true }
            )
            navigate('/instructor')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    const getVideos = async () => {
        try {
            const res = await api.get(
                `http://localhost:5000/v1/video/getVideos/${id}`
            );


            const data = res.data?.videos || res.data || [];

            setVideos(Array.isArray(data) ? data : []);
        } catch (error) {
            console.log(error);
            setVideos([]);
        }
    };

    useEffect(() => {
        if (id) getVideos();
    }, [id]);


    const deleteVideo = async (video) => {
        setLoading(true)
        try {
            await api.delete(`http://localhost:5000/v1/video//delete/${video}`,
                { withCredentials: true }
            )
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sky-50">
                <p className="text-sky-600 font-bold text-xl">
                    <ClipLoader color="#0ea5e9" size={45}></ClipLoader>
                </p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 font-bold">No Course Found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sky-50">


            <div className="bg-white shadow-sm border-b border-sky-100">
                <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">

                    <div>
                        <h1 className="text-3xl font-bold text-sky-700">
                            Course Details
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Manage course
                        </p>
                    </div>

                    <div className="bg-sky-100 text-sky-700 px-4 py-2 rounded-xl font-semibold text-sm">
                        ID: {id}
                    </div>

                </div>
            </div>


            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">


                <div className="lg:col-span-2 space-y-8">


                    <div className="bg-white rounded-3xl shadow-md overflow-hidden">

                        <img
                            src={course?.courseThumbnail}
                            className="w-full h-72 object-cover"
                            alt="course"
                        />

                        <div className="p-6">

                            <h2 className="text-3xl font-bold mb-2">
                                {course.title}
                            </h2>

                            <p className="text-gray-600 mb-4">
                                {course.description}
                            </p>

                            <div className="flex gap-4">
                                <span className="text-sky-700 font-bold text-2xl">
                                    ${course.price}
                                </span>
                            </div>

                        </div>
                    </div>

                </div>

                {/* right portion */}
                <div className="bg-white rounded-3xl shadow-md p-6">

                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>

                    <button
                        onClick={() => setShowUpdateModal(true)}
                        className="w-full bg-sky-500 text-white py-3 rounded-xl mb-3"
                    >
                        Add Video
                    </button>

                    <button onClick={deletebtn} className="w-full bg-red-100 text-red-600 py-3 rounded-xl">
                        Delete Course
                    </button>

                </div>

            </div>
            {/*this is for videos*/}
            <div className="min-h-screen bg-linear-to-br from-white via-sky-50 to-sky-100 p-4 md:p-8">

                <div className="max-w-4xl mx-auto">


                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-sky-700">
                            Course Videos
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Manage your uploaded course content
                        </p>
                    </div>


                    {videos.length > 0 ? (
                        <div className="space-y-4">

                            {videos.map((video) => (
                                <div
                                    key={video._id}
                                    className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                                >


                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            {video.title}
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {video.description}
                                        </p>
                                    </div>


                                    <button
                                        onClick={() => deleteVideo(video._id)}
                                        className="bg-red-500 hover:bg-red-600 active:scale-95 transition text-white px-5 py-2 rounded-xl text-sm font-medium shadow-sm"
                                    >
                                        Delete
                                    </button>

                                </div>
                            ))}

                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-500">No videos found</p>
                        </div>
                    )}

                </div>
            </div>


            {showUpdateModal && (

                <div className="  fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

                    <div className="bg-white p-6 rounded-2xl w-full max-w-2xl relative shadow-xl">

                        <button
                            onClick={() => setShowUpdateModal(false)}
                            className="absolute top-3 right-3 text-xl"
                        >
                            ✕
                        </button>

                        <h1 className="text-2xl font-bold text-sky-700 mb-6">
                            Update Video
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <input
                                placeholder="Chapter"
                                className="w-full p-3 border rounded-xl"
                                value={updateVideoData.chapter}
                                onChange={(e) =>
                                    setUpdateVideoData({ ...updateVideoData, chapter: e.target.value })
                                }
                            />

                            <input
                                placeholder="Title"
                                className="w-full p-3 border rounded-xl"
                                value={updateVideoData.title}
                                onChange={(e) =>
                                    setUpdateVideoData({ ...updateVideoData, title: e.target.value })
                                }
                            />

                            <textarea
                                placeholder="Description"
                                className="w-full p-3 border rounded-xl md:col-span-2 h-24"
                                value={updateVideoData.description}
                                onChange={(e) =>
                                    setUpdateVideoData({ ...updateVideoData, description: e.target.value })
                                }
                            />

                            <label className="flex items-center gap-2 md:col-span-2">
                                <input
                                    type="checkbox"
                                    checked={updateVideoData.isPreview}
                                    onChange={() =>
                                        setUpdateVideoData({
                                            ...updateVideoData,
                                            isPreview: !updateVideoData.isPreview,
                                        })
                                    }
                                />
                                Is Preview
                            </label>

                            <input onChange={(e) => setvideoThumbnail(e.target.files[0])} type="file" />
                            <div>
                                <span>upload video</span><input onChange={(e) => setvideo(e.target.files[0])} type="file" />
                            </div>

                        </div>

                        <button
                            onClick={handleVideoSubmit}
                            className="w-full mt-6 bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-semibold"
                        >
                            Save Changes
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
}