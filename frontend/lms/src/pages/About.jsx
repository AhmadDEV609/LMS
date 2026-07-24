import React from "react";
import Navbar from '../components/Navbar';
const About = () => {


    return (
        <>
            <Navbar></Navbar>

            <div className="bg-white text-gray-800 min-h-screen">
                <section className="bg-sky-500 text-white py-20 px-6">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                                Welcome to <span className="text-white">PrimeLearn</span>
                            </h1>

                            <p className="text-lg md:text-xl text-sky-100 mb-8 leading-relaxed">
                                PrimeLearn is a modern Learning Management System designed to help
                                students learn smarter and instructors teach better. We provide
                                high-quality courses with an engaging and professional learning
                                experience.
                            </p>

                            <button className="bg-white text-sky-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-sky-100 transition duration-300">
                                Explore Courses
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                                alt="Learning"
                                className="w-75 md:w-112.5 drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </section>

                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                        <div>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2436/2436874.png"
                                alt="About PrimeLearn"
                                className="w-full max-w-md mx-auto"
                            />
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-sky-600 mb-6">
                                About PrimeLearn
                            </h2>

                            <p className="text-gray-600 text-lg leading-relaxed mb-5">
                                PrimeLearn is built for learners who want flexibility, quality,
                                and real-world skills. Our platform offers interactive learning
                                experiences with modern technologies and expert instructors.
                            </p>

                            <p className="text-gray-600 text-lg leading-relaxed">
                                Whether you're a beginner or an advanced learner, PrimeLearn helps
                                you grow your skills and achieve your goals through professional
                                online education.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-sky-50 py-20 px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-sky-600 mb-14">
                            Why Choose PrimeLearn?
                        </h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                                <div className="text-5xl mb-5">📚</div>

                                <h3 className="text-2xl font-semibold mb-4 text-sky-600">
                                    Expert Courses
                                </h3>

                                <p className="text-gray-600">
                                    Learn from professional instructors with industry-level
                                    experience.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                                <div className="text-5xl mb-5">💻</div>

                                <h3 className="text-2xl font-semibold mb-4 text-sky-600">
                                    Modern Learning
                                </h3>

                                <p className="text-gray-600">
                                    Enjoy responsive and interactive learning experiences on every
                                    device.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                                <div className="text-5xl mb-5">🚀</div>

                                <h3 className="text-2xl font-semibold mb-4 text-sky-600">
                                    Career Growth
                                </h3>

                                <p className="text-gray-600">
                                    Build practical skills and advance your career with confidence.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 px-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="bg-white shadow-lg rounded-2xl p-8 border border-sky-100">
                            <h3 className="text-4xl font-bold text-sky-600">500+</h3>

                            <p className="text-gray-600 mt-2">Students</p>
                        </div>

                        <div className="bg-white shadow-lg rounded-2xl p-8 border border-sky-100">
                            <h3 className="text-4xl font-bold text-sky-600">50+</h3>

                            <p className="text-gray-600 mt-2">Courses</p>
                        </div>

                        <div className="bg-white shadow-lg rounded-2xl p-8 border border-sky-100">
                            <h3 className="text-4xl font-bold text-sky-600">20+</h3>

                            <p className="text-gray-600 mt-2">Instructors</p>
                        </div>

                        <div className="bg-white shadow-lg rounded-2xl p-8 border border-sky-100">
                            <h3 className="text-4xl font-bold text-sky-600">100%</h3>

                            <p className="text-gray-600 mt-2">Online Learning</p>
                        </div>
                    </div>
                </section>

                <section className="bg-sky-500 text-white py-20 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Start Learning Today
                        </h2>

                        <p className="text-lg md:text-xl text-sky-100 mb-8">
                            Join PrimeLearn and upgrade your skills with professional online
                            courses.
                        </p>

                        <button className="bg-white text-sky-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-sky-100 transition duration-300">
                            Get Started
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default About;