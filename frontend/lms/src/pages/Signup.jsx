import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
const Signup = () => {
    const [form, setform] = useState({
        name: '',
        email: '',
        password: '',

        role: 'user'
    })
    const [image, setImage] = useState(null);
    console.log(form)

    async function handleSubmit(e) {
        e.preventDefault()

        const formdata = new FormData()
        formdata.append('name', form.name)
        formdata.append('email', form.email)
        formdata.append('password', form.password)
        formdata.append('role', form.role)
        if (image) {
            formdata.append("image", image);
        }
        try {
            const res = await api.post(
                "/v1/user/signup",
                formdata,
                { withCredentials: true }
            )
            if (res.status === 201) {
                alert('signup successfully')
                setform({
                    name: '',
                    email: '',
                    password: '',
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <main className=" mt-14 flex items-center justify-center py-4 px-4 md:px-8 lg:h-screen">
                <div
                    className="max-w-6xl border border-slate-200 bg-white shadow-sm p-4 rounded-lg lg:p-6">
                    <div className="grid md:grid-cols-2 items-center gap-x-8 gap-y-12">
                        <div className="max-w-md mx-auto w-full p-2 md:p-4">
                            <div className="inline-block mb-10">
                                <Link
                                    to="/"
                                    className="text-3xl font-extrabold tracking-tight"
                                >
                                    <span className="text-sky-500">Prime</span>
                                    <span className="text-slate-800">Learn</span>
                                </Link>
                            </div>

                            <form method='POST' onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="Name"
                                        className="mb-2 text-slate-900 font-medium text-sm inline-block">Name</label>
                                    <input value={form.name} onChange={(e) => setform({ ...form, name: e.target.value })} type="text" placeholder="Enter name" required
                                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600" />
                                </div>
                                <div>
                                    <label htmlFor="Email"
                                        className="mb-2 text-slate-900 font-medium text-sm inline-block">Email</label>
                                    <input type="email" value={form.email} onChange={(e) => setform({ ...form, email: e.target.value })} placeholder="john@readymadeui.com" required
                                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600" />
                                </div>

                                <div className="relative">
                                    <label htmlFor="password"
                                        className="mb-2 text-slate-900 font-medium text-sm inline-block">Password</label>

                                    <button type="button" id="togglePassword" aria-label="Show password" aria-pressed="false"
                                        className="absolute top-1 right-2 p-0.5 flex cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className="size-4 fill-slate-400 text-slate-400 overflow-visible" viewBox="0 0 128 128">
                                            <path
                                                d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z">
                                            </path>
                                            <path id="eyeStrike" className="block" d="M10.586 10.586l106.828 106.828" stroke="currentColor"
                                                strokeWidth="10" strokeLinecap="round"></path>
                                        </svg>
                                    </button>

                                    <input type="password" value={form.password} onChange={(e) => setform({ ...form, password: e.target.value })} placeholder="••••••••" required
                                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600" />


                                    <div>
                                        <label htmlFor='Role'> Role</label>
                                        <select
                                            value={form.role}
                                            onChange={(e) =>
                                                setform({ ...form, role: e.target.value })
                                            }
                                            className="w-full p-2 border border-sky-200 rounded-lg"
                                        >
                                            <option value="user">User</option>
                                            <option value="instructor">Instructor</option>
                                        </select>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Select Profile Image
                                        </label>

                                        <input
                                            type="file"
                                            onChange={(e) => setImage(e.target.files[0])}
                                            accept="image/*"

                                            className="w-full p-2 border border-sky-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-start flex-wrap gap-2">
                                    <label className="flex items-center group has-[input:checked]:text-slate-900">
                                        <input id="remember" name="remember" type="checkbox" required className="sr-only" />

                                        <span
                                            className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 bg-white group-has-[input:checked]:bg-blue-600 group-has-[input:checked]:outline-blue-600 group-focus-within:outline-2 group-focus-within:outline-blue-600"
                                            aria-hidden="true">

                                            <svg className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100"
                                                viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M1 5l3 3 7-7" />
                                            </svg>
                                        </span>
                                        <span className="ml-3 text-sm text-slate-700">
                                            Remember me
                                        </span>
                                    </label>

                                    <a href="#"
                                        className="ml-auto text-sm font-medium text-blue-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                                        Forgot password?
                                    </a>
                                </div>

                                <button type="submit"
                                    className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                                    Sign up
                                </button>
                            </form>

                            <div className="flex items-center gap-4 my-8">
                                <hr className="w-full border-slate-300" />
                                <p className="text-sm text-slate-700 text-center">or</p>
                                <hr className="w-full border-slate-300" />
                            </div>



                            <div className="mt-6 text-slate-900 text-sm text-center">
                                if you have already account?
                                <Link to={'/login'} className="text-blue-700 hover:underline ml-1 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">


                                    Login
                                </Link>
                            </div>
                        </div>

                        <div
                            className="aspect-square bg-gray-50 relative before:absolute before:inset-0 before:bg-indigo-600/70 rounded-md overflow-hidden w-full h-full">
                            <img src="https://readymadeui.com/team-image.webp" className="w-full h-full object-cover" alt="login img" />
                            <div className="absolute inset-0 m-auto max-w-sm p-6 flex items-center justify-center">
                                <div>
                                    <h1 className="text-white text-3xl font-bold">Sign up</h1>
                                    <p className="text-slate-100 text-base font-medium mt-6 leading-relaxed">
                                        Sign up to your account and explore a world of possibilities.
                                        Your journey begins here.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </>
    )
}

export default Signup