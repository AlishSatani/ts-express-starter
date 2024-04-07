import { ServerError } from "@utils/error";

import { AnyZodObject, ZodError, ZodOptional } from "zod";

export const validateService = async (
  schema: AnyZodObject | ZodOptional<AnyZodObject>,
  body: any
) => {
  try {
    const parsedBody = await schema.parseAsync(body);

    return parsedBody;
  } catch (error) {
    let cause = error;

    if (cause instanceof ZodError) {
      cause = cause.issues.map((e) => ({
        path: e.path[0],
        message: e.message,
      }));
    }

    throw new ServerError({
      code: 409,
      message: "Bad Request",
      cause,
    });
  }
};
