import { StatItem, Facility, PriceTier, DaySchedule, Trainer, Transformation, GalleryItem } from './types';

export const statsData: StatItem[] = [
  { id: '1', value: '4,500', numericValue: 4500, suffix: '+', label: 'Active Members' },
  { id: '2', value: '25', numericValue: 25, suffix: '+', label: 'Elite Coaches' },
  { id: '3', value: '1,200', numericValue: 1200, suffix: '+', label: 'Transformations' },
  { id: '4', value: '12', numericValue: 12, suffix: '+', label: 'Years of Legacy' }
];

export const facilitiesData: Facility[] = [
  {
    id: 'strength',
    title: 'Strength Zone',
    description: 'Equipped with bespoke Eleiko plates, premium Hammer Strength machines, and 5 Olympic lifting platforms.',
    imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop',
    metrics: '8000+ sq. ft | Custom Dumbbells up to 80kg'
  },
  {
    id: 'cardio',
    title: 'Cardio Suite',
    description: 'High-altitude simulation zones, curved Woodway treadmills, StairMasters, and Wattbikes with real-time telemetry analytics.',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    metrics: '40 Sky-View Stations | Matrix Tech'
  },
  {
    id: 'functional',
    title: 'Functional Training Area',
    description: 'A dedicated speed turf zone, kettlebells, battle ropes, plyo boxes, and custom multi-rings rigs for open movement training.',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    metrics: 'Sled Turf Track | TRX Suspensions'
  },
  {
    id: 'crossfit',
    title: 'CrossFit Box & Cage',
    description: 'Affiliated tier boxes with high ceilings, rogue rigging, gymnastic rings, rowing ergs, and heavy medicine ball target stations.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    metrics: 'Rogue Elite Authorized | Daily WODs'
  },
  {
    id: 'lockers',
    title: 'Premium Locker Rooms',
    description: 'Private personalized wooden self-locking keyless lockers, dynamic grooming tables, hair essentials, and freshly laundered Towel service.',
    imageUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=800&auto=format&fit=crop',
    metrics: 'Heated Benches | Bespoke Grooming Ample Spaces'
  },
  {
    id: 'showers',
    title: 'Luxury Showers & Wet Suite',
    description: 'Rainforest pressure-balanced showers, absolute privacy enclosures, high-end organic wash scents, cold plunge tubs, and eucalyptus steam rooms.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    metrics: 'Dry Sauna | Eucalyptus Steam Room | Cold Plunge'
  }
];

export const pricingPlans: PriceTier[] = [
  {
    name: 'Basic',
    monthlyPrice: 2499,
    quarterlyPrice: 6499,
    yearlyPrice: 22999,
    tagline: 'Access to world class gear & standard schedule.',
    popular: false,
    features: [
      'Unlimited Gym Access (Strength & Cardio Zones)',
      'Locker Room & High-speed Wi-Fi access',
      '1 Complimentary Body Composition Assessment',
      'Access to standard group training classes',
      'Free mobile app tracker integration'
    ]
  },
  {
    name: 'Pro',
    monthlyPrice: 3999,
    quarterlyPrice: 9999,
    yearlyPrice: 34999,
    tagline: 'Ideal for serious lifters seeking optimal results.',
    popular: true,
    features: [
      'All Basic features included',
      'Premium Zone Access (CrossFit & Recovery Suites)',
      '2 Sessions/Month with Elite Personal Coach',
      'Customized Diet & Nutrition Blueprint',
      'Access to premium masterclasses (Boxing, HIIT Elite)',
      'Dry Sauna & Cloud-towel service included'
    ]
  },
  {
    name: 'Elite',
    monthlyPrice: 6999,
    quarterlyPrice: 17999,
    yearlyPrice: 59999,
    tagline: 'Unrestricted state-of-the-art ultimate membership.',
    popular: false,
    features: [
      'All Pro features included',
      'Unlimited 1-on-1 Personal Elite Training',
      'VIP lounge access & organic pre-workout juice bar',
      'Weekly biomechanic & body-composition monitoring',
      'Private physical rehabilitation treatment sessions',
      'Custom Iron Forge kit bag & gym gear set',
      'Priority access to all international events & seminars'
    ]
  }
];

