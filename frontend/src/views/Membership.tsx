"use client";

import React, { useState } from 'react';
import { PageType, PriceTier } from '../types';
import { useGym } from '../context/GymContext';
import { Check, Award, Zap, ShieldAlert, ShieldCheck } from 'lucide-react';

interface MembershipProps {
  setCurrentPage: (page: PageType) => void;
}

type BillingCycle = 'monthly' | 'quarterly' | 'yearly';

export default function Membership({ setCurrentPage }: MembershipProps) {
  const { membershipPlans } = useGym();
  const [cycle, setCycle] = useState<BillingCycle>('monthly');

  // Comparison metrics rows
  const comparisonRows = [
    { feature: 'Gym Access Floor Time', basic: 'Cardio & Strength Zones only', pro: 'All Zones (Cardio, Strength, CrossFit, Turf)', elite: 'VVIP Unlimited Access + Recovery Lounge' },
    { feature: 'Bespoke Personal Trainer', basic: 'Complimentary Orientation only', pro: '2 Sessions / Month with Pro Coach', elite: 'Unlimited 1-on-1 Personal Elite Coach' },
    { feature: 'Diet & Nutrition Custom Blueprint', basic: 'Digital general guidelines only', pro: 'Bimonthly optimized macro blueprint', elite: 'Weekly customized protocols & juice bar priority' },
    { feature: 'Premium Group Classes Access', basic: 'Standard schedule classes only', pro: 'Unrestricted (boxing, HIIT, elite yoga, etc.)', elite: 'Priority booking + Guest passes' },
    { feature: 'Clinical Body Composition Assessments', basic: '1-time entry assessment', pro: 'Bimonthly tracking', elite: 'Weekly metabolic telemetry monitoring' },
    { feature: 'Wet Suite Options (Steam/Sauna/Plunge)', basic: 'Additional charge', pro: 'Included (Sauna & Eucalyptus rooms)', elite: 'All-inclusive VIP dry sauna, steam, and cold plunge' }
  ];

  const getPrice = (plan: PriceTier) => {
    if (cycle === 'monthly') return plan.monthlyPrice;
    if (cycle === 'quarterly') return Math.round(plan.quarterlyPrice / 3);
    return Math.round(plan.yearlyPrice / 12);
  };

  const getOriginalPriceLump = (plan: PriceTier) => {
    if (cycle === 'monthly') return plan.monthlyPrice;
    if (cycle === 'quarterly') return plan.quarterlyPrice;
    return plan.yearlyPrice;
  };

  return (
    <div className="space-y-24 py-16 pb-24 font-sans text-white" id="membership-page-container">
      
      {/* HEADER SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4" id="membership-header">
        <span className="text-xs font-black uppercase tracking-widest text-[#FF6600]">
          INVEST IN INDESTRUCTIBLE HEALTH
        </span>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl">
          Elite Membership Plans
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-zinc-400 font-semibold leading-relaxed">
          Straightforward packages with absolutely zero administrative sign-up fees or hidden maintenance charges. Choose your level of cellular reconstruction.
        </p>

        {/* 1. INTERACTIVE BILLING CYCLE TOGGLE */}
        <div className="flex justify-center pt-8" id="billing-cycle-toggle-wrapper">
          <div className="relative flex rounded-none bg-[#151515] p-1 border border-white/10">
            
            <button
              onClick={() => setCycle('monthly')}
              className={`px-4 py-2.5 text-xs font-black uppercase tracking-widest transition-all cursor-pointer rounded-none ${
                cycle === 'monthly' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
              }`}
            >
              Monthly
            </button>
            
            <button
              onClick={() => setCycle('quarterly')}
              className={`relative px-4 py-2.5 text-xs font-black uppercase tracking-widest transition-all cursor-pointer rounded-none ${
                cycle === 'quarterly' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
              }`}
            >
              Quarterly
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-block rounded-none bg-[#25D366] text-black px-1.5 py-0.5 text-[8px] font-black whitespace-nowrap">
                SAVE 15%
              </span>
            </button>
            
            <button
              onClick={() => setCycle('yearly')}
              className={`relative px-4 py-2.5 text-xs font-black uppercase tracking-widest transition-all cursor-pointer rounded-none ${
                cycle === 'yearly' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
              }`}
            >
              Yearly Tiers
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-block rounded-none bg-[#FF6600] text-white px-1.5 py-0.5 text-[8px] font-black whitespace-nowrap">
                SAVE 30%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. PLANS CARDS GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="membership-plans-grid">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
          {membershipPlans.map((plan) => {
            const isPro = plan.popular;
            return (
              <div
                key={plan.name}
                className={`relative rounded-none flex flex-col justify-between overflow-hidden border p-6 sm:p-8 transition-all duration-300 ${
                  isPro
                    ? 'border-[#FF6600] bg-[#151515] shadow-2xl'
                    : 'border-white/10 bg-[#151515]/60 hover:border-white/20'
                }`}
                id={`plan-card-${plan.name.toLowerCase()}`}
              >
                {isPro && (
                  <div className="absolute top-0 right-0 bg-[#FF6600] px-4 py-1 text-[10px] font-black uppercase text-black tracking-widest">
                    Most Suggested
                  </div>
                )}

                {/* Card Top Details */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-zinc-400">
                    {plan.name === 'Basic' && <ShieldCheck className="h-4.5 w-4.5 text-zinc-400" />}
                    {plan.name === 'Pro' && <Zap className="h-4.5 w-4.5 text-[#FF6600]" />}
                    {plan.name === 'Elite' && <Award className="h-4.5 w-4.5 text-[#F97316]" />}
                    <h3 className="text-xs font-black uppercase tracking-widest ml-1 text-[#FF6600]">{plan.name} Package</h3>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-semibold min-h-[32px]">
                    {plan.tagline}
                  </p>

                  <div className="pt-2">
                    <div className="flex items-baseline text-white">
                      <span className="text-sm font-black mr-1 text-[#FF6600]">₹</span>
                      <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight">{getPrice(plan).toLocaleString()}</span>
                      <span className="ml-1.5 text-xs font-semibold text-zinc-500">/ Month</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-1 uppercase tracking-wider">
                      {cycle === 'monthly' ? (
                        'Charged monthly recurring'
                      ) : (
                        `Total lump charge of ₹${getOriginalPriceLump(plan).toLocaleString()} every ${cycle === 'quarterly' ? '3' : '12'} months`
                      )}
                    </div>
                  </div>

                  {/* Bullet features list */}
                  <div className="pt-6 border-t border-white/10">
                    <ul className="space-y-3">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start text-xs text-zinc-300 leading-relaxed">
                          <Check className="mr-2 h-4 w-4 text-[#FF6600] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-8">
                  <button
                    onClick={() => {
                      setCurrentPage('trial');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full py-3.5 text-center text-xs font-black uppercase tracking-widest transition-all cursor-pointer rounded-none ${
                      isPro
                        ? 'bg-[#FF6600] text-black hover:bg-white hover:text-black'
                        : 'bg-white text-black hover:bg-[#FF6600] hover:text-white'
                    }`}
                  >
                    Forge My Membership
                  </button>
                  <p className="text-[9px] text-zinc-500 text-center font-mono mt-2.5 uppercase tracking-widest">
                    Quick 2-min reservation check
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE COMPARISON TABLE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="membership-comparison-grid">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white sm:text-3xl">
            Tiers Comparison Blueprint
          </h2>
          <p className="text-xs text-zinc-400 font-medium">
            Evaluate precise mechanical advantages and service offerings before committing.
          </p>
        </div>

        {/* Dense visual layout table */}
        <div className="overflow-x-auto rounded-none border border-white/10 bg-[#151515]" id="comparison-table-wrapper">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 bg-[#0D0D0D] text-white uppercase text-[10px] tracking-widest">
                <th className="p-6 font-black w-[250px]">Core Features</th>
                <th className="p-6 font-black text-zinc-400">Basic</th>
                <th className="p-6 font-black text-[#FF6600]">Pro (Value)</th>
                <th className="p-6 font-black text-[#F97316]">Elite</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#1C1C1C] transition-colors">
                  <td className="p-6 font-black text-white uppercase tracking-wider">{row.feature}</td>
                  <td className="p-6 text-zinc-400">{row.basic}</td>
                  <td className="p-6 text-zinc-300 font-semibold">{row.pro}</td>
                  <td className="p-6 text-[#FF6600] font-bold">{row.elite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. CLINICAL SECURITY STATEMENT */}
      <section className="mx-auto max-w-4xl px-4" id="membership-security-pitch">
        <div className="rounded-none border border-white/10 bg-[#151515] p-6 text-center space-y-3">
          <ShieldAlert className="mx-auto h-8 w-8 text-[#FF6600]" />
          <h4 className="text-xs font-black uppercase text-white tracking-widest">Our Unbreakable Policy Statement</h4>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl mx-auto font-semibold">
            Memberships at Fitex Gym operate under absolute consumer protection protocols. You are entitled to carry over unused personal training sessions once per half-term and freeze your accounts up to 45 days per year for medical or travel operations.
          </p>
        </div>
      </section>

    </div>
  );
}
