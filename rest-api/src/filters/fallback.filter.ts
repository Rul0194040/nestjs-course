import { Catch, ExceptionFilter, ArgumentsHost } from "@nestjs/common";

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter{
  catch(exception: any, host: ArgumentsHost) {
    console.log("fallback exception triggered", JSON.stringify(exception));
    const context = host.switchToHttp();
    const response = context.getResponse();

    return response.status(500).json({
      status: 500,
      createBy: "FallbackExceptionFilter",
      errorMessage: exception.message.message
    })


  }

}