import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const investments = [
  { name: "Mutual Funds", invested: 120000, current: 145000, icon: "📊" },
  { name: "Stocks", invested: 80000, current: 92000, icon: "📈" },
  { name: "Fixed Deposit", invested: 200000, current: 214000, icon: "🏦", rate: "7%", maturity: "Mar 2028" },
  { name: "Gold Investment", invested: 50000, current: 60000, icon: "🥇" },
  { name: "Crypto (Simulated)", invested: 30000, current: 27500, icon: "₿" },
];

const InvestmentPortfolio = () => {
  const totalInvested = investments.reduce((s, i) => s + i.invested, 0);
  const totalCurrent = investments.reduce((s, i) => s + i.current, 0);
  const totalReturn = totalCurrent - totalInvested;
  const totalPct = ((totalReturn / totalInvested) * 100).toFixed(1);

  return (
    <div className="rounded-xl border border-border bg-card p-5 bank-shadow">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">Investment Portfolio</h2>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Total Value</p>
          <p className="text-lg font-bold text-foreground">{fmt(totalCurrent)}</p>
          <p className={`text-xs font-medium ${totalReturn >= 0 ? "text-bank-success" : "text-bank-danger"}`}>
            {totalReturn >= 0 ? "+" : ""}{fmt(totalReturn)} ({totalPct}%)
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {investments.map((inv) => {
          const ret = inv.current - inv.invested;
          const pct = ((ret / inv.invested) * 100).toFixed(1);
          const isUp = ret >= 0;
          return (
            <div key={inv.name} className="flex items-center justify-between rounded-lg bg-secondary px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">{inv.icon}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{inv.name}</p>
                  <p className="text-xs text-muted-foreground">Invested: {fmt(inv.invested)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{fmt(inv.current)}</p>
                <p className={`flex items-center justify-end gap-0.5 text-xs ${isUp ? "text-bank-success" : "text-bank-danger"}`}>
                  {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {isUp ? "+" : ""}{pct}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InvestmentPortfolio;
