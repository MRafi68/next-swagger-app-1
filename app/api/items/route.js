import { getItems, createItem } from "@/lib/data";

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Get all items
 *     description: Fetches all items from the database.
 *     responses:
 *       200:
 *         description: A list of items
 */

export async function GET() {
  return Response.json(getItems());
}

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     description: Adds a new item to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Item"
 *               description:
 *                 type: string
 *                 example: "This is a new item"
 *     responses:
 *       201:
 *         description: The created item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       400:
 *         description: Bad Request (Missing required fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Both 'name' and 'description' are required"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 details:
 *                   type: string
 *                   example: "Database connection failed"
 */

export async function POST(req) {
  try {
    if (!req.body) {
      return Response.json({ error: "Invalid JSON Body" }, { status: 400 });
    }

    const { name, description } = await req.json();

    if (!name || !description) {
      return Response.json(
        { error: "Name and Description Required" },
        { status: 400 }
      );
    }

    const newItem = createItem(name, description);
    return Response.json(newItem, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
