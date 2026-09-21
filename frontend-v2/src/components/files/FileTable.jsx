import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import StatusBadge from "./StatusBadge";
import ActionMenu from "./ActionMenu";

export default function FileTable({ files }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>File Number</TableHead>

            <TableHead>File Name</TableHead>

            <TableHead>Department</TableHead>

            <TableHead>Holder</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Barcode</TableHead>

            <TableHead className="w-[80px]"></TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {files.length === 0 ? (

            <TableRow>

              <TableCell
                colSpan={7}
                className="text-center py-10"
              >
                No files found.
              </TableCell>

            </TableRow>

          ) : (

            files.map((file) => (

              <TableRow key={file.id}>

                <TableCell>
                  {file.file_number}
                </TableCell>

                <TableCell className="font-medium">
                  {file.file_name}
                </TableCell>

                <TableCell>
                  {file.department}
                </TableCell>

                <TableCell>
                  {file.current_holder}
                </TableCell>

                <TableCell>

                  <StatusBadge
                    status={file.status}
                  />

                </TableCell>

                <TableCell>
                  {file.barcode}
                </TableCell>

                <TableCell>

                  <ActionMenu
                    file={file}
                  />

                </TableCell>

              </TableRow>

            ))

          )}

        </TableBody>

      </Table>

    </div>
  );
}