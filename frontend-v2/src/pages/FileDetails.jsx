import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

import FileUpload from "../components/files/FileUpload";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function FileDetails() {

  const { id } = useParams();

  const [file, setFile] = useState(null);

  useEffect(() => {

    api
      .get(`/files/${id}`)
      .then((res) => {
        setFile(res.data);
      })
      .catch(console.error);

  }, [id]);

  if (!file) return <p>Loading...</p>;

  return (

    <Card className="max-w-4xl mx-auto">

      <CardHeader>

        <CardTitle>

          {file.file_name}

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-5">

        <p>
          <strong>File Number:</strong> {file.file_number}
        </p>

        <p>
          <strong>Department:</strong> {file.department}
        </p>

        <p>
          <strong>Current Holder:</strong> {file.current_holder}
        </p>

        <p>
          <strong>Barcode:</strong> {file.barcode}
        </p>

        <Badge>

          {file.status}

        </Badge>

        <hr />

        <h2 className="text-xl font-semibold">

          Document

        </h2>

        <FileUpload
          fileId={file.id}
        />

        {file.document_path && (

          <Button
            onClick={() =>
              window.open(
                `http://127.0.0.1:8000/files/${file.id}/download`
              )
            }
          >

            Download Document

          </Button>

        )}

      </CardContent>

    </Card>

  );

}