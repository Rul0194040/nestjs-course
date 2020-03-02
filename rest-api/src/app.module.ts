import { Module } from "@nestjs/common";
import { CoursesModule } from "./courses/courses.module";
import {MongooseModule} from "@nestjs/mongoose";
import { MONGO_CONNECTION } from "./constants";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    CoursesModule,
    AuthModule,
    MongooseModule.forRoot(MONGO_CONNECTION, { useNewUrlParser: true,  useUnifiedTopology: true })
  ]
})
export class AppModule {}