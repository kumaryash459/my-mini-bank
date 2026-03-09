import type { StockHolding, SIPInvestment, FixedDeposit } from "@/services/bankDataService";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

interface Props {
  stocks: StockHolding[];
  sips: SIPInvestment[];
  fixedDeposits: FixedDeposit[];
}

const InvestmentsSection = ({ stocks, sips, fixedDeposits }: Props) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 bank-shadow">
      <div className="mb-4 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h2 className="font-semibold text-foreground">Investments</h2>
      </div>

      {/* Stocks */}
      <h3 className="mb-2 text-sm font-medium text-muted-foreground">Stocks</h3>
      <div className="mb-4 space-y-2">
        {stocks.map((s) => {
          const pnl = ((s.currentPrice - s.avgPrice) / s.avgPrice) * 100;
          const isUp = pnl >= 0;
          return (
            <div key={s.company} className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2">
              <div>
                <p className="text-sm font-medium text-foreground">{s.company}</p>
                <p className="text-xs text-muted-foreground">{s.quantity} shares • Avg {fmt(s.avgPrice)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{fmt(s.quantity * s.currentPrice)}</p>
                <p className={`flex items-center gap-0.5 text-xs ${isUp ? "text-bank-success" : "text-bank-danger"}`}>
                  {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {pnl.toFixed(1)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* SIPs */}
      <h3 className="mb-2 text-sm font-medium text-muted-foreground">SIP Investments</h3>
      <div className="mb-4 space-y-2">
        {sips.map((s) => (
          <div key={s.fundName} className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2">
            <div>
              <p className="text-sm font-medium text-foreground">{s.fundName}</p>
              <p className="text-xs text-muted-foreground">Monthly: {fmt(s.monthlySIP)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{fmt(s.currentValue)}</p>
              <p className="text-xs text-muted-foreground">Invested: {fmt(s.totalInvested)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FDs */}
      <h3 className="mb-2 text-sm font-medium text-muted-foreground">Fixed Deposits</h3>
      <div className="space-y-2">
        {fixedDeposits.map((fd, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2">
            <div>
              <p className="text-sm font-medium text-foreground">{fmt(fd.amount)}</p>
              <p className="text-xs text-muted-foreground">Maturity: {fd.maturityDate}</p>
            </div>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {fd.interestRate}% p.a.
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentsSection;
