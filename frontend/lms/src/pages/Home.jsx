import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { Features } from '../components/Features'
import { Testimonials } from '../components/Testimonials'
import { Footer } from '../components/Footer'
import { Courses } from '../components/Courses'

const Home = () => {

    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <Courses />
            <Testimonials />
            <Footer />
        </>
    )
}

export default Home