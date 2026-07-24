import React from 'react'

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white py-14">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-4 gap-10">

                <div>
                    <h2 className="text-2xl font-bold">
                        <span className="text-sky-400">Prime</span>Learn
                    </h2>
                    <p className="text-slate-400 mt-3 text-sm">
                        Modern learning platform for students and instructors.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-slate-400 text-sm">
                        <li>Home</li>
                        <li>Courses</li>
                        <li>Instructors</li>
                        <li>About</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Support</h3>
                    <ul className="space-y-2 text-slate-400 text-sm">
                        <li>Help Center</li>
                        <li>Contact</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Newsletter</h3>
                    <input
                        type="email"
                        placeholder="Enter email"
                        className="w-full p-3 rounded-xl text-black"
                    />
                    <button className="mt-3 w-full bg-sky-500 py-2 rounded-xl hover:bg-sky-600">
                        Subscribe
                    </button>
                </div>

            </div>

            <div className="text-center text-slate-500 text-sm mt-10">
                © 2026 PrimeLearn. All rights reserved.
            </div>
        </footer>
    )
}