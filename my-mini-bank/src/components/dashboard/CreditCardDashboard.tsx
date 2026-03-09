import { CreditCard } from "lucide-react";

const cards = [
  {
    name: "HDFC Platinum Credit Card",
    number: "**** **** **** 4589",
    network: "Visa",
    creditLimit: 200000,
    available: 145000,
    outstanding: 55000,
    billingCycle: "25th of every month",
    dueDate: "10th of next month",
    minDue: 5000,
    gradient: "from-[hsl(220,60%,20%)] to-[hsl(220,50%,35%)]",
  },
  {
    name: "ICICI Amazon Pay Card",
    number: "**** **** **** 8821",
    network: "Mastercard",
    creditLimit: 150000,
    available: 98000,
    outstanding: 52000,
    billingCycle: "15th of every month",
    dueDate: "5th of next month",
    minDue: 4200,
    gradient: "from-[hsl(250,50%,22%)] to-[hsl(270,45%,38%)]",
  },
  {
    name: "SBI SimplyCLICK Card",
    number: "**** **** **** 3310",
    network: "Visa",
    creditLimit: 300000,
    available: 225000,
    outstanding: 75000,
    billingCycle: "1st of every month",
    dueDate: "20th of same month",
    minDue: 6500,
    gradient: "from-[hsl(200,55%,18%)] to-[hsl(190,50%,32%)]",
  },
];

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const CreditCardDashboard = () => (
  <div className="rounded-xl border border-border bg-card p-5 bank-shadow">
    <div className="mb-4 flex items-center gap-2">
      <CreditCard className="h-5 w-5 text-primary" />
      <h2 className="font-semibold text-foreground">Credit Cards</h2>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((c) => {
        const usedPct = Math.round((c.outstanding / c.creditLimit) * 100);
        return (
          <div key={c.number} className="rounded-xl border border-border bg-secondary/30 overflow-hidden">
            {/* Mini card visual */}
            <div className={`bg-gradient-to-br ${c.gradient} p-4 text-white`}>
              <p className="text-xs font-medium opacity-80">{c.name}</p>
              <p className="mt-2 font-mono text-sm tracking-widest">{c.number}</p>
              <p className="mt-1 text-[10px] opacity-60">{c.network}</p>
            </div>
            {/* Details */}
            <div className="space-y-2 p-4 text-sm">
              <Row label="Credit Limit" value={fmt(c.creditLimit)} />
              <Row label="Available Credit" value={fmt(c.available)} cls="text-bank-success" />
              <Row label="Outstanding" value={fmt(c.outstanding)} cls="text-bank-danger" />
              <div className="pt-1">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${usedPct}%`,
                      background: usedPct > 50 ? "hsl(var(--bank-danger))" : "hsl(var(--primary))",
                    }}
                  />
                </div>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{usedPct}% utilized</p>
              </div>
              <Row label="Billing Cycle" value={c.billingCycle} small />
              <Row label="Due Date" value={c.dueDate} small />
              <Row label="Minimum Due" value={fmt(c.minDue)} cls="font-semibold text-foreground" />
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const Row = ({ label, value, cls, small }: { label: string; value: string; cls?: string; small?: boolean }) => (
  <div className="flex justify-between">
    <span className={`text-muted-foreground ${small ? "text-xs" : "text-sm"}`}>{label}</span>
    <span className={`${small ? "text-xs" : "text-sm"} ${cls || "text-foreground"}`}>{value}</span>
  </div>
);

export default CreditCardDashboard;
