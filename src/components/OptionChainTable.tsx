import { StrikeData } from "@/types/optionChain";
import { cn } from "@/lib/utils";

interface OptionChainTableProps {
  data: StrikeData[];
  atm: number;
  type: "oi" | "iv" | "ltp";
}

export function OptionChainTable({ data, atm, type }: OptionChainTableProps) {
  const formatNumber = (num: number, decimals: number = 2) => {
    if (Math.abs(num) >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (Math.abs(num) >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toFixed(decimals);
  };

  const formatPercent = (num: number) => {
    return num.toFixed(2);
  };

  const getColorClass = (value: number, isPercent: boolean = false) => {
    if (value > 0) return "text-success";
    if (value < 0) return "text-destructive";
    return "";
  };

  const renderOITable = () => (
    <table className="options-table">
      <thead>
        <tr>
          <th colSpan={3} className="border-b border-r border-border text-primary">CALL</th>
          <th rowSpan={2} className="border-b border-r border-border bg-secondary">Strike</th>
          <th colSpan={3} className="border-b border-border text-put">PUT</th>
        </tr>
        <tr>
          <th className="border-b border-border">COI%</th>
          <th className="border-b border-border">COI</th>
          <th className="border-b border-r border-border">OI</th>
          <th className="border-b border-border">OI</th>
          <th className="border-b border-border">COI</th>
          <th className="border-b border-border">COI%</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          const isATM = row.Strike === atm;
          return (
            <tr key={row.Strike} className={cn(isATM && "atm-row")}>
              <td className={getColorClass(row["CE_COI%"])}>{formatPercent(row["CE_COI%"])}</td>
              <td>{formatNumber(row.CE_COI, 0)}</td>
              <td className="border-r border-border">{formatNumber(row.CE_OI, 0)}</td>
              <td className={cn("border-r border-border font-medium", isATM && "atm-strike")}>
                {row.Strike}
              </td>
              <td>{formatNumber(row.PE_OI, 0)}</td>
              <td>{formatNumber(row.PE_COI, 0)}</td>
              <td className={getColorClass(row["PE_COI%"])}>{formatPercent(row["PE_COI%"])}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderIVTable = () => (
    <table className="options-table">
      <thead>
        <tr>
          <th className="border-b border-border text-primary">Call IV</th>
          <th className="border-b border-border bg-secondary">Strike</th>
          <th className="border-b border-border text-put">Put IV</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          const isATM = row.Strike === atm;
          return (
            <tr key={row.Strike} className={cn(isATM && "atm-row")}>
              <td>{row.CE_IV.toFixed(2)}</td>
              <td className={cn("font-medium", isATM && "atm-strike")}>{row.Strike}</td>
              <td>{row.PE_IV.toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderLTPTable = () => (
    <table className="options-table">
      <thead>
        <tr>
          <th colSpan={3} className="border-b border-r border-border text-primary">CALL</th>
          <th rowSpan={2} className="border-b border-r border-border bg-secondary">Strike</th>
          <th colSpan={3} className="border-b border-border text-put">PUT</th>
        </tr>
        <tr>
          <th className="border-b border-border">LTP Chg %</th>
          <th className="border-b border-border">LTP Chg</th>
          <th className="border-b border-r border-border">LTP</th>
          <th className="border-b border-border">LTP</th>
          <th className="border-b border-border">LTP Chg</th>
          <th className="border-b border-border">LTP Chg %</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          const isATM = row.Strike === atm;
          return (
            <tr key={row.Strike} className={cn(isATM && "atm-row")}>
              <td className={getColorClass(row["CE_LTP_CHG%"])}>{formatPercent(row["CE_LTP_CHG%"])}</td>
              <td className={getColorClass(row.CE_LTP_CHG)}>{formatNumber(row.CE_LTP_CHG)}</td>
              <td className="border-r border-border">{formatNumber(row.CE_LTP)}</td>
              <td className={cn("border-r border-border font-medium", isATM && "atm-strike")}>
                {row.Strike}
              </td>
              <td>{formatNumber(row.PE_LTP)}</td>
              <td className={getColorClass(row.PE_LTP_CHG)}>{formatNumber(row.PE_LTP_CHG)}</td>
              <td className={getColorClass(row["PE_LTP_CHG%"])}>{formatPercent(row["PE_LTP_CHG%"])}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      {type === "oi" && renderOITable()}
      {type === "iv" && renderIVTable()}
      {type === "ltp" && renderLTPTable()}
    </div>
  );
}
