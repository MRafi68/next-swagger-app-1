import { v4 as uuidv4 } from "uuid";

let items = [];

export function getItems() {
    return items;
}

export function getItemById(id) {
    return items.find((item) => item.id === id);
}

export function createItem(name, description) {
    const newItem = { id: uuidv4(), name, description };
    items.push(newItem);
    return newItem;
}

export function updateItem(id, name, description) {
    const item = items.find((item) => item.id === id);
    if (item) {
        item.name = name;
        item.description = description;
    }
    return item;
}

export function deleteItem(id) {
    items = items.filter((item) => item.id !== id);
    return true;
}