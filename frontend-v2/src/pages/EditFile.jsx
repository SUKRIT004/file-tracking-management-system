import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditFile() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    file_name: "",
    department: "",
    current_holder: "",
    status: "",
  });

  useEffect(() => {

    api.get(`/files/${id}`)
      .then((res) => {
        setForm(res.data);
      });

  }, [id]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const updateFile = async (e) => {

    e.preventDefault();

    await api.put(`/files/${id}`, {

      file_name: form.file_name,

      department: form.department,

      current_holder: form.current_holder,

      status: form.status,

    });

    alert("Updated");

    navigate("/files");

  };

  return (

    <Card className="max-w-2xl mx-auto">

      <CardHeader>

        <CardTitle>

          Edit File

        </CardTitle>

      </CardHeader>

      <CardContent>

        <form
          onSubmit={updateFile}
          className="space-y-5"
        >

          <Input
            name="file_name"
            value={form.file_name}
            onChange={handleChange}
          />

          <Input
            name="department"
            value={form.department}
            onChange={handleChange}
          />

          <Input
            name="current_holder"
            value={form.current_holder}
            onChange={handleChange}
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option>Active</option>
            <option>Archived</option>
          </select>

          <Button className="w-full">

            Save Changes

          </Button>

        </form>

      </CardContent>

    </Card>

  );

}