import { ShieldCheck } from "lucide-react";

const score = 742;
const max = 900;
const min = 300;
const pct = Math.round(((score - min) / (max - min)) * 100);

const getCategory = (s: number) => {
  if (s >= 800) return { label: "Excellent", color: "text-bank-success" };
  if (s >= 740) return { label: "Very Good", color: "text-bank-success" };
  if (s >= 670) return { label: "Good", color: "text-primary" };
  if (s >= 580) return { label: "Fair", color: "text-yellow-500" };
  return { label: "Poor", color: "text-bank-danger" };
};

const cat = getCategory(score);

const CreditScoreWidget = () => (
  <div className="rounded-xl border border-border bg-card p-5 bank-shadow">
    <div className="mb-4 flex items-center gap-2">
      <ShieldCheck className="h-5 w-5 text-primary" />
      <h2 className="font-semibold text-foreground">Credit Score</h2>
    </div>
    <div className="flex flex-col items-center gap-3">
      {/* Circular gauge */}
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--secondary))" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${pct * 3.27} 327`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground">{score}</span>
          <span className={`text-xs font-medium ${cat.color}`}>{cat.label}</span>
        </div>
      </div>
      <div className="flex w-full justify-between text-[10px] text-muted-foreground px-2">
        <span>300</span>
        <span>500</span>
        <span>700</span>
        <span>900</span>
      </div>
    </div>
  </div>
);

export default CreditScoreWidget;
