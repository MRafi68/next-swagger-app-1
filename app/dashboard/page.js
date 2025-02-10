"use client";

import { Layout, Button, Spin } from "antd";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ItemTable from "../components/ItemTable";
import ItemForm from "../components/ItemForm";
import DeleteModal from "../components/DeleteModal";

const { Content } = Layout;

const DashboardPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch items on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items");
        if (response.ok) {
          const data = await response.json();
          console.log("API Fetch Success:", data);
          setItems(data);
        } else {
          console.error("API Fetch Failed:", response.status);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false); // Set loading to false when fetching is complete
      }
    };

    fetchItems();
  }, []);

  // Function to handle adding a new item
  const handleAdd = () => {
    setSelectedItem(null);
    setIsFormVisible(true);
  };

  // Function to handle editing an existing item
  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsFormVisible(true);
  };

  // Function to handle deleting an item
  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteVisible(true);
  };

  // Function to confirm and delete an item
  const confirmDelete = async () => {
    try {
      console.log("Deleting item with ID:", deleteId);
      const response = await fetch(`/api/items/${deleteId}`, { method: "DELETE" });

      if (response.ok) {
        console.log("API Delete Success:", deleteId);
        setItems(items.filter((item) => item.id !== deleteId));
      } else {
        console.error("API Delete Failed:", response.status);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }

    // Reset delete modal state
    setIsDeleteVisible(false);
    setDeleteId(null);
  };

  // Function to handle form submission (Create/Update)
  const handleSubmit = async (values) => {
    try {
      if (selectedItem) {
        console.log("Updating item:", selectedItem.id, values);
        const response = await fetch(`/api/items/${selectedItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          console.log("API Update Success:", selectedItem.id);
          setItems(items.map((item) => (item.id === selectedItem.id ? { ...item, ...values } : item)));
        } else {
          console.error("API Update Failed:", response.status);
        }
      } else {
        console.log("Creating new item:", values);
        const response = await fetch("/api/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const newItem = await response.json();
          console.log("API Create Success:", newItem);
          setItems([...items, newItem]);
        } else {
          console.error("API Create Failed:", response.status);
        }
      }
    } catch (error) {
      console.error("Error in API call:", error);
    }

    // Reset form state
    setIsFormVisible(false);
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Content style={{ padding: "24px" }}>
          <Button type="primary" onClick={handleAdd} style={{ marginBottom: "16px" }}>
            Add Item
          </Button>
          <ItemTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
          <ItemForm visible={isFormVisible} onSubmit={handleSubmit} onCancel={() => setIsFormVisible(false)} initialValues={selectedItem} />
          <DeleteModal visible={isDeleteVisible} onConfirm={confirmDelete} onCancel={() => setIsDeleteVisible(false)} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
