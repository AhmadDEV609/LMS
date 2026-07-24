import React from 'react'

export const Testimonials = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold text-slate-900">
                        What Students Say
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">

                    {[
                        {
                            name: "Ali Khan",
                            text: "PrimeLearn changed my career. Very easy to learn!",
                        },
                        {
                            name: "Sara Ahmed",
                            text: "Best LMS platform. Courses are very practical.",
                        },
                        {
                            name: "Usman Tariq",
                            text: "I got job after completing web development course!",
                        },
                    ].map((t, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-sky-100 bg-sky-50 hover:shadow-lg transition">
                            <p className="text-slate-600">"{t.text}"</p>
                            <h4 className="mt-4 font-semibold text-slate-900">
                                - {t.name}
                            </h4>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}