import { Catch, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { ValidationException } from "./validation.exception";

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter{
 
  catch(exception: ValidationException, host: ArgumentsHost): any {
    console.log("HTTP exception triggered", JSON.stringify(exception));
    const context = host.switchToHttp();
    const response = context.getResponse();
          

    return response.status(400).json({
      status: 400,
      createBy: "ValidationFilter",
      ValidationError: exception.validationErrors
    })
  }


}