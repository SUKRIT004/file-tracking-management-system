import { Badge } from "@/components/ui/badge";

export default function StatusBadge({ status }) {
  const color =
    status === "Active"
      ? "bg-green-500"
      : status === "Archived"
      ? "bg-gray-500"
      : "bg-orange-500";

  return (
    <Badge className={`${color} text-white`}>
      {status}
    </Badge>
  );
}