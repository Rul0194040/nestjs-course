import { Document } from 'mongoose';
import { IsString, IsMongoId, IsInt, IsBoolean } from 'class-validator';
export class Course extends Document {
  @IsString()
  @IsMongoId()
  _id: string;
  @IsInt({message: "must be a number"})
  seqNo:number;
  @IsString({always: false})
  url:string;
  @IsString() iconUrl: string;
  @IsString() courseListIcon: string;
  @IsString() description: string;
  @IsString() longDescription?: string;
  @IsString() category: string;
  @IsInt()lessonsCount: number;
  @IsBoolean()promo: boolean;
}


export function compareCourses(c1:Course, c2: Course) {

  const compare = c1.seqNo - c2.seqNo;

  if (compare > 0) {
    return 1;
  }
  else if ( compare < 0) {
    return -1;
  }
  else return 0;

}
