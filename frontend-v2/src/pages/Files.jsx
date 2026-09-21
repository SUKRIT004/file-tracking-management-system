import { useEffect, useState } from "react";

import api from "../services/api";

import SearchBar from "../components/files/SearchBar";
import FileTable from "../components/files/FileTable";

export default function Files() {

  const [files, setFiles] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    api
      .get("/files")
      .then((res) => {

        setFiles(res.data);

      })
      .catch(console.error);

  }, []);

  const filteredFiles = files.filter((file) => {

    return (

      file.file_number
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      file.file_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      file.department
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  });

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-4xl font-bold">
          Files
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage all files
        </p>

      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <FileTable
        files={filteredFiles}
      />

    </div>

  );

}