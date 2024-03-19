import { ZodError } from 'zod';

export default (event: any, error: unknown) => {
  if (error instanceof ZodError) {
    // Handle validation errors
    setResponseStatus(event, 400);
    console.error('Validation errors:', error.errors);
    return {
      status: 400,
      body: {
        errors: error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      },
    };
  } else if ((error as any).code === 11000) {
    // Handle Mongoose errors
    setResponseStatus(event, 500);
    console.error('Mongoose error:', error);
    return {
      status: 500,
      body: { message: 'A database error occurred', error },
    };
  } else {
    // Handle other errors
    setResponseStatus(event, 500);
    console.error('Unexpected error:', error);
    return { status: 500, body: { message: 'An error occurred', error } };
  }
};
