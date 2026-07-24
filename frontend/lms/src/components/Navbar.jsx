import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../contextApi/AuthContext'
const Navbar = () => {
    const [mobileMenu, setMobileMenu] = useState(false)
    const [dropdown, setDropdown] = useState(false)

    const { user, logout } = useContext(AuthContext);



    const handleLogout = async () => {
        logout()
        setDropdown(false);
    };



    return (
        <>
            <nav className="w-full bg-white/90 backdrop-blur-lg border-b border-sky-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between h-20">

                        {/* Logo */}
                        <Link
                            to="/"
                            className="text-3xl font-extrabold tracking-tight"
                        >
                            <span className="text-sky-500">Prime</span>
                            <span className="text-slate-800">Learn</span>
                        </Link>

                        <div className="hidden lg:flex items-center gap-10">
                            <Link
                                to="/"
                                className="text-slate-700 font-medium hover:text-sky-500 transition duration-300 relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-sky-500 hover:after:w-full after:transition-all"
                            >
                                Home
                            </Link>

                            <Link
                                to="/course"
                                className="text-slate-700 font-medium hover:text-sky-500 transition duration-300 relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-sky-500 hover:after:w-full after:transition-all"
                            >
                                Courses
                            </Link>

                            <Link
                                to="/instructor"
                                className="text-slate-700 font-medium hover:text-sky-500 transition duration-300 relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-sky-500 hover:after:w-full after:transition-all"
                            >
                                Instructor Panel
                            </Link>

                            <Link
                                to="/About"
                                className="text-slate-700 font-medium hover:text-sky-500 transition duration-300 relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-sky-500 hover:after:w-full after:transition-all"
                            >
                                About
                            </Link>
                        </div>

                        {/* Right Side */}

                        <div className="flex items-center gap-4">
                            {user ? (
                                <div
                                    className="relative"
                                    onMouseEnter={() => setDropdown(true)}
                                    onMouseLeave={() => setDropdown(false)}
                                >
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full border cursor-pointer"
                                    />

                                    {dropdown && (
                                        <div className="absolute right-0 top-10 w-56 bg-white shadow-xl border rounded-xl z-50">
                                            <div className="p-3 border-b">
                                                <p className="font-bold">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.role}</p>
                                            </div>

                                            <Link
                                                to="profile"
                                                className="block px-3 py-2 hover:bg-sky-50"
                                            >
                                                Profile
                                            </Link>

                                            <Link
                                                to="/my/enrollment"
                                                className="block px-3 py-2 hover:bg-sky-50"
                                            >
                                                My Enrollments
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-500"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/signup">
                                    <button className="bg-sky-500 text-white px-4 py-2 rounded-md">
                                        Get Started
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div
                        className={`lg:hidden overflow-hidden transition-all duration-500 ${mobileMenu ? 'max-h-96 py-4' : 'max-h-0'}`}
                    >
                        <div className="flex flex-col gap-2 pb-4">

                            <Link
                                to="/"
                                className="px-5 py-3 rounded-xl hover:bg-sky-50 text-slate-700 font-medium transition"
                            >
                                Home
                            </Link>

                            <Link
                                to="/courses"
                                className="px-5 py-3 rounded-xl hover:bg-sky-50 text-slate-700 font-medium transition"
                            >
                                Courses
                            </Link>

                            <Link
                                to="/instructor"
                                className="px-5 py-3 rounded-xl hover:bg-sky-50 text-slate-700 font-medium transition"
                            >
                                Instructor Panel
                            </Link>

                            <Link
                                to="/about"
                                className="px-5 py-3 rounded-xl hover:bg-sky-50 text-slate-700 font-medium transition"
                            >
                                About
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar