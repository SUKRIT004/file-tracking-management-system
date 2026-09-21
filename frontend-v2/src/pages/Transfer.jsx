import { useState } from "react";
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

export default function Transfer() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [transfer, setTransfer] = useState({
    to_holder: "",
    to_department: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setTransfer({
      ...transfer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await api.post(
        `/files/${id}/transfer`,
        transfer
      );

      alert("Transfer Successful");

      navigate("/files");

    } catch (err) {
      console.error(err);
      alert("Transfer Failed");
    }
  };

  return (

    <Card className="max-w-2xl mx-auto">

      <CardHeader>

        <CardTitle>

          Transfer File

        </CardTitle>

      </CardHeader>

      <CardContent>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <Input
            name="to_holder"
            placeholder="New Holder"
            value={transfer.to_holder}
            onChange={handleChange}
          />

          <Input
            name="to_department"
            placeholder="New Department"
            value={transfer.to_department}
            onChange={handleChange}
          />

          <Input
            name="remarks"
            placeholder="Remarks"
            value={transfer.remarks}
            onChange={handleChange}
          />

          <Button className="w-full">

            Transfer File

          </Button>

        </form>

      </CardContent>

    </Card>

  );

}