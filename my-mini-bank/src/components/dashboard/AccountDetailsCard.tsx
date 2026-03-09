import type { AccountDetails } from "@/services/bankDataService";
import { Building2, Copy } from "lucide-react";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

interface Props {
  account: AccountDetails;
}

const AccountDetailsCard = ({ account }: Props) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 bank-shadow">
      <div className="mb-4 flex items-center gap-2">
        <Building2 className="h-5 w-5 text-primary" />
        <h2 className="font-semibold text-foreground">Account Details</h2>
      </div>
      <div className="space-y-3">
        {[
          ["Account Holder", account.holderName],
          ["Account Number", account.accountNumber],
          ["IFSC Code", account.ifscCode],
          ["Branch", account.branch],
          ["Bank", account.bankName],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-medium text-foreground font-mono">{value}</span>
          </div>
        ))}
        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Balance</span>
            <span className="text-xl font-bold text-bank-success">{fmt(account.balance)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsCard;
