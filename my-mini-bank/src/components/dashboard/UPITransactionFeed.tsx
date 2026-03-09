import type { Transaction } from "@/services/bankDataService";
import { ArrowDownLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const toUpiId = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "") + "@upi";

interface Props {
  transactions: Transaction[];
}

const UPITransactionFeed = ({ transactions }: Props) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 bank-shadow">
      <h2 className="mb-4 font-semibold text-foreground">UPI Transactions</h2>
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
        {transactions.slice(0, 50).map((txn, i) => {
          const isCredit = txn.type === "credit";
          return (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border border-border/50 bg-secondary/30 p-4 transition-colors hover:bg-secondary/60"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  isCredit ? "bg-bank-success/15" : "bg-muted"
                }`}
              >
                {isCredit ? (
                  <ArrowDownLeft className="h-5 w-5 text-bank-success" />
                ) : (
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground truncate">
                  {isCredit ? "Received from" : "Paid to"} {txn.description}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {toUpiId(txn.description)}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {txn.category} Payment · {txn.date}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p
                  className={`text-lg font-bold ${
                    isCredit ? "text-bank-success" : "text-foreground"
                  }`}
                >
                  {isCredit ? "+" : "−"}{fmt(txn.amount)}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-bank-success">
                  <CheckCircle2 className="h-3 w-3" /> Success
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UPITransactionFeed;
