import { Controller, Query, ParseIntPipe, BadRequestException, Get } from "@nestjs/common";
import { LessonsRepository } from "../repositories/lessons.repository";


@Controller("lessons")
export class LessonsController {

  constructor(private LessonsDB: LessonsRepository){}

  @Get()
  async searchLesson(
    @Query("courseId") courseId: string,
    @Query("sortOrder") sortOrder = "asc",
    @Query("pageNumber", ParseIntPipe) pageNumber = 0,
    @Query("pageSize", ParseIntPipe) pageSize = 3
  ){

    if (!courseId) {
      throw new BadRequestException("Id must by defined");
    }
    if(sortOrder != "asc" && sortOrder != "desc" ) {
      throw new BadRequestException ("sort order must be asc or desc")
    }

    return this.LessonsDB.searchLesson(courseId, sortOrder, pageNumber, pageSize);
  }
}