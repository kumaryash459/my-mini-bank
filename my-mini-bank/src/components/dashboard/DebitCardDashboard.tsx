import { Wallet } from "lucide-react";

const cards = [
  {
    bank: "Axis Bank",
    number: "**** **** **** 7321",
    type: "Platinum Debit Card",
    account: "Savings Account",
    atmLimit: 50000,
    posLimit: 100000,
    status: "Active",
  },
  {
    bank: "HDFC Bank",
    number: "**** **** **** 1094",
    type: "Classic Debit Card",
    account: "Salary Account",
    atmLimit: 25000,
    posLimit: 75000,
    status: "Active",
  },
];

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const DebitCardDashboard = () => (
  <div className="rounded-xl border border-border bg-card p-5 bank-shadow">
    <div className="mb-4 flex items-center gap-2">
      <Wallet className="h-5 w-5 text-primary" />
      <h2 className="font-semibold text-foreground">Debit Cards</h2>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      {cards.map((c) => (
        <div key={c.number} className="rounded-xl border border-border bg-secondary/30 overflow-hidden">
          <div className="bg-gradient-to-br from-[hsl(160,40%,18%)] to-[hsl(170,35%,30%)] p-4 text-white">
            <p className="text-xs font-medium opacity-80">{c.bank}</p>
            <p className="mt-2 font-mono text-sm tracking-widest">{c.number}</p>
            <p className="mt-1 text-[10px] opacity-60">{c.type}</p>
          </div>
          <div className="space-y-2 p-4 text-sm">
            <Row label="Linked Account" value={c.account} />
            <Row label="ATM Limit" value={`${fmt(c.atmLimit)} / day`} />
            <Row label="POS Limit" value={`${fmt(c.posLimit)} / day`} />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="rounded-full bg-bank-success/20 px-2 py-0.5 text-xs font-semibold text-bank-success">
                {c.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm text-foreground">{value}</span>
  </div>
);

export default DebitCardDashboard;
