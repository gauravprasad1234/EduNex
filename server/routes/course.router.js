import express from 'express'
import isLoggedin from '../middleware/isLoggedin.js'
import isEducator from '../middleware/isEducator.js'
import { createCourse, readEducatorCourses } from '../controllers/course.controller.js'

const router = express.Router()

router.post("/create",isLoggedin,isEducator,createCourse)

router.get("/read",isLoggedin,isEducator,readEducatorCourses)

export default router