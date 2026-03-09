import { useState } from "react";
import type { Transaction } from "@/services/bankDataService";
import { ArrowUpDown } from "lucide-react";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

type SortKey = "date" | "amount" | "category";

interface Props {
  transactions: Transaction[];
}

const BankStatementTable = ({ transactions }: Props) => {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortAsc, setSortAsc] = useState(false);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((p) => !p);
    else {
      setSortKey(key);
      setSortAsc(key !== "date");
    }
  };

  const sorted = [...transactions].slice(0, 50).sort((a, b) => {
    const dir = sortAsc ? 1 : -1;
    if (sortKey === "date") return dir * a.date.localeCompare(b.date);
    if (sortKey === "amount") return dir * (a.amount - b.amount);
    return dir * a.category.localeCompare(b.category);
  });

  const SortHeader = ({ label, k }: { label: string; k: SortKey }) => (
    <th
      onClick={() => toggleSort(k)}
      className="cursor-pointer select-none pb-3 pr-4 font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <ArrowUpDown className="h-3 w-3" />
      </span>
    </th>
  );

  const fmtDate = (d: string) => {
    const dt = new Date(d);
    return dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 bank-shadow">
      <h2 className="mb-4 font-semibold text-foreground">Bank Statement</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <SortHeader label="Date" k="date" />
              <th className="pb-3 pr-4 font-medium text-muted-foreground">Description</th>
              <SortHeader label="Category" k="category" />
              <th className="pb-3 pr-4 font-medium text-muted-foreground">Debit/Credit</th>
              <SortHeader label="Amount" k="amount" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((txn, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{fmtDate(txn.date)}</td>
                <td className="py-3 pr-4 font-medium text-foreground">{txn.description}</td>
                <td className="py-3 pr-4">
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                    {txn.category}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <span className={`text-xs font-semibold uppercase ${txn.type === "credit" ? "text-bank-success" : "text-foreground"}`}>
                    {txn.type}
                  </span>
                </td>
                <td className={`py-3 text-right font-semibold ${txn.type === "credit" ? "text-bank-success" : "text-foreground"}`}>
                  {fmt(txn.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankStatementTable;
