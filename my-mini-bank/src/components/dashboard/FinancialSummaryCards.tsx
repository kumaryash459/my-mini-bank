import type { FinancialSummary } from "@/services/bankDataService";
import { Wallet, TrendingUp, CreditCard, Building, PiggyBank, BarChart3 } from "lucide-react";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

interface Props {
  summary: FinancialSummary;
}

const cards = [
  { key: "monthlySalary" as const, label: "Monthly Salary", icon: Wallet, accent: "bank-primary-gradient" },
  { key: "netWorth" as const, label: "Net Worth", icon: TrendingUp, accent: "bank-accent-gradient" },
  { key: "totalEMI" as const, label: "Total EMI Load", icon: Building, accent: "bank-gold-gradient" },
  { key: "creditCardOutstanding" as const, label: "Card Outstanding", icon: CreditCard, accent: "bank-card-gradient" },
  { key: "totalAssets" as const, label: "Total Assets", icon: PiggyBank, accent: "bank-accent-gradient" },
  { key: "investmentFunds" as const, label: "Investments", icon: BarChart3, accent: "bank-primary-gradient" },
];

const FinancialSummaryCards = ({ summary }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {cards.map((c, i) => (
        <div
          key={c.key}
          className="group rounded-xl border border-border bg-card p-4 bank-shadow transition-all hover:bank-shadow-elevated"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${c.accent}`}>
            <c.icon className="h-4 w-4 text-primary-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">{c.label}</p>
          <p className="mt-1 text-lg font-bold text-foreground truncate">{fmt(summary[c.key])}</p>
        </div>
      ))}
    </div>
  );
};

export default FinancialSummaryCards;
