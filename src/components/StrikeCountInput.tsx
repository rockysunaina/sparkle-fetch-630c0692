import { Input } from "@/components/ui/input";

interface StrikeCountInputProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function StrikeCountInput({
  value,
  onChange,
  disabled = false,
}: StrikeCountInputProps) {
  return (
    <Input
      type="number"
      min={1}
      max={50}
      value={value}
      onChange={(e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val >= 1 && val <= 50) {
          onChange(val);
        }
      }}
      disabled={disabled}
      className="w-full bg-secondary text-secondary-foreground"
      placeholder="Strike Count"
    />
  );
}
