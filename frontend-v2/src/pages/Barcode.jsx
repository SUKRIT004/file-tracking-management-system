import { useState } from "react";

import api from "../services/api";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Barcode() {

  const [barcode, setBarcode] = useState("");

  const [file, setFile] = useState(null);

  const searchFile = async () => {

    try {

      const res = await api.get(
        `/files/barcode/${barcode}`
      );

      setFile(res.data);

    } catch {

      alert("Barcode not found");

      setFile(null);

    }

  };

  return (

    <div className="space-y-6">

      <Card>

        <CardHeader>

          <CardTitle>

            Barcode Search

          </CardTitle>

        </CardHeader>

        <CardContent className="flex gap-3">

          <Input
            placeholder="Enter Barcode..."
            value={barcode}
            onChange={(e) =>
              setBarcode(e.target.value)
            }
          />

          <Button
            onClick={searchFile}
          >
            Search
          </Button>

        </CardContent>

      </Card>

      {file && (

        <Card>

          <CardHeader>

            <CardTitle>

              File Details

            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-4">

            <div>

              <strong>File Number:</strong>

              {" "}

              {file.file_number}

            </div>

            <div>

              <strong>File Name:</strong>

              {" "}

              {file.file_name}

            </div>

            <div>

              <strong>Department:</strong>

              {" "}

              {file.department}

            </div>

            <div>

              <strong>Current Holder:</strong>

              {" "}

              {file.current_holder}

            </div>

            <Badge>

              {file.status}

            </Badge>

          </CardContent>

        </Card>

      )}

    </div>

  );

}