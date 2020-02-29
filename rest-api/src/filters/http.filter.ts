import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from "@nestjs/common";
import { json } from "body-parser";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{

  catch(exception: HttpException, host: ArgumentsHost) {
    console.log("HTTP exception triggered", JSON.stringify(exception));
    const context = host.switchToHttp();
    const response = context.getResponse(),
           request = context.getRequest(),
           statusCode = exception.getStatus();

    return response.status(statusCode).json({
      status: statusCode,
      createBy: "HttpExceptionFilter",
      errorMessage: exception.message.message
    })
  }
  
}