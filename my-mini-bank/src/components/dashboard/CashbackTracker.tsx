import { Gift } from "lucide-react";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const recentCashbacks = [
  { merchant: "Swiggy Cashback", amount: 50 },
  { merchant: "Amazon Cashback", amount: 100 },
  { merchant: "UPI Offer", amount: 20 },
  { merchant: "Recharge Cashback", amount: 60 },
  { merchant: "Flipkart Cashback", amount: 75 },
];

const CashbackTracker = () => (
  <div className="rounded-xl border border-border bg-card p-5 bank-shadow">
    <div className="mb-4 flex items-center gap-2">
      <Gift className="h-5 w-5 text-primary" />
      <h2 className="font-semibold text-foreground">Cashback Rewards</h2>
    </div>
    <div className="mb-4 grid grid-cols-2 gap-3">
      <div className="rounded-lg bg-secondary p-3 text-center">
        <p className="text-xs text-muted-foreground">Total Earned</p>
        <p className="text-xl font-bold text-foreground">{fmt(850)}</p>
      </div>
      <div className="rounded-lg bg-secondary p-3 text-center">
        <p className="text-xs text-muted-foreground">This Month</p>
        <p className="text-xl font-bold text-bank-success">{fmt(230)}</p>
      </div>
    </div>
    <h3 className="mb-2 text-xs font-medium text-muted-foreground">Recent Rewards</h3>
    <div className="space-y-2">
      {recentCashbacks.map((cb) => (
        <div key={cb.merchant} className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2">
          <span className="text-sm text-foreground">{cb.merchant}</span>
          <span className="text-sm font-semibold text-bank-success">+{fmt(cb.amount)}</span>
        </div>
      ))}
    </div>
  </div>
);

export default CashbackTracker;
