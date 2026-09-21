import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function History() {
  const { id } = useParams();

  const [history, setHistory] = useState([]);

  useEffect(() => {
    api
      .get(`/files/${id}/history`)
      .then((res) => {
        setHistory(res.data);
      })
      .catch(console.error);
  }, [id]);

  return (
    <Card className="max-w-4xl mx-auto">

      <CardHeader>

        <CardTitle>
          File History
        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="space-y-6">

          {history.length === 0 && (
            <p>No movement history found.</p>
          )}

          {history.map((item) => (

            <div
              key={item.id}
              className="flex gap-5"
            >

              <div className="flex flex-col items-center">

                <div className="w-4 h-4 rounded-full bg-blue-600"></div>

                <div className="w-1 flex-1 bg-gray-300"></div>

              </div>

              <div>

                <h3 className="font-semibold">

                  {item.from_holder}
                  {" → "}
                  {item.to_holder}

                </h3>

                <p className="text-sm text-gray-500">

                  {item.from_department}
                  {" → "}
                  {item.to_department}

                </p>

                <p className="text-sm mt-2">

                  {item.remarks}

                </p>

                <p className="text-xs text-gray-400 mt-2">

                  {new Date(item.moved_at).toLocaleString()}

                </p>

              </div>

            </div>

          ))}

        </div>

      </CardContent>

    </Card>
  );
}