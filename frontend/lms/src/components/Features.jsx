import React, { useState } from 'react'

export const Features = () => {

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold text-slate-900">
                        Why Choose PrimeLearn
                    </h2>
                    <p className="text-slate-500 mt-3">
                        Everything you need to learn and grow professionally
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {[
                        { title: "Expert Instructors", desc: "Learn from industry professionals", icon: "🎓" },
                        { title: "Flexible Learning", desc: "Study anytime anywhere", icon: "⏰" },
                        { title: "Certificates", desc: "Get verified completion certificates", icon: "🏆" },
                        { title: "Affordable", desc: "High quality education at low cost", icon: "💰" },
                    ].map((f, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-sky-100 bg-sky-50 hover:bg-white hover:shadow-xl transition">
                            <div className="text-3xl">{f.icon}</div>
                            <h3 className="text-xl font-semibold mt-4 text-slate-900">{f.title}</h3>
                            <p className="text-slate-500 mt-2">{f.desc}</p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}