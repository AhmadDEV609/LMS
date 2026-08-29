import React from 'react'

const Hero = () => {
    return (
        <>
            <section className="relative overflow-hidden bg-linear-to-br from-sky-50 via-white to-cyan-50 py-20 lg:py-28">


                <div className="absolute top-0 left-0 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 md:px-8">

                    <div className="grid lg:grid-cols-2 items-center gap-16">


                        <div>

                            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-sky-200">
                                🚀 Modern Learning Platform
                            </div>

                            <h1 className="text-5xl md:text-6xl font-black leading-tight text-slate-900">
                                Learn Smarter With
                                <span className="block text-transparent bg-clip-text bg-linear-to-r from-sky-500 to-cyan-500">
                                    PrimeLearn
                                </span>
                            </h1>

                            <p className="mt-7 text-lg leading-relaxed text-slate-600 max-w-xl">
                                PrimeLearn empowers students and instructors with
                                a modern LMS platform designed for interactive learning,
                                professional growth, and seamless online education.
                                Build skills, manage courses, and learn from industry experts —
                                all in one powerful ecosystem.
                            </p>


                            <div className="flex flex-wrap items-center gap-4 mt-10">

                                <button className="px-8 py-4 rounded-2xl bg-linear-to-r from-sky-500 to-cyan-500 text-white font-semibold shadow-lg shadow-sky-200 hover:scale-105 hover:shadow-sky-300 transition duration-300 cursor-pointer">
                                    Explore Courses
                                </button>

                                <button className="px-8 py-4 rounded-2xl border border-sky-200 bg-white text-slate-700 font-semibold hover:bg-sky-50 transition duration-300 cursor-pointer">
                                    Watch Demo
                                </button>
                            </div>


                            <div className="mt-14">
                                <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-6">
                                    Trusted by learners from
                                </p>

                                <div className="flex flex-wrap items-center gap-8">

                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 font-bold">
                                            G
                                        </div>
                                        <span className="text-slate-700 font-semibold">
                                            Google
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 font-bold">
                                            M
                                        </div>
                                        <span className="text-slate-700 font-semibold">
                                            Microsoft
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 font-bold">
                                            A
                                        </div>
                                        <span className="text-slate-700 font-semibold">
                                            Amazon
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 font-bold">
                                            N
                                        </div>
                                        <span className="text-slate-700 font-semibold">
                                            Netflix
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="relative">


                            <div className="relative bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_80px_rgba(14,165,233,0.15)] rounded-4xl p-6 md:p-8">

                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                                    alt="hero"
                                    className="rounded-3xl w-full h-125 object-cover"
                                />


                                <div className="absolute -left-6 top-10 bg-white shadow-xl rounded-2xl p-4 border border-sky-100">
                                    <h3 className="text-3xl font-black text-sky-500">
                                        25K+
                                    </h3>
                                    <p className="text-slate-500 text-sm font-medium">
                                        Active Students
                                    </p>
                                </div>

                                <div className="absolute -right-6 bottom-10 bg-white shadow-xl rounded-2xl p-4 border border-sky-100">
                                    <h3 className="text-3xl font-black text-cyan-500">
                                        120+
                                    </h3>
                                    <p className="text-slate-500 text-sm font-medium">
                                        Expert Instructors
                                    </p>
                                </div>

                                <div className="absolute top-1/2 -right-8 bg-linear-to-r from-sky-500 to-cyan-500 text-white px-5 py-3 rounded-2xl shadow-2xl font-semibold">
                                    ⭐ Best LMS Platform
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero