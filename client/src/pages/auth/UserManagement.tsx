import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "../../components/reusable/Table";
import { Button } from "../../components/reusable/Button";
import { Modal } from "../../components/reusable/Modal";


const API_BASE = import.meta.env.VITE_BASE_URL;
interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

const defaultForm = {
  name: "",
  email: "",
  phone: "",
  role: "user",
  password: "",
};

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get(`${API_BASE}/auth/users`, {
      params: { page, search },
    });
    setUsers(res.data.users);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleAddOrUpdateUser = async () => {
    try {
      if (editingUserId) {
        await axios.put(`${API_BASE}/auth/users/${editingUserId}`, form);
      } else {
        await axios.post(`${API_BASE}/auth/users`, form);
      }
      setForm(defaultForm);
      setEditingUserId(null);
      setModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (user: User) => {
    setForm({ ...user, password: "" });
    setEditingUserId(user._id);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${API_BASE}/auth/users/${id}`);
    fetchUsers();
  };

  const columns = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Role", key: "role" },
    {
      label: "Actions",
      key: "actions",
      render: (_: any, row: User) => (
        <div className="space-x-2">
          <Button label="Edit" size="sm" onClick={() => handleEdit(row)} />
          <Button label="Delete" size="sm" variant="danger" onClick={() => handleDelete(row._id)} />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">User Management</h1>
        <Button label="Add User" onClick={() => setModalOpen(true)} />
      </div>

      <Table
        data={users}
        columns={columns}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onSearchChange={setSearch}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingUserId ? "Edit User" : "Add User"}>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            {/* <option value="patient">Patient</option>
            <option value="researcher">Researcher</option> */}
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {!editingUserId && (
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          )}
          <div className="flex justify-end">
            <Button label={editingUserId ? "Update" : "Add"} onClick={handleAddOrUpdateUser} />
          </div>
        </form>
      </Modal>
    </div>
  );
};
