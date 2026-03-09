// In-memory bank data store and generator

export type TransactionType = "credit" | "debit";
export type Category = "Food" | "Transport" | "Shopping" | "Bills and Utilities" | "Entertainment" | "Health" | "Salary" | "Other" | "Cashback Wallet";

export interface Transaction {
  date: string;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
}

export interface StockHolding {
  company: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
}

export interface SIPInvestment {
  fundName: string;
  monthlySIP: number;
  totalInvested: number;
  currentValue: number;
}

export interface FixedDeposit {
  amount: number;
  interestRate: number;
  maturityDate: string;
}

export interface AccountDetails {
  holderName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
  bankName: string;
  balance: number;
}

export interface DebitCardInfo {
  holderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface CreditCardInfo {
  creditLimit: number;
  outstanding: number;
  availableCredit: number;
}

export interface FinancialSummary {
  monthlySalary: number;
  netWorth: number;
  totalEMI: number;
  creditCardOutstanding: number;
  totalAssets: number;
  investmentFunds: number;
}

export interface Assets {
  propertyValue: number;
  goldInvestment: number;
  emergencyFund: number;
  savingsBalance: number;
}

export interface BankData {
  userId: string;
  account: AccountDetails;
  debitCard: DebitCardInfo;
  creditCard: CreditCardInfo;
  summary: FinancialSummary;
  stocks: StockHolding[];
  sips: SIPInvestment[];
  fixedDeposits: FixedDeposit[];
  assets: Assets;
  transactions: Transaction[];
}

// In-memory store
const store: Record<string, BankData> = {};

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randFloat = (min: number, max: number) => +(Math.random() * (max - min) + min).toFixed(2);
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank"];
const BRANCHES = ["MG Road", "Connaught Place", "Bandra West", "Jubilee Hills", "Indiranagar", "Salt Lake"];
const IFSC_PREFIXES = ["SBIN0", "HDFC0", "ICIC0", "UTIB0", "KKBK0"];

const MERCHANTS: { name: string; category: Category; minAmt: number; maxAmt: number }[] = [
  { name: "Swiggy", category: "Food", minAmt: 150, maxAmt: 800 },
  { name: "Zomato", category: "Food", minAmt: 200, maxAmt: 900 },
  { name: "McDonald's", category: "Food", minAmt: 200, maxAmt: 600 },
  { name: "Starbucks", category: "Food", minAmt: 300, maxAmt: 700 },
  { name: "Uber", category: "Transport", minAmt: 100, maxAmt: 500 },
  { name: "Ola", category: "Transport", minAmt: 80, maxAmt: 400 },
  { name: "Metro Card Recharge", category: "Transport", minAmt: 200, maxAmt: 500 },
  { name: "Petrol - IOCL", category: "Transport", minAmt: 500, maxAmt: 3000 },
  { name: "Amazon", category: "Shopping", minAmt: 300, maxAmt: 5000 },
  { name: "Flipkart", category: "Shopping", minAmt: 400, maxAmt: 4000 },
  { name: "Myntra", category: "Shopping", minAmt: 500, maxAmt: 3000 },
  { name: "Electricity Bill", category: "Bills and Utilities", minAmt: 800, maxAmt: 3000 },
  { name: "Water Bill", category: "Bills and Utilities", minAmt: 200, maxAmt: 600 },
  { name: "Mobile Recharge", category: "Bills and Utilities", minAmt: 199, maxAmt: 999 },
  { name: "Broadband Bill", category: "Bills and Utilities", minAmt: 500, maxAmt: 1500 },
  { name: "Netflix", category: "Entertainment", minAmt: 199, maxAmt: 649 },
  { name: "Spotify", category: "Entertainment", minAmt: 119, maxAmt: 179 },
  { name: "PVR Cinemas", category: "Entertainment", minAmt: 300, maxAmt: 1200 },
  { name: "BookMyShow", category: "Entertainment", minAmt: 200, maxAmt: 800 },
  { name: "Gym Membership", category: "Health", minAmt: 1000, maxAmt: 3000 },
  { name: "Apollo Pharmacy", category: "Health", minAmt: 200, maxAmt: 2000 },
  { name: "Doctor Consultation", category: "Health", minAmt: 500, maxAmt: 2000 },
  { name: "Rent Payment", category: "Other", minAmt: 8000, maxAmt: 25000 },
  { name: "Insurance Premium", category: "Other", minAmt: 2000, maxAmt: 8000 },
];

const STOCK_COMPANIES = [
  { name: "Reliance Industries", priceRange: [2200, 2800] },
  { name: "TCS", priceRange: [3200, 4000] },
  { name: "Infosys", priceRange: [1400, 1800] },
  { name: "HDFC Bank", priceRange: [1500, 1800] },
  { name: "Wipro", priceRange: [400, 550] },
  { name: "ITC", priceRange: [400, 500] },
  { name: "Bharti Airtel", priceRange: [1200, 1600] },
];

const MF_NAMES = [
  "SBI Bluechip Fund", "HDFC Mid-Cap Fund", "Axis Long Term Equity", 
  "Mirae Asset Large Cap", "Parag Parikh Flexi Cap", "Nippon India Small Cap"
];

function generateTransactions(userId: string, salary: number): Transaction[] {
  const txns: Transaction[] = [];
  const now = new Date();
  const monthsBack = rand(3, 6);
  const startDate = new Date(now);
  startDate.setMonth(startDate.getMonth() - monthsBack);

  // Add salary credits
  for (let m = 0; m < monthsBack; m++) {
    const salaryDate = new Date(startDate);
    salaryDate.setMonth(salaryDate.getMonth() + m);
    salaryDate.setDate(1);
    if (salaryDate <= now) {
      txns.push({
        date: salaryDate.toISOString().split("T")[0],
        description: "Salary Credit",
        amount: salary,
        category: "Salary",
        type: "credit",
      });
    }
  }

  // Generate expenses
  const numTxns = rand(50, 100) - txns.length;
  for (let i = 0; i < numTxns; i++) {
    const merchant = pick(MERCHANTS);
    const daysAgo = rand(0, monthsBack * 30);
    const txnDate = new Date(now);
    txnDate.setDate(txnDate.getDate() - daysAgo);
    
    txns.push({
      date: txnDate.toISOString().split("T")[0],
      description: merchant.name,
      amount: rand(merchant.minAmt, merchant.maxAmt),
      category: merchant.category,
      type: "debit",
    });
  }

  // Sort by date descending
  txns.sort((a, b) => b.date.localeCompare(a.date));
  return txns;
}

export function generateBankData(userId: string): BankData {
  const salary = rand(40000, 200000);
  const bankIdx = rand(0, BANKS.length - 1);

  const account: AccountDetails = {
    holderName: userId,
    accountNumber: `${rand(1000, 9999)}${rand(1000, 9999)}${rand(1000, 9999)}`,
    ifscCode: `${IFSC_PREFIXES[bankIdx]}${rand(100000, 999999)}`,
    branch: pick(BRANCHES),
    bankName: BANKS[bankIdx],
    balance: rand(10000, 500000),
  };

  const debitCard: DebitCardInfo = {
    holderName: userId.toUpperCase(),
    cardNumber: `${rand(4000, 4999)} ${rand(1000, 9999)} ${rand(1000, 9999)} ${rand(1000, 9999)}`,
    expiry: `${String(rand(1, 12)).padStart(2, "0")}/${rand(27, 31)}`,
    cvv: String(rand(100, 999)),
  };

  const creditLimit = rand(50000, 500000);
  const outstanding = rand(0, Math.floor(creditLimit * 0.6));
  const creditCard: CreditCardInfo = {
    creditLimit,
    outstanding,
    availableCredit: creditLimit - outstanding,
  };

  const stocks = STOCK_COMPANIES.slice(0, rand(3, 6)).map(s => ({
    company: s.name,
    quantity: rand(5, 100),
    avgPrice: randFloat(s.priceRange[0] * 0.9, s.priceRange[1]),
    currentPrice: randFloat(s.priceRange[0], s.priceRange[1]),
  }));

  const sips = MF_NAMES.slice(0, rand(2, 4)).map(name => {
    const monthly = rand(1, 10) * 1000;
    const months = rand(6, 36);
    return {
      fundName: name,
      monthlySIP: monthly,
      totalInvested: monthly * months,
      currentValue: Math.round(monthly * months * randFloat(1.05, 1.35)),
    };
  });

  const fixedDeposits = Array.from({ length: rand(1, 3) }, () => {
    const matDate = new Date();
    matDate.setMonth(matDate.getMonth() + rand(6, 60));
    return {
      amount: rand(1, 20) * 50000,
      interestRate: randFloat(5.5, 8.5),
      maturityDate: matDate.toISOString().split("T")[0],
    };
  });

  const propertyValue = rand(0, 1) ? rand(2000000, 15000000) : 0;
  const goldInvestment = rand(50000, 800000);
  const emergencyFund = rand(50000, 500000);

  const stocksValue = stocks.reduce((s, st) => s + st.quantity * st.currentPrice, 0);
  const sipsValue = sips.reduce((s, si) => s + si.currentValue, 0);
  const fdsValue = fixedDeposits.reduce((s, fd) => s + fd.amount, 0);
  const totalAssets = propertyValue + goldInvestment + emergencyFund + account.balance;
  const investmentFunds = stocksValue + sipsValue + fdsValue;

  const assets: Assets = {
    propertyValue,
    goldInvestment,
    emergencyFund,
    savingsBalance: account.balance,
  };

  const summary: FinancialSummary = {
    monthlySalary: salary,
    netWorth: totalAssets + investmentFunds,
    totalEMI: rand(0, 5) * rand(3000, 15000),
    creditCardOutstanding: outstanding,
    totalAssets,
    investmentFunds: Math.round(investmentFunds),
  };

  const transactions = generateTransactions(userId, salary);

  const data: BankData = {
    userId,
    account,
    debitCard,
    creditCard,
    summary,
    stocks,
    sips,
    fixedDeposits,
    assets,
    transactions,
  };

  store[userId] = data;
  return data;
}

export function addTransaction(userId: string, txn: Transaction): boolean {
  if (!store[userId]) return false;
  store[userId].transactions.unshift(txn);
  return true;
}

export function getTransactions(userId: string): Transaction[] | null {
  return store[userId]?.transactions ?? null;
}

export function getBankData(userId: string): BankData | null {
  return store[userId] ?? null;
}

// Format for Cashmate API
export function getAPIResponse(userId: string): { data: Transaction[] } | null {
  const txns = getTransactions(userId);
  if (!txns) return null;
  return { data: txns };
}
