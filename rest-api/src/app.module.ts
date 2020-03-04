import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { CoursesModule } from "./courses/courses.module";
import {MongooseModule} from "@nestjs/mongoose";
import { MONGO_CONNECTION } from "./constants";
import { AuthModule } from "./auth/auth.module";
import { GetUserMiddleware } from "./middleware/getUserMiddleware";
import { CoursesController } from "./courses/controllers/courses.controller";
import { LessonsController } from "./courses/controllers/lessons.controller";

@Module({
  imports: [
    CoursesModule,
    AuthModule,
    MongooseModule.forRoot(MONGO_CONNECTION, { useNewUrlParser: true,  useUnifiedTopology: true })
  ]
})
export class AppModule implements NestModule{

  configure(consumer: MiddlewareConsumer): void {
    consumer
    .apply(GetUserMiddleware)
    .forRoutes(
      CoursesController,
      LessonsController
    )
  }

}
