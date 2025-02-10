// app/api/docs/route.js
import { createSwaggerSpec } from "next-swagger-doc";
import options from "@/lib/swaggerConfig";

export async function GET() {
  const spec = createSwaggerSpec(options);
  return Response.json(spec)
}
