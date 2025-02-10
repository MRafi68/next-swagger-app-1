import { getItemById, updateItem, deleteItem } from "@/lib/data";

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Get an item by ID
 *     description: Retrieves a specific item by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested item
 *       404:
 *         description: Item not found
 */

export async function GET(_, {params}) {
    const item = getItemById(params.id);
    if (!item) {
        return Response.json({error: "Item not found"}, {status: 404})
    }
    return Response.json(item)
}

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Update an item by ID
 *     description: Updates an existing item by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated item
 *       404:
 *         description: Item not found
 */

export async function PUT(req, {params}) {
    const {name, description} =  await req.json();
    const updatedItem = updateItem(params.id, name, description);
    if (!updatedItem){
        return Response.json({error: "Item not found"}, {status: 404})
    }
    return Response.json(updatedItem)
}

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     description: Removes an item from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       400:
 *         description: Invalid request, missing or incorrect ID format
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */

export async function DELETE(req, { params }) {
    try {
        const { id } = params; // Ensure `id` is extracted properly

        if (!id) {
            return Response.json({ error: "Missing item ID" }, { status: 400 });
        }

        const success = deleteItem(id);

        if (!success) {
            return Response.json({ error: "Item not found" }, { status: 404 });
        }

        return Response.json({ message: "Item deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting item:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}