export const programsData = [
  {
    id: 'weight-loss',
    title: 'Weight Loss & Metabolic Recondition',
    description: 'Burn fat effectively while building lean athletic mass. Focuses on intensive zone heart-rate coaching and expert energy management.',
    intensity: 'High Intensity',
    benefits: ['Accelerated metabolic rate', 'Optimized cardiovascular health', 'Substantial visceral fat reduction'],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'muscle-building',
    title: 'Muscle Building & Hypertrophy',
    description: 'Scientific hypertrophy routines designed to break plateaus. Emphasizes structured progressive overload, form safety, and timing.',
    intensity: 'High Intensity / Strength',
    benefits: ['Maximum skeletal muscle mass', 'Enhanced structural joint support', 'Targeted aesthetic composition'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'strength-training',
    title: 'Strength Training Blueprint',
    description: 'Perfecting structural compound movements: bench, overhead press, squats and supplementary deadlifts. Built on periodized systems.',
    intensity: 'Extreme Intensity',
    benefits: ['Significant raw neuromuscular power', 'Improved absolute muscle fiber recruitment', 'Denser bone mineral preservation'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'powerlifting',
    title: 'Competitive Powerlifting Tier',
    description: 'Advanced optimization of the BIG three lift biomechanics. Engineered for peak personal power indices and structured safety under load.',
    intensity: 'Elite Intensity',
    benefits: ['Elite level mechanical leverage', 'Personal bench/squat/deadlift peaks', 'Competition stage readiness coaching'],
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'athletic-conditioning',
    title: 'Athletic Speed & Conditioning',
    description: 'Unleash elite functional athleticism. Focuses on explosive speed, rotational power, high agility metrics, and endurance thresholds.',
    intensity: 'Hyper Intensity',
    benefits: ['Explosive vertical jump & core power', 'Refined coordination & reflex response', 'Superior stamina thresholds'],
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'womens-fitness',
    title: "Women's Sculpt & Strength",
    description: 'A scientifically engineered training blueprint optimized for women’s hormonal profiles, bone preservation, and aesthetic sculpting goals.',
    intensity: 'Medium to High',
    benefits: ['Defined lower-body & posterior chain strength', 'Hormonal & stress balance support', 'Lean, muscular body contouring'],
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'senior-fitness',
    title: 'Active Longevity & Senior Fitness',
    description: 'Gentle resistant work focusing on preserving motor-unit activation, absolute physical balance, posture control, and joint comfort.',
    intensity: 'Controlled Gentle Intensity',
    benefits: ['Preservation of crucial bone density', 'Drastic reductions in autumn slip risks', 'Active daily living vigor and ease'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop'
  }
];

export const classesData = [
  { id: 'hiit', name: 'HIIT Epicenter', category: 'hiit', desc: 'Max heart-rate intervals that keep you incinerating calories for 24 hours post-session.', duration: '45 Mins', icon: 'zap' },
  { id: 'yoga', name: 'Iron Flow Zen Yoga', category: 'yoga', desc: 'Vinyasa flow merged with absolute posture stability. Focuses on intense core alignment and dynamic breathing.', duration: '60 Mins', icon: 'wind' },
  { id: 'zumba', name: 'Forge Rhythm Zumba', category: 'zumba', desc: 'High energy fast-paced cardio choreographies set to thumping motivational rhythms.', duration: '50 Mins', icon: 'flame' },
  { id: 'functional', name: 'Functional Core Alpha', category: 'functional', desc: 'Turf based kettlebell complexes, sled pulls, and multi-planar agility drills for practical power.', duration: '60 Mins', icon: 'combine' },
  { id: 'crossfit', name: 'WOD CrossFit', category: 'crossfit', desc: 'The Workout of the Day. Heavy compound lifts paired with gymnastic skills for ultimate physical validation.', duration: '45 Mins', icon: 'hammer' },
  { id: 'boxing', name: 'Heavy-Bag Strike Boxing', category: 'boxing', desc: 'Learn boxing footwork, tactical combinations, and core conditioning in a high-sweat ring format.', duration: '55 Mins', icon: 'swords' }
];

export const weeklyScheduleData: DaySchedule[] = [
  {
    day: 'Monday',
    classes: [
      { id: 'm1', name: 'HIIT Epicenter', time: '07:00 AM', trainer: 'Marcus Steel', category: 'hiit', intensity: 'High', duration: '45 Mins' },
      { id: 'm2', name: 'Functional Core Alpha', time: '09:00 AM', trainer: 'Sarah Phoenix', category: 'functional', intensity: 'Medium', duration: '60 Mins' },
      { id: 'm3', name: 'WOD CrossFit', time: '05:30 PM', trainer: 'Jax Mercer', category: 'crossfit', intensity: 'High', duration: '45 Mins' },
      { id: 'm4', name: 'Heavy-Bag Strike Boxing', time: '07:00 PM', trainer: 'Ivan Drago', category: 'boxing', intensity: 'High', duration: '55 Mins' },
    ]
  },
  {
    day: 'Tuesday',
    classes: [
      { id: 't1', name: 'Iron Flow Zen Yoga', time: '07:30 AM', trainer: 'Elena Rostova', category: 'yoga', intensity: 'Low', duration: '60 Mins' },
      { id: 't2', name: 'HIIT Epicenter', time: '10:00 AM', trainer: 'Marcus Steel', category: 'hiit', intensity: 'High', duration: '45 Mins' },
      { id: 't3', name: 'Forge Rhythm Zumba', time: '06:00 PM', trainer: 'Camila Diaz', category: 'zumba', intensity: 'Medium', duration: '50 Mins' },
      { id: 't4', name: 'WOD CrossFit', time: '07:15 PM', trainer: 'Jax Mercer', category: 'crossfit', intensity: 'High', duration: '45 Mins' },
    ]
  },
  {
    day: 'Wednesday',
    classes: [
      { id: 'w1', name: 'Functional Core Alpha', time: '07:00 AM', trainer: 'Sarah Phoenix', category: 'functional', intensity: 'Medium', duration: '60 Mins' },
      { id: 'w2', name: 'WOD CrossFit', time: '08:30 AM', trainer: 'Jax Mercer', category: 'crossfit', intensity: 'High', duration: '45 Mins' },
      { id: 'w3', name: 'Heavy-Bag Strike Boxing', time: '05:30 PM', trainer: 'Ivan Drago', category: 'boxing', intensity: 'High', duration: '55 Mins' },
      { id: 'w4', name: 'Iron Flow Zen Yoga', time: '07:00 PM', trainer: 'Elena Rostova', category: 'yoga', intensity: 'Low', duration: '60 Mins' },
    ]
  },
  {
    day: 'Thursday',
    classes: [
      { id: 'th1', name: 'HIIT Epicenter', time: '07:00 AM', trainer: 'Marcus Steel', category: 'hiit', intensity: 'High', duration: '45 Mins' },
      { id: 'th2', name: 'Forge Rhythm Zumba', time: '09:30 AM', trainer: 'Camila Diaz', category: 'zumba', intensity: 'Medium', duration: '50 Mins' },
      { id: 'th3', name: 'WOD CrossFit', time: '06:00 PM', trainer: 'Jax Mercer', category: 'crossfit', intensity: 'High', duration: '45 Mins' },
      { id: 'th4', name: 'Functional Core Alpha', time: '07:30 PM', trainer: 'Sarah Phoenix', category: 'functional', intensity: 'Medium', duration: '60 Mins' },
    ]
  },
  {
    day: 'Friday',
    classes: [
      { id: 'f1', name: 'Iron Flow Zen Yoga', time: '08:00 AM', trainer: 'Elena Rostova', category: 'yoga', intensity: 'Low', duration: '60 Mins' },
      { id: 'f2', name: 'Heavy-Bag Strike Boxing', time: '11:00 AM', trainer: 'Ivan Drago', category: 'boxing', intensity: 'High', duration: '55 Mins' },
      { id: 'f3', name: 'HIIT Epicenter', time: '05:30 PM', trainer: 'Marcus Steel', category: 'hiit', intensity: 'High', duration: '45 Mins' },
      { id: 'f4', name: 'WOD CrossFit', time: '07:00 PM', trainer: 'Jax Mercer', category: 'crossfit', intensity: 'High', duration: '45 Mins' },
    ]
  },
  {
    day: 'Saturday',
    classes: [
      { id: 'sa1', name: 'WOD CrossFit', time: '09:00 AM', trainer: 'Jax Mercer', category: 'crossfit', intensity: 'High', duration: '45 Mins' },
      { id: 'sa2', name: 'Heavy-Bag Strike Boxing', time: '10:30 AM', trainer: 'Ivan Drago', category: 'boxing', intensity: 'High', duration: '55 Mins' },
      { id: 'sa3', name: 'Forge Rhythm Zumba', time: '04:00 PM', trainer: 'Camila Diaz', category: 'zumba', intensity: 'Medium', duration: '50 Mins' },
      { id: 'sa4', name: 'Iron Flow Zen Yoga', time: '05:30 PM', trainer: 'Elena Rostova', category: 'yoga', intensity: 'Low', duration: '60 Mins' },
    ]
  },
  {
    day: 'Sunday',
    classes: [
      { id: 'su1', name: 'Functional Core Alpha', time: '10:00 AM', trainer: 'Sarah Phoenix', category: 'functional', intensity: 'Medium', duration: '60 Mins' },
      { id: 'su2', name: 'HIIT Epicenter', time: '11:30 AM', trainer: 'Marcus Steel', category: 'hiit', intensity: 'High', duration: '45 Mins' },
      { id: 'su3', name: 'WOD CrossFit', time: '04:00 PM', trainer: 'Jax Mercer', category: 'crossfit', intensity: 'High', duration: '45 Mins' },
    ]
  }
];

export const trainersData: Trainer[] = [
  {
    id: 'marcus-steel',
    name: 'Marcus Steel',
    role: 'Strength & Conditioning Head Coach',
    category: 'strength',
    photoUrl: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600&auto=format&fit=crop',
    certifications: ['CSCS *D (NSCA)', 'USA Weightlifting L1', 'B.Sc Exercise Science'],
    experience: '12 Years',
    specialization: ['Olympic Lifting', 'Maximum Force Optimization', 'Pro Athlete Conditioning'],
    successMetric: '200+ Competitors Prepped',
    quote: 'Your mind breaks way before your muscle fiber does. Force the threshold.'
  },
  {
    id: 'sarah-phoenix',
    name: 'Sarah Phoenix',
    role: 'Senior Weight Loss Specialist',
    category: 'weight_loss',
    photoUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop',
    certifications: ['NASM Certified Personal Trainer', 'FMS Level 2 Specialist', 'Precision Nutrition L1'],
    experience: '8 Years',
    specialization: ['Metabolic Acceleration', 'Hormonal Fat Regulation', 'Body Tone Symmetry'],
    successMetric: '3,200kg Cumulative Visceral Fat Lost',
    quote: 'Sustainable fat loss is a masterclass in patient progressive actions, not starvation.'
  },
  {
    id: 'jax-mercer',
    name: 'Jax Mercer',
    role: 'Head CrossFit Coach & Agility Expert',
    category: 'functional',
    photoUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600&auto=format&fit=crop',
    certifications: ['CrossFit Level-3 Coach', 'Gymnastics Specialty Trainer', 'IKFF Girevoy Kettlebell Specialist'],
    experience: '7 Years',
    specialization: ['Gymnastics High Rings', 'Complex Sled Conditioning', 'Anaerobic Enduro Workouts'],
    successMetric: '80+ CrossFit Competitors Coached',
    quote: 'The true measure of structural fitness is how comfortably you transfer energy across planes.'
  },
  {
    id: 'elena-rostova',
    name: 'Dr. Elena Rostova',
    role: 'Nutrition Advisor & Biomechanist',
    category: 'nutrition',
    photoUrl: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop',
    certifications: ['Ph.D Human Nutrition & Biomechanics', 'RDN (Registered Dietitian)', 'ISSA Master Trainer'],
    experience: '10 Years',
    specialization: ['Custom Macronutrient Strategies', 'Endocrine Joint Recovery Nutrition', 'Pro Hypertrophy Diets'],
    successMetric: '400+ Complete Diet Protocols Designed',
    quote: 'Muscle tissue is forged in the gym, but it is strictly materialized and repaired in the kitchen.'
  },
  {
    id: 'ivan-drago',
    name: 'Ivan Drago',
    role: 'Combat & Conditioning Specialist',
    category: 'functional',
    photoUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=600&auto=format&fit=crop',
    certifications: ['Former Cruiserweight Medalist', 'WBA Conditioning Cert', 'NASM-PES Specialist'],
    experience: '15 Years',
    specialization: ['Rotational Punch Power', 'High Intensity Cage Cardio', 'Fighter Core Endurance'],
    successMetric: '15 National Boxers Conditioned',
    quote: 'We use the heavy bag not to hit, but to challenge and condition gravity itself.'
  },
  {
    id: 'camila-diaz',
    name: 'Camila Diaz',
    role: 'High Energy Instructor & Women Fitness Lead',
    category: 'weight_loss',
    photoUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
    certifications: ['AFAA Certified Group Fitness', 'Zumba Pro Authorized', 'ACE Orthopedic Exercise Specialist'],
    experience: '6 Years',
    specialization: ['Dynamic Low-impact Sculpting', 'Athletic Choreography', 'Post-Rehab Structural Recovery'],
    successMetric: '500+ Female Transformations Facilitated',
    quote: 'Movement is a celebration of what your body can construct. Never make it a punishment.'
  }
];

export const transformationsData: Transformation[] = [
  {
    id: '1',
    name: 'Rohit Sharma',
    age: 28,
    goal: 'Muscle Hypertrophy & Fat Loss',
    beforeImg: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=400&auto=format&fit=crop', // Stock focus showing stomach or soft composition
    afterImg: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&auto=format&fit=crop',  // Stock showing lean physical build
    beforeWeight: '94 kg',
    afterWeight: '78 kg',
    duration: '16 Weeks',
    story: 'Rohit was a software architect working 12 hours a day. Under the "Pro" program, we optimized his metabolic profile, focused heavily on compound strength training, and adjusted his diet to support high cognitive output while losing fat.'
  },
  {
    id: '2',
    name: 'Ananya Goel',
    age: 33,
    goal: 'Posture Symmetry & Athléticism',
    beforeImg: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=400&auto=format&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=400&auto=format&fit=crop',
    beforeWeight: '72 kg',
    afterWeight: '61 kg',
    duration: '12 Weeks',
    story: 'Suffering from chronic lower back tension, Ananya joined the functional conditioning path. Corrective exercise alongside consistent resistance work sculpted her midsection and permanently cured her pelvic tilt.'
  },
  {
    id: '3',
    name: 'Vikram Singh',
    age: 24,
    goal: 'Powerlifting Base & Clean Bulk',
    beforeImg: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=400&auto=format&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1111111111111?q=0&w=0', // Not used, slider replacement content is custom designed
    beforeWeight: '64 kg',
    afterWeight: '79 kg',
    duration: '24 Weeks',
    story: 'Vikram had a fast metabolism and struggled with weight-gain. Marcus designed a heavy multi-joint periodization program. He went from a 70kg squat to 160kg, adding massive thickness across his shoulders and frame.'
  }
];

export const galleryItemsData: GalleryItem[] = [
  { id: 'g1', imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000', category: 'interior', title: 'Main Elite Weightlifting Deck' },
  { id: 'g2', imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000', category: 'equipment', title: 'Eleiko Competition Bars & Chrome Plates' },
  { id: 'g3', imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000', category: 'classes', title: 'HIIT Epicenter Interval Session' },
  { id: 'g4', imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000', category: 'members', title: 'Member Squat Success Moment' },
  { id: 'g5', imageUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1000', category: 'interior', title: 'Luxury Ambient Grooming Suite' },
  { id: 'g6', imageUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1000', category: 'classes', title: 'Strike Boxing Masterclass' },
  { id: 'g7', imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000', category: 'equipment', title: 'Premium Hammer Strength Selection' },
  { id: 'g8', imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000', category: 'events', title: 'Annual Iron Forge Internal Deadlift Duel' }
];

// Rich Diet guidelines & sample plans
export const nutritionDietGuidelines = {
  proteinGoalCalculatorGuide: 'The optimal daily protein intake for active lifters ranges from 1.6 to 2.2 grams per kilogram of lean body weight.',
  mealExamples: [
    {
      type: 'Lean Hypertrophy Target',
      proteinValue: '48g Protein',
      meals: [
        { name: 'Meal 1 (Breakfast)', detail: '4 Egg Whites + 2 Whole Eggs scrambled with baby spinach, 1 cup cooked oats with handful of almonds.' },
        { name: 'Meal 2 (Lunch)', detail: '200g Grilled Chicken Breast, 150g steamed Basmati rice, seasoned broccoli and virgin olive oil.' },
        { name: 'Meal 3 (Post-Workout)', detail: '1 scoop Grass-Fed Whey Protein Isolate blended with 1 ripe banana and 250ml pure almond milk.' },
        { name: 'Meal 4 (Dinner)', detail: '180g Baked Salmon fillet, roasted sweet potato wedges, and mixed organic leaf salad greens.' }
      ]
    },
    {
      type: 'Structured Metabolic Shred',
      proteinValue: '42g Protein',
      meals: [
        { name: 'Meal 1 (Breakfast)', detail: 'Egg white omelet (5 whites) with diced bell peppers and mushrooms, half an avocado.' },
        { name: 'Meal 2 (Lunch)', detail: '180g Baked White Fish (Tilapia/Cod), sautéed asparagus clubs, and 80g boiled brown quinoa.' },
        { name: 'Meal 3 (Snack)', detail: '200g low-fat unsweetened Greek Yogurt topped with sugar-free organic blueberries.' },
        { name: 'Meal 4 (Dinner)', detail: '150g extra-lean minced Turkey stir-fry with zucchini noodles, cauliflower rice, and coconut oil.' }
      ]
    }
  ],
  generalTips: [
    { title: 'Prioritize Whole Foods', desc: '90% of your macro targets should come from Single-Ingredient foods like poultry, fish, eggs, rice, sweet potatoes, and green cruciferous vegetables.' },
    { title: 'Hydration Strategy', desc: 'Active training states demand 3.5 to 4.5 liters of clean water daily. Hydration dictates muscle-cell volume and overall joint lubrication.' },
    { title: 'Pre & Post Timing', desc: 'Ingest simple fast-digesting carbohydrates 45 mins before lifting to saturate muscle glycogen, and lean protein with carbs within 60 mins post-session to initiate tissue recovery.' }
  ]
};
