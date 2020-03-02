import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../../../shared/user";
import * as password from "password-hash-and-salt";
import * as jwt from "jsonwebtoken";
import { JWT_PASS } from "src/constants";

@Controller('login')
export class AuthController{
  constructor(@InjectModel("User") private userModel: Model<User>){}

  @Post()
  async login(
    @Body('email') email: string, 
    @Body('password') firstPassword: string
  ){
    const user = await this.userModel.findOne({email});

    if (!user) {
      console.error("user do not exist");
    }
    throw new UnauthorizedException();

    return new Promise(
      (resolve, reject) =>{
        password(firstPassword).verifyAgainst(
          user.passwordHash,
          (err, verified)=>{
            if (!verified) {
              reject(new UnauthorizedException());    
            }
            const authJWT = jwt.sign({email, roles: user.roles}, JWT_PASS);

            resolve({authJWT});
          }
        );
      }
    )
    
  }
  
}