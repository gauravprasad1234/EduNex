import React, { useContext, useEffect } from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CoursesSection from '../../components/student/CoursesSection'
import TestimonialsSection from '../../components/student/TestimonialsSection'
import CallToAction from '../../components/student/CallToAction'
import Footer from '../../components/student/Footer'
import { AppContext } from '../../context/AppContext'
import Navbar from '../../components/educator/Navbar

const Home = () => {
  let {setAllCourses} = useContext(AppContext)
  async function fetchAllCourses() {
      try {
        let allCourses = await axios.get("https://edunex-5ms8.onrender.com/api/courses/all",{withCredentials: true})
        setAllCourses(allCourses.data)
      } catch (error) {
        console.log(error?.response?.data?.message)
      }
    }
    useEffect(() => {fetchAllCourses()},[])
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
            {!isEducatorRoute && <Navbar />}

      <Hero/>
      <Companies/>
      <CoursesSection/>
      <TestimonialsSection/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default Home
