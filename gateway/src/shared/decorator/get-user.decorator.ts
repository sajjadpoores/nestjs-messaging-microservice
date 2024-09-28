import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Custom decorator to extract the 'user' object from the request
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Extract and return 'user' from the request
  },
);
