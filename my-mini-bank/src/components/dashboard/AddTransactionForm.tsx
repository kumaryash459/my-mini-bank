import { useState } from "react";
import type { Transaction, Category, TransactionType } from "@/services/bankDataService";
import { X, Send, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const CATEGORIES: Category[] = ["Food", "Transport", "Shopping", "Bills and Utilities", "Entertainment", "Health", "Salary", "Cashback Wallet", "Other"];
const TYPES: TransactionType[] = ["credit", "debit"];

interface Props {
  onSubmit: (txn: Transaction) => void;
  onClose: () => void;
  userName: string;
}

const AddTransactionForm = ({ onSubmit, onClose, userName }: Props) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Other");
  const [type, setType] = useState<TransactionType>("debit");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount) return;
    onSubmit({ date, description: description.trim(), amount: Number(amount), category, type });
  };

  const handleSendToCashmate = () => {
    if (!description.trim() || !amount) return;
    setShowConfirm(true);
  };

  const confirmSend = () => {
    const txn = { date, description: description.trim(), amount: Number(amount), category, type };
    onSubmit(txn);
    const payload = { userId: userName, transactions: [{ date: txn.date, description: txn.description, amount: txn.amount, category: txn.category, type: txn.type }] };
    console.log("Sending to Cashmate:", JSON.stringify(payload, null, 2));
    toast.success("Transaction added & sent to Cashmate");
    setShowConfirm(false);
  };

  const inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  const labelClass = "mb-1 block text-sm font-medium text-foreground";

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={onClose}>
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 bank-shadow-elevated" onClick={(e) => e.stopPropagation()}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Add Transaction</h2>
            <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary">
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Grocery shopping" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Amount (₹)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" min="1" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as Category)} className={inputClass}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <div className="flex gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${type === t
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:bg-secondary"
                      }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={!description.trim() || !amount}
                className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                Add Transaction
              </button>
              <button
                type="button"
                disabled={!description.trim() || !amount}
                onClick={handleSendToCashmate}
                className="flex items-center gap-1.5 rounded-lg bg-bank-success px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                <Send className="h-4 w-4" /> Send to Cashmate
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/30 backdrop-blur-sm" onClick={() => setShowConfirm(false)}>
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 bank-shadow-elevated" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bank-success/15">
                <AlertTriangle className="h-5 w-5 text-bank-success" />
              </div>
              <h3 className="text-base font-semibold text-foreground">Confirm Send to Cashmate</h3>
            </div>
            <p className="mb-2 text-sm text-muted-foreground">You are about to send the following transaction:</p>
            <div className="mb-4 rounded-lg bg-secondary p-3 space-y-1 text-sm">
              <p className="text-foreground font-medium">{description.trim()}</p>
              <p className="text-muted-foreground">{date} • {category} • {type}</p>
              <p className="text-foreground font-semibold">₹{Number(amount).toLocaleString("en-IN")}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-lg border border-border bg-card py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                onClick={confirmSend}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-bank-success py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Send className="h-4 w-4" /> Confirm & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTransactionForm;
