import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; // <-- ADD THIS


export default function ActionMenu({ file }) {
  const navigate = useNavigate();

  const handleArchive = async () => {
    try {
      await api.put(`/files/${file.id}/archive`);
      alert("File Archived Successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to archive file");
    }
  };
  const handleDelete = async () => {

  const ok = window.confirm(
    "Delete this file?"
  );

  if (!ok) return;

  try {

    await api.delete(
      `/files/${file.id}`
    );

    window.location.reload();

  } catch (err) {

    console.error(err);

  }

};

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>

        <DropdownMenuItem
          onClick={() => navigate(`/files/${file.id}`)}
        >
          👁 View
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate(`/edit/${file.id}`)}
        >
          ✏ Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate(`/transfer/${file.id}`)}
        >
          🔄 Transfer
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate(`/history/${file.id}`)}
        >
          📜 History
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleArchive}
        >
          📦 Archive
        </DropdownMenuItem>
        <DropdownMenuItem
         onClick={handleDelete}
         className="text-red-600">
        🗑 Delete

</DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}
