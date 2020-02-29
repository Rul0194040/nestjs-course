import { Controller, Get, Put, Param, Body, Delete, UseFilters } from "@nestjs/common";
import {Course} from "../../../../shared/course";
import { CoursesRepository } from "../repositories/courses.repository";
import { HttpExceptionFilter } from "src/filters/http.filter";


@Controller("courses")
export class CoursesController {

  constructor(private coursesDB: CoursesRepository){}

  @Put()
  async createCourse(@Body() course: Partial<Course>): Promise<Course>{
    console.log("creating course...");
    return this.coursesDB.addCourse(course);
  }

  @Get()
  async findAllCourses(): Promise<Course[]>{
    console.log("showing courses...");
    return this.coursesDB.findAll();
  }

  @Put(':courseId')
  async updateCourse(
    @Param("courseId") courseId:string,
    @Body() changes: Partial<Course>
    ): Promise<Course> {
    console.log("updating course...");
    return this.coursesDB.updateCourse(courseId, changes);
  }

  @Delete(":courseId")
  async deleteCourse(@Param("courseId") courseId:string){
    console.log("deleting course...");
    return this.coursesDB.deleteCourse(courseId);
  }


}