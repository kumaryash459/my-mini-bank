import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { generateBankData, getBankData, type BankData, type Transaction } from "@/services/bankDataService";

import FinancialSummaryCards from "@/components/dashboard/FinancialSummaryCards";
import AccountDetailsCard from "@/components/dashboard/AccountDetailsCard";
import DebitCardUI from "@/components/dashboard/DebitCardUI";
import InvestmentsSection from "@/components/dashboard/InvestmentsSection";
import AssetsSection from "@/components/dashboard/AssetsSection";
import CreditCardSection from "@/components/dashboard/CreditCardSection";
import UPITransactionFeed from "@/components/dashboard/UPITransactionFeed";
import BankStatementTable from "@/components/dashboard/BankStatementTable";
import ModeSelector from "@/components/dashboard/ModeSelector";
import AddTransactionForm from "@/components/dashboard/AddTransactionForm";

import CreditCardDashboard from "@/components/dashboard/CreditCardDashboard";
import CreditScoreWidget from "@/components/dashboard/CreditScoreWidget";
import DebitCardDashboard from "@/components/dashboard/DebitCardDashboard";
import InvestmentPortfolio from "@/components/dashboard/InvestmentPortfolio";
import CashbackTracker from "@/components/dashboard/CashbackTracker";
import CashbackAnalytics from "@/components/dashboard/CashbackAnalytics";

import { Building2, LogOut, RefreshCw, Plus, Send, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

type ViewMode = "normal" | "super";

const Dashboard = () => {

  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [bankData, setBankData] = useState<BankData | null>(null);

  const [showAddTxn, setShowAddTxn] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [mode, setMode] = useState<ViewMode>("normal");
  const [showCashmateConfirm, setShowCashmateConfirm] = useState(false);

  // Load user
  useEffect(() => {

    const user = localStorage.getItem("minibank_user");

    if (!user) {
      navigate("/");
      return;
    }

    setUserName(user);

    const existing = getBankData(user);

    if (existing) {
      setBankData(existing);
    } else {
      setBankData(generateBankData(user));
    }

    fetchTransactions(user);

  }, [navigate]);



  // Fetch transactions from backend
  const fetchTransactions = async (user: string) => {

    try {

      const res = await fetch(`http://localhost:5000/transactions/${user}`);
      const transactions = await res.json();

      setBankData(prev => {
        if (!prev) return prev;

        return {
          ...prev,
          transactions
        };
      });

    } catch (error) {
      console.error("Transaction fetch failed", error);
    }

  };



  // Generate fake financial data
  const handleGenerate = useCallback(() => {

    setGenerating(true);

    setTimeout(() => {

      const data = generateBankData(userName);

      setBankData(prev => {

        if (!prev) return data;

        return {
          ...data,
          transactions: prev.transactions
        };

      });

      setGenerating(false);

    }, 600);

  }, [userName]);



  // ADD TRANSACTION (SAVE TO DATABASE)
  const handleAddTransaction = useCallback(async (txn: Transaction) => {

    try {

      const payload = {
        username: userName,
        date: txn.date,
        description: txn.description,
        amount: txn.amount,
        category: txn.category,
        type: txn.type
      };

      const res = await fetch("http://localhost:5000/add-transaction", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(payload)

      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Transaction failed");
      }

      toast.success("Transaction saved to database");

      fetchTransactions(userName);

      setShowAddTxn(false);

    } catch (error) {

      console.error(error);
      toast.error("Could not save transaction");

    }

  }, [userName]);



  // SEND TO CASHMATE
  const handleSendToCashmate = useCallback(() => {

    if (!bankData) return;

    const payload = {

      userId: userName,

      transactions: bankData.transactions.map(({ date, description, amount, category, type }) => ({
        date,
        description,
        amount,
        category,
        type
      }))

    };

    console.log("Sending to Cashmate:", JSON.stringify(payload, null, 2));

    toast.success(`Sent ${payload.transactions.length} transactions to Cashmate`);

  }, [bankData, userName]);



  const handleLogout = () => {

    localStorage.removeItem("minibank_user");
    navigate("/");

  };



  if (!bankData) return null;



  return (

    <div className="min-h-screen bg-background">

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bank-card-gradient">
              <Building2 className="h-5 w-5 text-bank-navy-foreground" />
            </div>

            <div>
              <h1 className="text-lg font-bold text-foreground">Mini Bank</h1>
              <p className="text-xs text-muted-foreground">Welcome, {userName}</p>
            </div>

          </div>


          <div className="flex items-center gap-2">

            <button
              onClick={() => setShowCashmateConfirm(true)}
              className="flex items-center gap-1.5 rounded-lg bg-bank-success px-3 py-2 text-sm font-medium text-white"
            >
              <Send className="h-4 w-4" />
              Send to Cashmate
            </button>

            <button
              onClick={() => setShowAddTxn(true)}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm"
            >
              <Plus className="h-4 w-4" />
              Add Txn
            </button>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm text-white"
            >
              <RefreshCw className={`h-4 w-4 ${generating ? "animate-spin" : ""}`} />
              Generate Data
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm"
            >
              <LogOut className="h-4 w-4" />
            </button>

          </div>

        </div>

      </header>



      {/* DASHBOARD */}

      <main className="mx-auto max-w-7xl px-4 py-6 space-y-6">

        <ModeSelector mode={mode} onModeChange={setMode} />

        <FinancialSummaryCards summary={bankData.summary} />

        <div className="grid gap-6 lg:grid-cols-2">
          <AccountDetailsCard account={bankData.account} />
          <DebitCardUI card={bankData.debitCard} bankName={bankData.account.bankName} />
        </div>

        {mode === "normal" ? (
          <>
            <CashbackTracker />
            <UPITransactionFeed transactions={bankData.transactions} />
          </>
        ) : (
          <>
            <CreditCardDashboard />
            <CreditScoreWidget />
            <DebitCardDashboard />
            <InvestmentPortfolio />
            <CashbackAnalytics />
            <BankStatementTable transactions={bankData.transactions} />
          </>
        )}

      </main>



      {/* ADD TRANSACTION MODAL */}

      {showAddTxn && (
        <AddTransactionForm
          onSubmit={handleAddTransaction}
          onClose={() => setShowAddTxn(false)}
          userName={userName}
        />
      )}

    </div>

  );

};

export default Dashboard;