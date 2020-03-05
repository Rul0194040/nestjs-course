import { Controller, Get, Put, Param, Body, Delete, UseFilters, NotFoundException, UseGuards } from "@nestjs/common";
import {Course} from "../../../../shared/course";
import { CoursesRepository } from "../repositories/courses.repository";
import { AuthGuard } from "src/guards/auth.guards";


@Controller("courses")
@UseGuards(AuthGuard) //guardia de acceso
export class CoursesController {

  constructor(private coursesDB: CoursesRepository){}

  //CRUD FUNCTIONS OF COURSE
  @Put()//Create Course
  async createCourse(@Body() course: Partial<Course>): Promise<Course>{
    console.log("creating course...");
    return this.coursesDB.addCourse(course);
  }
  @Get()//Read Course
  async findAllCourses(): Promise<Course[]>{
    console.log("showing courses...");
    return this.coursesDB.findAll();
  }
  @Put(':courseId')//Update Course
  async updateCourse(
    @Param("courseId") courseId:string,
    @Body() changes: Partial<Course>
    ): Promise<Course> {
    console.log("updating course...");
    return this.coursesDB.updateCourse(courseId, changes);
  }
  @Delete(":courseId")//Delete Course
  async deleteCourse(@Param("courseId") courseId:string){
    console.log("deleting course...");
    return this.coursesDB.deleteCourse(courseId);
  }
  @Get(':courseUrl')//Get course by url
  async findByUrl(@Param('courseUrl') courseUrl: string){
    console.log('finding course by url', courseUrl);
    const course = await this.coursesDB.findByUrl(courseUrl);

    if (!course) {
      throw new NotFoundException("Could not find course"+ courseUrl);
    }
    return course;
  }
}
