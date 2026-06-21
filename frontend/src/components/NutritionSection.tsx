"use client";

import React, { useState } from 'react';
import { nutritionDietGuidelines } from '../data';
import { Apple, Scale, Calculator, Flame, ClipboardList, Info, FlameKindling, ShieldAlert, Sparkles, Check } from 'lucide-react';

export default function NutritionSection() {
  const [userWeight, setUserWeight] = useState<number>(75);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [fitnessGoal, setFitnessGoal] = useState<'shred' | 'lean_bulk' | 'competition'>('lean_bulk');

  // Convert weight to kg for standard formula
  const weightInKg = weightUnit === 'kg' ? userWeight : userWeight * 0.45359237;

  // Multipliers for Protein (g/kg), Carbs (g/kg), Fats (g/kg)
  const multipliers = {
    shred: { protein: 2.2, carbs: 1.5, fats: 0.6 },
    lean_bulk: { protein: 2.0, carbs: 4.0, fats: 0.9 },
    competition: { protein: 2.5, carbs: 1.8, fats: 0.5 },
  };

  const currentMultiplier = multipliers[fitnessGoal];
  const proteinGrams = Math.round(weightInKg * currentMultiplier.protein);
  const carbsGrams = Math.round(weightInKg * currentMultiplier.carbs);
  const fatsGrams = Math.round(weightInKg * currentMultiplier.fats);
  const estimatedCalories = Math.round((proteinGrams * 4) + (carbsGrams * 4) + (fatsGrams * 9));

  return (
    <div className="space-y-12" id="nutrition-wrapper">
      
      {/* Intro Grid & Protein Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Protein & Macro Estimator */}
        <div className="lg:col-span-6 rounded-2xl border border-zinc-800 bg-[#121212] p-5 sm:p-8" id="protein-calculator-box">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600/10 text-[#FF6600]">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Dynamic Macro Calculator</h3>
              <p className="text-xs text-zinc-500">Tune your macro thresholds to optimize cellular reconstruction.</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Weight inputs */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Current Weight</label>
                <div className="flex rounded-lg bg-zinc-950 p-0.5 border border-zinc-800 text-[10px]">
                  <button
                    onClick={() => {
                      if (weightUnit === 'lbs') {
                        setUserWeight(Math.round(userWeight * 0.453592));
                        setWeightUnit('kg');
                      }
                    }}
                    className={`rounded px-2.5 py-1 font-bold ${weightUnit === 'kg' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}
                  >
                    KG
                  </button>
                  <button
                    onClick={() => {
                      if (weightUnit === 'kg') {
                        setUserWeight(Math.round(userWeight / 0.453592));
                        setWeightUnit('lbs');
                      }
                    }}
                    className={`rounded px-2.5 py-1 font-bold ${weightUnit === 'lbs' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}
                  >
                    LBS
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min={weightUnit === 'kg' ? '40' : '90'}
                  max={weightUnit === 'kg' ? '150' : '330'}
                  value={userWeight}
                  onChange={(e) => setUserWeight(Number(e.target.value))}
                  className="w-full accent-orange-500 h-1.5 rounded-lg bg-zinc-800 cursor-pointer"
                />
                <span className="text-sm font-mono font-bold text-white whitespace-nowrap min-w-[50px] text-right">
                  {userWeight} {weightUnit}
                </span>
              </div>
            </div>

            {/* Goal Choice */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Your Focus Goal</label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => setFitnessGoal('shred')}
                  className={`rounded-xl border p-3.5 text-left transition-all ${
                    fitnessGoal === 'shred'
                      ? 'border-orange-500 bg-orange-600/10 text-white'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider">Metabolic Shred</div>
                  <div className="text-[9px] opacity-60 mt-1">High Protein, low carb priority</div>
                </button>
                
                <button
                  onClick={() => setFitnessGoal('lean_bulk')}
                  className={`rounded-xl border p-3.5 text-left transition-all ${
                    fitnessGoal === 'lean_bulk'
                      ? 'border-orange-500 bg-orange-600/10 text-white'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider">Clean Bulk</div>
                  <div className="text-[9px] opacity-60 mt-1">Slight surplus, carb load</div>
                </button>

                <button
                  onClick={() => setFitnessGoal('competition')}
                  className={`rounded-xl border p-3.5 text-left transition-all ${
                    fitnessGoal === 'competition'
                      ? 'border-orange-500 bg-orange-600/10 text-white'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider">Heavy Prep</div>
                  <div className="text-[9px] opacity-60 mt-1">Maximum protein retention</div>
                </button>
              </div>
            </div>

            {/* Outputs display */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-5 mt-4 space-y-4">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-900 pb-3">
                <span>Calculated Optimal Macros</span>
                <span className="text-amber-400 font-mono text-sm">{estimatedCalories} kCal / Day</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-[#121212] rounded-xl p-3 border border-zinc-900">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Protein</div>
                  <div className="text-lg font-black text-white font-mono mt-1">{proteinGrams}g</div>
                  <div className="text-[9px] text-[#FF6600]/80 mt-0.5">Cellular repair</div>
                </div>
                
                <div className="bg-[#121212] rounded-xl p-3 border border-zinc-900">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Carbs</div>
                  <div className="text-lg font-black text-white font-mono mt-1">{carbsGrams}g</div>
                  <div className="text-[9px] text-[#00D2FF]/80 mt-0.5">Glycogen energy</div>
                </div>

                <div className="bg-[#121212] rounded-xl p-3 border border-zinc-900">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Fats</div>
                  <div className="text-lg font-black text-white font-mono mt-1">{fatsGrams}g</div>
                  <div className="text-[9px] text-emerald-400/80 mt-0.5">Hormone support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pro Tips Side Card */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-xl font-black uppercase tracking-wider text-white border-l-3 border-[#FF6600] pl-3.5">
            Elite Dietary Guidelines
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Unlocking athletic physical results is 70% about metabolic consistency. Our system focuses on raw amino acid supply, glycogen timing optimization, and cellular hydration.
          </p>

          <div className="space-y-4">
            {nutritionDietGuidelines.generalTips.map((tip, idx) => (
              <div key={idx} className="flex gap-4 p-4 rounded-xl border border-zinc-800 bg-[#121212] hover:border-zinc-700/60 transition-all">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-[#FF6600] flex-shrink-0 font-mono font-black border border-zinc-900">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">{tip.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Meal Plans Card Carousel */}
      <div className="space-y-6" id="nutrition-meals-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black uppercase tracking-wider text-white">Full-Day Performance Meal Protocols</h3>
            <p className="text-xs text-zinc-500">Standard curated templates designed by Dr. Elena Rostova.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#00D2FF] font-semibold border border-[#00D2FF]/20 bg-[#00D2FF]/5 px-3 py-1.5 rounded-full uppercase tracking-wider font-mono">
            <Sparkles className="h-3 w-3 animate-pulse" />
            Science Backed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {nutritionDietGuidelines.mealExamples.map((plan, idx) => (
            <div key={idx} className="rounded-2xl border border-zinc-800 bg-[#121212] overflow-hidden flex flex-col justify-between" id={`meal-plan-card-${idx}`}>
              <div className="p-5 sm:p-6 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
                <div>
                  <h4 className="font-black text-white uppercase tracking-wider">{plan.type}</h4>
                  <p className="text-[10px] text-zinc-500 mt-0.5 uppercase tracking-widest font-semibold">Elite standard daily blueprint</p>
                </div>
                <span className="rounded-lg bg-orange-600/10 border border-orange-500/20 px-3 py-1.5 text-xs font-black text-[#FF6600] font-mono">
                  {plan.proteinValue}
                </span>
              </div>
              
              <div className="p-5 sm:p-6 space-y-4 flex-grow">
                {plan.meals.map((meal, mIdx) => (
                  <div key={mIdx} className="flex gap-4 pb-4 border-b border-zinc-800/40 last:border-0 last:pb-0">
                    <div className="text-[11px] font-black uppercase tracking-wider text-[#00D2FF] whitespace-nowrap min-w-[70px] pt-0.5">
                      {meal.name.split(' ')[0]} {meal.name.split(' ')[1] || ''}
                    </div>
                    <div>
                      <p className="text-xs text-zinc-300 font-semibold leading-relaxed">
                        {meal.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 bg-zinc-950 text-[10px] text-zinc-500 leading-relaxed border-t border-zinc-800/40">
                Ensure meal gaps of around 3 to 4.5 hours depending on daily workouts. Supplements (BCAAs, Glutamine) are secondary to these real meal bases.
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
