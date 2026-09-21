import { useState } from "react";
import api from "../../services/api";

import { Button } from "@/components/ui/button";

export default function FileUpload({ fileId }) {

  const [selectedFile, setSelectedFile] = useState(null);

  const upload = async () => {

    if (!selectedFile) return;

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {

      await api.post(
        `/files/${fileId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Uploaded Successfully");

    } catch (err) {

      console.error(err);

      alert("Upload Failed");

    }

  };

  return (
    <div className="space-y-4">

      <input
        type="file"
        onChange={(e) =>
          setSelectedFile(e.target.files[0])
        }
      />

      <Button
        onClick={upload}
      >
        Upload Document
      </Button>

    </div>
  );

}