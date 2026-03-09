import type { Assets } from "@/services/bankDataService";
import { Home, Gem, Shield, PiggyBank } from "lucide-react";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

interface Props {
  assets: Assets;
}

const items = [
  { key: "propertyValue" as const, label: "Property", icon: Home },
  { key: "goldInvestment" as const, label: "Gold", icon: Gem },
  { key: "emergencyFund" as const, label: "Emergency Fund", icon: Shield },
  { key: "savingsBalance" as const, label: "Savings", icon: PiggyBank },
];

const AssetsSection = ({ assets }: Props) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 bank-shadow">
      <h2 className="mb-4 font-semibold text-foreground">Assets</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.key} className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
            <p className="text-sm font-semibold text-foreground">{fmt(assets[item.key])}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetsSection;
