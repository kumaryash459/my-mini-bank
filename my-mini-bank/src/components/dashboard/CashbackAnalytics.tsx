import { PieChart } from "lucide-react";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const categories = [
  { name: "UPI Cashback", amount: 350, color: "bg-primary" },
  { name: "Shopping Cashback", amount: 500, color: "bg-bank-success" },
  { name: "Credit Card Cashback", amount: 400, color: "bg-bank-gold" },
];

const total = categories.reduce((s, c) => s + c.amount, 0);

const CashbackAnalytics = () => (
  <div className="rounded-xl border border-border bg-card p-5 bank-shadow">
    <div className="mb-4 flex items-center gap-2">
      <PieChart className="h-5 w-5 text-primary" />
      <h2 className="font-semibold text-foreground">Cashback Analytics</h2>
    </div>
    <div className="mb-4 rounded-lg bg-secondary p-3 text-center">
      <p className="text-xs text-muted-foreground">Total Cashback This Month</p>
      <p className="text-2xl font-bold text-foreground">{fmt(total)}</p>
    </div>
    {/* Bar breakdown */}
    <div className="space-y-3">
      {categories.map((cat) => {
        const pct = Math.round((cat.amount / total) * 100);
        return (
          <div key={cat.name}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-muted-foreground">{cat.name}</span>
              <span className="font-medium text-foreground">{fmt(cat.amount)}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default CashbackAnalytics;
