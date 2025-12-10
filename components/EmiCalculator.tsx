'use client';

import React, { useEffect, useMemo, useState } from 'react';

interface EmiCalculatorProps {
  price: number; // car price in INR
  open: boolean;
  onClose: () => void;
}

function formatINR(value: number): string {
  if (!isFinite(value)) return '₹0';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Math.max(0, Math.round(value)));
}

export function EmiCalculator({ price, open, onClose }: EmiCalculatorProps) {
  const [downPayment, setDownPayment] = useState<number>(Math.round(price * 0.15));
  const [tenureMonths, setTenureMonths] = useState<number>(36);
  const [interestRate, setInterestRate] = useState<number>(10);

  useEffect(() => {
    setDownPayment(Math.round(price * 0.15));
  }, [price]);

  const principal = useMemo(() => Math.max(0, price - downPayment), [price, downPayment]);
  const monthlyRate = useMemo(() => interestRate / 12 / 100, [interestRate]);
  const monthlyEmi = useMemo(() => {
    if (monthlyRate === 0 || tenureMonths === 0) return principal / Math.max(1, tenureMonths);
    const rPow = Math.pow(1 + monthlyRate, tenureMonths);
    return principal * monthlyRate * rPow / (rPow - 1);
  }, [principal, monthlyRate, tenureMonths]);

  const totalPayable = useMemo(() => monthlyEmi * tenureMonths, [monthlyEmi, tenureMonths]);
  const totalInterest = useMemo(() => Math.max(0, totalPayable - principal), [totalPayable, principal]);

  if (!open) return null;

  const interestPct = totalPayable > 0 ? (totalInterest / totalPayable) : 0;
  const circumference = 2 * Math.PI * 72; // r=72
  const interestStroke = circumference * interestPct;
  const principalStroke = circumference - interestStroke;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-5xl mx-4 rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Choose your EMI options</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
          {/* Left controls */}
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Down Payment</p>
                <p className="text-sm text-gray-600">{formatINR(downPayment)}</p>
              </div>
              <input type="range" min={Math.round(price * 0.05)} max={Math.round(price * 0.9)} value={downPayment}
                     onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full" />
              <input type="number" value={downPayment}
                     onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value)))}
                     className="mt-3 w-full border rounded-lg px-3 py-2" />
              <p className="text-sm text-gray-600 mt-2">Your loan amount will be: <span className="font-semibold">{formatINR(principal)}</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">Tenure</p>
                  <p className="text-sm text-gray-600">{tenureMonths} months</p>
                </div>
                <input type="range" min={12} max={84} value={tenureMonths}
                       onChange={(e) => setTenureMonths(Number(e.target.value))} className="w-full" />
                <div className="lg:mt-3 mt-1 flex items-center gap-3">
                  <input type="number" min={1} value={Math.round(tenureMonths/12)} onChange={(e) => setTenureMonths(Math.min(84, Math.max(12, Number(e.target.value) * 12)))} className="border rounded-lg px-3 py-2 w-20" />
                  <span className="text-sm text-gray-600">years</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">Interest</p>
                  <p className="text-sm text-gray-600">{interestRate}%</p>
                </div>
                <input type="range" min={6} max={20} step={0.1} value={interestRate}
                       onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full" />
                <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="mt-3 w-28 border rounded-lg px-3 py-2" />
              </div>
            </div>
          </div>

          {/* Right summary */}
          <div className="lg:p-6 px-6 py-2">
            <div className="text-2xl font-bold">{formatINR(monthlyEmi)} <span className="text-base font-normal text-gray-600">EMI / month</span></div>

            <div className="mt-6 flex items-center justify-center">
              <svg className='lg:w-[200px] lg:h-[200px] w-[100px] h-[100px]' viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="72" stroke="#e2e8f0" strokeWidth="18" fill="none" />
                <circle cx="100" cy="100" r="72" stroke="#10b981" strokeWidth="18" fill="none"
                        strokeDasharray={`${principalStroke} ${circumference}`} strokeLinecap="round" transform="rotate(-90 100 100)" />
                <circle cx="100" cy="100" r="72" stroke="#f59e0b" strokeWidth="18" fill="none"
                        strokeDasharray={`${interestStroke} ${circumference}`} strokeLinecap="round" transform="rotate(${(-90 + (principalStroke / circumference) * 360)} 100 100)" />
              </svg>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500" /> Principal Loan Amount</span><span className="font-medium">{formatINR(principal)}</span></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500" /> Total Interest Payable</span><span className="font-medium">{formatINR(totalInterest)}</span></div>
              <div className="flex items-center justify-between border-t pt-2"><span>Total Amount Payable</span><span className="font-semibold">{formatINR(totalPayable)}</span></div>
            </div>

            <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg px-4 py-3">Get EMI Offers</button>
          </div>
        </div>
      </div>
    </div>
  );
}


