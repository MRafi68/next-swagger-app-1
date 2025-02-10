// app/api/hello/route.js
/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Returns a greeting message
 *     description: A simple API endpoint that returns a hello message.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello, World!"
 */

export async function GET() {
    return Response.json({ message: "Hello, World!" });
  }  