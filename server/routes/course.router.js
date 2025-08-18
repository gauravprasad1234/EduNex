import express from 'express'
import isLoggedin from '../middleware/isLoggedin.js'
import isEducator from '../middleware/isEducator.js'
import { createCourse, enrollInCourse, getAllCourses, getOneCourse, readEducatorCourses } from '../controllers/course.controller.js'

const router = express.Router()

router.post("/create",isLoggedin,isEducator,createCourse)

router.get("/read",isLoggedin,isEducator,readEducatorCourses)

router.get("/all",isLoggedin,getAllCourses)

router.get("/one/:id",isLoggedin,getOneCourse)

router.post("/enroll/:id",isLoggedin,enrollInCourse)

export default router