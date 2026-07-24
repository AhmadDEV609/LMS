import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Footer } from './components/Footer'
const App = () => {
  const Signup = lazy(() => import('./pages/Signup'))
  const Login = lazy(() => import('./pages/Login'))
  const Instructor = lazy(() => import('./For Instuctor/Instructor'))
  const Home = lazy(() => import('./pages/Home'))
  const InstructorProtected = lazy(() => import('./pages/InstructorProtected'))
  const StudentProtected = lazy(() => import('./pages/StudentProtected'))
  const Course = lazy(() => import('./pages/Course'))
  const Profile = lazy(() => import('./pages/Profile'))
  const CourseDetails = lazy(() => import('./For Instuctor/CourseDetails'))
  const MyCourses = lazy(() => import('./For Instuctor/MyCourses'))
  const About = lazy(() => import('./pages/About'))
  const CourseDetailStudent = lazy(() => import('./pages/CourseDetailStudent'))
  const MyEnrollment = lazy(() => import('./pages/MyEnrollments'))
  const CourseLearning = lazy(() => import('./pages/CourseLearning'))
  const EnrollmentPage = lazy(() => import('./For Instuctor/EnrollmentPage'))
  return (
    <>

      <Suspense fallback={<h1>loading.....</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/profile' element={<Profile />}></Route>
          <Route element={<InstructorProtected />}>
            <Route path="/instructor" element={<Instructor />} />
            <Route path='/course/detail/:id' element={<CourseDetails />} ></Route>
            <Route path='/courses' element={<MyCourses></MyCourses>}></Route>
            <Route path='/enrollment' element={<EnrollmentPage></EnrollmentPage>}></Route>
          </Route>
          <Route element={<StudentProtected />}>
            <Route path='/course' element={<Course />}></Route>
            <Route path='/About' element={<About />}></Route>
            <Route path='/course/detail/student/:id' element={<CourseDetailStudent />}></Route>
            <Route path='/my/enrollment' element={<MyEnrollment />}></Route>
            <Route path="/learn/:courseId" element={<CourseLearning />} />
          </Route>
        </Routes>
      </Suspense>

    </>
  )
}

export default App