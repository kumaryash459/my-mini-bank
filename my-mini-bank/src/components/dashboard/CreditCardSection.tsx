import type { CreditCardInfo } from "@/services/bankDataService";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

interface Props {
  creditCard: CreditCardInfo;
}

const CreditCardSection = ({ creditCard }: Props) => {
  const usedPct = Math.round((creditCard.outstanding / creditCard.creditLimit) * 100);

  return (
    <div className="rounded-xl border border-border bg-card p-5 bank-shadow">
      <h2 className="mb-4 font-semibold text-foreground">Credit Card</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Credit Limit</span>
          <span className="text-sm font-medium text-foreground">{fmt(creditCard.creditLimit)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Outstanding</span>
          <span className="text-sm font-semibold text-bank-danger">{fmt(creditCard.outstanding)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Available</span>
          <span className="text-sm font-semibold text-bank-success">{fmt(creditCard.availableCredit)}</span>
        </div>
        {/* Usage bar */}
        <div className="pt-1">
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${usedPct}%`,
                background: usedPct > 50 ? "hsl(var(--bank-danger))" : "hsl(var(--primary))",
              }}
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{usedPct}% utilized</p>
        </div>
      </div>
    </div>
  );
};

export default CreditCardSection;
