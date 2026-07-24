import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        name: "",
        email: "",
        bio: "",
        phone: "",
        city: "",
        country: "",
    });

    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    // GET USER DATA
    useEffect(() => {

        const fetchUser = async () => {

            try {

                const res = await api.get("/v1/user/getUser");

                const userData = res.data.user;

                setUser(userData);

                setForm({
                    name: userData.name || "",
                    email: userData.email || "",
                    bio: userData.bio || "",
                    phone: userData.phone || "",
                    city: userData.city || "",
                    country: userData.country || "",
                });


            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }
        };


        fetchUser();

    }, []);



    // UPDATE PROFILE
    const updateProfile = async () => {

        try {

            const res = await api.patch(
                "/v1/user/update/profile",
                form
            );


            const updatedUser = res.data.user;


            // Header data update
            setUser(updatedUser);


            // Input fields update
            setForm({
                name: updatedUser.name || "",
                email: updatedUser.email || "",
                bio: updatedUser.bio || "",
                phone: updatedUser.phone || "",
                city: updatedUser.city || "",
                country: updatedUser.country || "",
            });


            alert("Profile Updated");


        } catch (err) {

            console.log(err);

        }

    };




    // UPDATE IMAGE
    const updateImage = async () => {


        if (!image) {
            alert("Please select image");
            return;
        }


        const fd = new FormData();

        fd.append("image", image);


        try {

            setImageLoading(true);


            const res = await api.patch(
                "/v1/user/update/image",
                fd,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );


            setUser(res.data.user);


            alert("Image Updated");


        } catch (err) {

            console.log(err);

        } finally {

            setImageLoading(false);

        }

    };



    // DELETE ACCOUNT
    const deleteAccount = async () => {


        try {


            await api.delete(
                "/v1/user/delete/profile"
            );


            alert("Account Deleted");

            window.location.href = "/login";



        } catch (err) {

            console.log(err);

        }

    };




    if (loading) {

        return (
            <div className="h-screen flex items-center justify-center">
                <ClipLoader color="#0ea5e9" />
            </div>
        );

    }



    return (

        <div className="min-h-screen bg-linear-to-br from-sky-50 to-white p-6">


            {/* HEADER */}

            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6 flex items-center gap-6">


                <img
                    src={user?.image}
                    className="w-24 h-24 rounded-full object-cover border"
                    alt="profile"
                />


                <div>

                    <h2 className="text-2xl font-bold">
                        {user?.name}
                    </h2>


                    <p className="text-gray-500">
                        {user?.email}
                    </p>


                    <span className="text-sm text-sky-600 font-semibold">
                        {user?.role}
                    </span>


                </div>


            </div>





            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mt-6">



                {/* UPDATE PROFILE */}


                <div className="bg-white p-6 rounded-2xl shadow space-y-3">


                    <h3 className="text-lg font-bold">
                        Update Profile
                    </h3>



                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value
                            })
                        }
                    />



                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email: e.target.value
                            })
                        }
                    />



                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                phone: e.target.value
                            })
                        }
                    />



                    <input
                        className="w-full border p-2 rounded"
                        placeholder="City"
                        value={form.city}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                city: e.target.value
                            })
                        }
                    />



                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Country"
                        value={form.country}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                country: e.target.value
                            })
                        }
                    />



                    <textarea
                        className="w-full border p-2 rounded"
                        placeholder="Bio"
                        value={form.bio}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                bio: e.target.value
                            })
                        }
                    />



                    <button
                        onClick={updateProfile}
                        className="w-full bg-sky-600 text-white py-2 rounded-lg"
                    >
                        Save Changes
                    </button>



                </div>







                {/* SIDE PANEL */}


                <div className="space-y-4">



                    <div className="bg-white p-6 rounded-2xl shadow">


                        <h3 className="font-bold mb-3">
                            Profile Image
                        </h3>



                        <input
                            type="file"
                            onChange={(e) =>
                                setImage(e.target.files[0])
                            }
                        />



                        <button
                            onClick={updateImage}
                            disabled={imageLoading}
                            className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg flex justify-center items-center"
                        >

                            {
                                imageLoading ? (
                                    <ClipLoader
                                        color="#ffffff"
                                        size={20}
                                    />
                                ) : (
                                    "Upload Image"
                                )
                            }

                        </button>


                    </div>







                    <div className="bg-white p-6 rounded-2xl shadow border border-red-100">


                        <h3 className="font-bold text-red-600 mb-3">
                            Danger Zone
                        </h3>



                        <button
                            onClick={deleteAccount}
                            className="w-full bg-red-500 text-white py-2 rounded-lg"
                        >
                            Delete Account
                        </button>


                    </div>



                </div>



            </div>



        </div>

    );

}

