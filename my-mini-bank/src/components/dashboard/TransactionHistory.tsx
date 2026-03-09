import type { Transaction } from "@/services/bankDataService";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

interface Props {
  transactions: Transaction[];
}

const TransactionHistory = ({ transactions }: Props) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 bank-shadow">
      <h2 className="mb-4 font-semibold text-foreground">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 pr-4 font-medium text-muted-foreground">Date</th>
              <th className="pb-3 pr-4 font-medium text-muted-foreground">Description</th>
              <th className="pb-3 pr-4 font-medium text-muted-foreground">Category</th>
              <th className="pb-3 pr-4 text-right font-medium text-muted-foreground">Amount</th>
              <th className="pb-3 font-medium text-muted-foreground">Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 50).map((txn, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0">
                <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{txn.date}</td>
                <td className="py-3 pr-4 font-medium text-foreground">{txn.description}</td>
                <td className="py-3 pr-4">
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                    {txn.category}
                  </span>
                </td>
                <td className={`py-3 pr-4 text-right font-semibold ${txn.type === "credit" ? "text-bank-success" : "text-foreground"}`}>
                  {txn.type === "credit" ? "+" : "−"}{fmt(txn.amount)}
                </td>
                <td className="py-3">
                  {txn.type === "credit" ? (
                    <ArrowDownLeft className="h-4 w-4 text-bank-success" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
