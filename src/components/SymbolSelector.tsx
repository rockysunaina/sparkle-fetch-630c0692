import { useState, useEffect, useMemo } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SymbolSelectorProps {
  symbols: string[];
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
  disabled?: boolean;
}

export function SymbolSelector({
  symbols,
  value,
  onChange,
  loading = false,
  disabled = false,
}: SymbolSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredSymbols = useMemo(() => {
    if (!search) return symbols.slice(0, 50);
    return symbols
      .filter((symbol) =>
        symbol.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 50);
  }, [symbols, search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled || loading}
          className="w-full justify-between bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          {loading ? (
            "Loading..."
          ) : value ? (
            value
          ) : (
            "Select symbol..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-popover border-border" align="start">
        <Command>
          <CommandInput
            placeholder="Search symbol..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No symbol found.</CommandEmpty>
            <CommandGroup>
              {filteredSymbols.map((symbol) => (
                <CommandItem
                  key={symbol}
                  value={symbol}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === symbol ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {symbol}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
