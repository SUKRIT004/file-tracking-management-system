import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Reports() {

  const exportExcel = () => {
    window.open(
      "http://127.0.0.1:8000/files/export/excel",
      "_blank"
    );
  };

  const exportPDF = () => {
    window.open(
      "http://127.0.0.1:8000/files/export/pdf",
      "_blank"
    );
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Reports
      </h1>

      <Card>

        <CardContent className="space-y-4 p-6">

          <Button
            className="w-full"
            onClick={exportExcel}
          >
            Export All Files (Excel)
          </Button>

          <Button
            className="w-full"
            onClick={exportPDF}
          >
            Export All Files (PDF)
          </Button>

          <Button className="w-full">
            Department Report
          </Button>

          <Button className="w-full">
            Archived Files Report
          </Button>

        </CardContent>

      </Card>

    </div>
  );
}