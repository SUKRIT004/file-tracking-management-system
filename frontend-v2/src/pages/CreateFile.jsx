import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateFile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    file_name: "",
    department: "",
    current_holder: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/files", formData);

      alert("File Created Successfully");

      navigate("/files");
    } catch (err) {
      console.error(err);
      alert("Unable to create file");
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">

      <CardHeader>
        <CardTitle>Create File</CardTitle>
      </CardHeader>

      <CardContent>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <Input
            placeholder="File Name"
            name="file_name"
            value={formData.file_name}
            onChange={handleChange}
          />

          <Input
            placeholder="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />

          <Input
            placeholder="Current Holder"
            name="current_holder"
            value={formData.current_holder}
            onChange={handleChange}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-md w-full p-2"
          >
            <option>Active</option>
            <option>Archived</option>
          </select>

          <Button
            className="w-full"
            type="submit"
          >
            Create File
          </Button>

        </form>

      </CardContent>

    </Card>
  );
}