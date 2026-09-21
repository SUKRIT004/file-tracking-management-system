import { Input } from "@/components/ui/input";

export default function SearchBar({
  value,
  onChange,
}) {
  return (
    <Input
      placeholder="Search files..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-6"
    />
  );
}