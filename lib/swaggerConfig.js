// lib/swaggerConfig.js
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Next.js CRUD API with Swagger",
      version: "1.0.0",
      description: "A simple CRUD API built with Next.js App Router and Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    apis: ["./app/api/**/*.js"], // Adjust path based on your API routes
  };
  
  export default options;  