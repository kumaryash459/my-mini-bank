import type { DebitCardInfo } from "@/services/bankDataService";
import { Wifi } from "lucide-react";

interface Props {
  card: DebitCardInfo;
  bankName: string;
}

const DebitCardUI = ({ card, bankName }: Props) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 bank-shadow">
      <h2 className="mb-4 font-semibold text-foreground">Debit Card</h2>
      <div className="relative overflow-hidden rounded-2xl bank-card-gradient p-6 text-bank-navy-foreground aspect-[1.6/1] flex flex-col justify-between">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border-[20px] border-current" />
          <div className="absolute -right-4 top-8 h-32 w-32 rounded-full border-[15px] border-current" />
        </div>

        <div className="relative z-10 flex items-start justify-between">
          <span className="text-sm font-semibold opacity-90">{bankName}</span>
          <Wifi className="h-5 w-5 rotate-90 opacity-70" />
        </div>

        <div className="relative z-10">
          {/* Chip */}
          <div className="mb-4 h-8 w-11 rounded-md bg-bank-gold opacity-80" />
          <p className="text-lg font-mono tracking-[0.2em]">{card.cardNumber}</p>
        </div>

        <div className="relative z-10 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase opacity-60">Card Holder</p>
            <p className="text-sm font-semibold tracking-wide">{card.holderName}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase opacity-60">Expires</p>
            <p className="text-sm font-mono">{card.expiry}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase opacity-60">CVV</p>
            <p className="text-sm font-mono">•••</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebitCardUI;
