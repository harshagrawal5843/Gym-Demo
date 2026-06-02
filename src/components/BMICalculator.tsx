import React, { useState, useEffect } from 'react';
import { Target, Calculator, Dumbbell, Compass, RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function BMICalculator() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState<number>(75); // kg or lbs
  const [height, setHeight] = useState<number>(175); // cm or inches
  
  // States for imperial specifically
  const [weightLbs, setWeightLbs] = useState<number>(165);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);

  const [bmi, setBmi] = useState<number>(24.5);
  const [category, setCategory] = useState<string>('Normal Weight');
  const [categoryColor, setCategoryColor] = useState<string>('text-green-400');
  const [borderColor, setBorderColor] = useState<string>('border-green-500/20');
  const [bgColor, setBgColor] = useState<string>('bg-green-500/5');

  useEffect(() => {
    let computedBmi = 0;
    if (unitSystem === 'metric') {
      const heightInMeters = height / 100;
      if (heightInMeters > 0) {
        computedBmi = weight / (heightInMeters * heightInMeters);
      }
    } else {
      const totalHeightInInches = (heightFt * 12) + heightIn;
      if (totalHeightInInches > 0) {
        computedBmi = (weightLbs / (totalHeightInInches * totalHeightInInches)) * 703;
      }
    }
    
    // Round to 1 decimal place
    const roundedBmi = Math.round(computedBmi * 10) / 10;
    setBmi(roundedBmi || 0);

    // Calculate category
    if (roundedBmi < 18.5) {
      setCategory('Underweight');
      setCategoryColor('text-[#00D2FF]');
      setBorderColor('border-[#00D2FF]/20');
      setBgColor('bg-[#00D2FF]/5');
    } else if (roundedBmi >= 18.5 && roundedBmi < 24.9) {
      setCategory('Normal (Optimal fitness range)');
      setCategoryColor('text-emerald-400');
      setBorderColor('border-emerald-500/20');
      setBgColor('bg-emerald-500/5');
    } else if (roundedBmi >= 25 && roundedBmi < 29.9) {
      setCategory('Overweight (Action suggested)');
      setCategoryColor('text-amber-400');
      setBorderColor('border-amber-500/20');
      setBgColor('bg-amber-500/5');
    } else {
      setCategory('Obese Class (Active support required)');
      setCategoryColor('text-rose-500');
      setBorderColor('border-rose-500/20');
      setBgColor('bg-rose-500/5');
    }
  }, [unitSystem, weight, height, weightLbs, heightFt, heightIn]);

  // Generate suggestions based on category
  const getSuggestions = () => {
    switch (category.split(' ')[0]) {
      case 'Underweight':
        return {
          focus: 'Hypertrophy & Skeletal Frame Building',
          calories: 'Caloric Surplus (+500 kCal above maintenance)',
          protein: '1.8 - 2.2g per kg of body weight',
          routine: 'Compound strength lifts (squats, deadlifts, chest press), 3-4 days a week. Rest limit 90s.',
          classes: ['Muscle Building Program', 'Strength Training Blueprint'],
          tips: ['Track liquid calories with rich nut shakes', 'Strictly limit high-rate cardiac exertion sessions to 15 mins']
        };
      case 'Normal':
        return {
          focus: 'Conditioning, Strength Base & Aesthetic Balance',
          calories: 'Euglycemic Maintenance / Recomposition targets',
          protein: '1.6 - 2.0g per kg of body weight',
          routine: 'Power-building split (combination of heavy powerlifting and modern hypertrophy). 4-5 days/week.',
          classes: ['WOD CrossFit', 'Athletic Speed & Conditioning', 'HIIT Epicenter'],
          tips: ['Implement weekly progression metrics to keep challenging tissue', 'Vary rep ranges between 5 to 15 reps']
        };
      case 'Overweight':
        return {
          focus: 'Metabolic Optimization & Resistance Co-coaching',
          calories: 'Controlled Deficit (-350 to -500 kCal)',
          protein: '2.0 - 2.2g per kg of body weight to safeguard muscle',
          routine: 'High Density lifting (supersets, minimal rest, active recovery circuits). 4 days of weights + 2 days cardiac.',
          classes: ['Weight Loss & Metabolic Recondition', 'Functional Core Alpha', 'HIIT Epicenter'],
          tips: ['Focus heavily on continuous hydration of 4 liters', 'Audit non-exercise activity thermogenesis (aim for 10,000 steps)']
        };
      default:
        return {
          focus: 'Metabolic Reconditioning & Body Mass De-escalation',
          calories: 'Healthy Medical Caloric Deficit (-500 to -800 kCal)',
          protein: '2.0g per kg of lean target mass',
          routine: 'Low-impact sustainable resistance loading, joint-safe functional routines. 3 days weights, 3 days low-impact walk.',
          classes: ['Weight Loss & Metabolic Recondition', 'Active Longevity & Senior Fitness'],
          tips: ['Prioritize joint-safe machines over high impact jumps', 'Ensure expert personal trainer supervision for optimal posture alignment']
        };
    }
  };

  const advice = getSuggestions();

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#121212] p-5 sm:p-8" id="bmi-calculator-wrapper">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600/10 text-[#FF6600]">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">Dynamic BMI Biomarker</h3>
          <p className="text-xs text-zinc-500">Calculate body mass index to unlock tailored program blueprints.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Unit Toggle Switches */}
          <div className="flex rounded-xl bg-zinc-950 p-1 border border-zinc-800/60">
            <button
              onClick={() => setUnitSystem('metric')}
              className={`flex-1 rounded-lg py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                unitSystem === 'metric' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Metric (KG/CM)
            </button>
            <button
              onClick={() => setUnitSystem('imperial')}
              className={`flex-1 rounded-lg py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                unitSystem === 'imperial' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Imperial (LBS/FT-IN)
            </button>
          </div>

          {/* Metric Inputs */}
          {unitSystem === 'metric' ? (
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Height: <span className="text-white font-mono">{height} cm</span></label>
                </div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full accent-orange-500 h-1.5 rounded-lg bg-zinc-800 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-600 font-mono mt-1">
                  <span>120 cm</span>
                  <span>170 cm</span>
                  <span>220 cm</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Weight: <span className="text-white font-mono">{weight} kg</span></label>
                </div>
                <input
                  type="range"
                  min="35"
                  max="160"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full accent-[#00D2FF] h-1.5 rounded-lg bg-zinc-800 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-600 font-mono mt-1">
                  <span>35 kg</span>
                  <span>97 kg</span>
                  <span>160 kg</span>
                </div>
              </div>
            </div>
          ) : (
            // Imperial Inputs
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Height (Feet)</label>
                  <select
                    value={heightFt}
                    onChange={(e) => setHeightFt(Number(e.target.value))}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 text-sm font-mono font-bold text-white outline-none focus:border-orange-500"
                  >
                    {[4, 5, 6, 7].map(ft => (
                      <option key={ft} value={ft}>{ft} Ft</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Height (Inches)</label>
                  <select
                    value={heightIn}
                    onChange={(e) => setHeightIn(Number(e.target.value))}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 text-sm font-mono font-bold text-white outline-none focus:border-orange-500"
                  >
                    {Array.from({ length: 12 }, (_, i) => i).map(inch => (
                      <option key={inch} value={inch}>{inch} In</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Weight: <span className="text-white font-mono">{weightLbs} lbs</span></label>
                </div>
                <input
                  type="range"
                  min="80"
                  max="350"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full accent-orange-500 h-1.5 rounded-lg bg-zinc-800 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-600 font-mono mt-1">
                  <span>80 lbs</span>
                  <span>215 lbs</span>
                  <span>350 lbs</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Info Box */}
          <div className="rounded-xl bg-zinc-950 border border-zinc-900 p-4 space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-zinc-400 font-medium">
              <Compass className="h-4 w-4 text-orange-500" />
              <span>Diagnostic Guideline Parameters</span>
            </div>
            <p className="text-zinc-500 leading-relaxed max-w-sm">
              Values based on standard clinical World Health Organization charts. BMI measurements are general proxies and can sometimes misclassify active competitors with substantial muscle density indices.
            </p>
          </div>
        </div>

        {/* Dynamic Display and Advice Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className={`rounded-2xl border ${borderColor} ${bgColor} p-6 h-full flex flex-col justify-between transition-all duration-300`}>
            
            {/* Calculation Output Bubble */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-zinc-800/50">
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                  {bmi}
                </div>
                <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold mt-1">Your Body Mass Index</div>
              </div>
              <div className="text-center sm:text-right">
                <span className={`inline-block rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-wider bg-zinc-950 ${categoryColor} border border-zinc-800`}>
                  {category}
                </span>
                <p className="text-[10px] text-zinc-500 mt-1.5 font-mono">Dynamic update triggered successfully</p>
              </div>
            </div>

            {/* Generated Recommendations Block */}
            <div className="space-y-4 pt-6 flex-grow">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#FF6600]">Tailored Blueprint Action Suggestions</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 bg-zinc-950 p-3.5 rounded-xl border border-zinc-900">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Training Target Focus</div>
                  <div className="text-xs font-black text-zinc-200 mt-1">{advice.focus}</div>
                </div>

                <div className="space-y-1 bg-zinc-950 p-3.5 rounded-xl border border-zinc-900">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Macronutrient Target</div>
                  <div className="text-xs font-black text-zinc-200 mt-1">{advice.protein}</div>
                </div>
              </div>

              <div className="space-y-1.5 bg-zinc-950 p-4 rounded-xl border border-zinc-900">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Dumbbell className="h-3 w-3 text-orange-500" />
                  Structured Routine
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-medium mt-1">
                  {advice.routine}
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Recommended Iron Forge Programs</div>
                <div className="flex flex-wrap gap-2">
                  {advice.classes.map((cls, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 rounded-full bg-orange-600/10 border border-orange-500/20 px-2.5 py-1 text-[10px] font-black uppercase text-[#FF6600]">
                      <CheckCircle2 className="h-3 w-3" />
                      {cls}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Master Coach Pro Tips</div>
                <ul className="space-y-1 text-xs">
                  {advice.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start text-zinc-400 leading-relaxed font-medium">
                      <span className="text-[#00D2FF] font-black mr-2 font-mono">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
