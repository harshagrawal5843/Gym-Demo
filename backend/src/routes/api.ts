import { Router, Request, Response } from 'express';
import { Plan, Trainer, TrialBooking, ContactSubmission, GalleryItem, ContactInfo } from '../models/Schemas';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// Create transporter lazily so env vars are guaranteed to be loaded
const getMailer = () => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// --- FILE UPLOAD (Multer) ---
const uploadsDir = path.join(__dirname, '../../../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

// POST /api/upload
router.post('/upload', upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) { res.status(400).json({ error: 'No image file provided' }); return; }
  const url = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ url, filename: req.file.filename });
});

// DELETE /api/upload/:filename
router.delete('/upload/:filename', (req: Request, res: Response) => {
  const filePath = path.join(uploadsDir, req.params.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// Default Seeding Data
const initialPlans = [
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
      'Custom Fitex Gym kit bag & gym gear set',
      'Priority access to all international events & seminars'
    ]
  }
];

const initialCoaches = [
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
    photoUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop',
    certifications: ['AFAA Certified Group Fitness', 'Zumba Pro Authorized', 'ACE Orthopedic Exercise Specialist'],
    experience: '6 Years',
    specialization: ['Dynamic Low-impact Sculpting', 'Athletic Choreography', 'Post-Rehab Structural Recovery'],
    successMetric: '500+ Female Transformations Facilitated',
    quote: 'Movement is a celebration of what your body can construct. Never make it a punishment.'
  }
];

const initialGallery = [
  { id: 'g1', imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000', category: 'interior', title: 'Main Elite Weightlifting Deck' },
  { id: 'g2', imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000', category: 'equipment', title: 'Eleiko Competition Bars & Chrome Plates' },
  { id: 'g3', imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000', category: 'classes', title: 'HIIT Epicenter Interval Session' },
  { id: 'g4', imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000', category: 'members', title: 'Member Squat Success Moment' },
  { id: 'g5', imageUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1000', category: 'interior', title: 'Luxury Ambient Grooming Suite' },
  { id: 'g6', imageUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1000', category: 'classes', title: 'Strike Boxing Masterclass' },
  { id: 'g7', imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000', category: 'equipment', title: 'Premium Hammer Strength Selection' },
  { id: 'g8', imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000', category: 'events', title: 'Annual Fitex Gym Internal Deadlift Duel' }
];

const defaultContact = {
  address: "Link Road, Birgunj, Nepal - 44300",
  phone: "+977 51-523456",
  email: "birgunj@fitex.com",
  mapEmbedUrl: "https://maps.google.com/maps?q=Birgunj%20Nepal&t=&z=14&ie=UTF8&iwloc=&output=embed"
};

// Seed route helper
const runSeed = async () => {
  await Plan.deleteMany({});
  await Plan.insertMany(initialPlans);

  await Trainer.deleteMany({});
  await Trainer.insertMany(initialCoaches);

  await GalleryItem.deleteMany({});
  await GalleryItem.insertMany(initialGallery);

  await ContactInfo.deleteMany({});
  await ContactInfo.create(defaultContact);

  await TrialBooking.deleteMany({});
  await ContactSubmission.deleteMany({});
};

// Seed DB Route
router.post('/seed', async (req: Request, res: Response) => {
  try {
    await runSeed();
    res.json({ message: 'Database successfully seeded!' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Reset DB Route (Clears bookings/submissions and sets defaults)
router.post('/reset', async (req: Request, res: Response) => {
  try {
    await runSeed();
    res.json({ message: 'Database successfully reset!' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- PLANS ---
router.get('/plans', async (req: Request, res: Response) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/plans', async (req: Request, res: Response) => {
  try {
    const { name, monthlyPrice, quarterlyPrice, yearlyPrice, features, popular, tagline } = req.body;
    const plan = await Plan.findOneAndUpdate(
      { name },
      { monthlyPrice, quarterlyPrice, yearlyPrice, features, popular, tagline },
      { new: true, runValidators: true }
    );
    res.json(plan);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- TRAINERS (COACHES) ---
router.get('/coaches', async (req: Request, res: Response) => {
  try {
    const coaches = await Trainer.find();
    res.json(coaches);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/coaches', async (req: Request, res: Response) => {
  try {
    const coachData = { ...req.body, id: `coach-${Date.now()}` };
    const coach = await Trainer.create(coachData);
    res.json(coach);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/coaches/:id', async (req: Request, res: Response) => {
  try {
    const coach = await Trainer.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(coach);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/coaches/:id', async (req: Request, res: Response) => {
  try {
    await Trainer.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'Coach deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- GALLERY ---
router.get('/gallery', async (req: Request, res: Response) => {
  try {
    const items = await GalleryItem.find();
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/gallery', async (req: Request, res: Response) => {
  try {
    const itemData = { ...req.body, id: `gallery-${Date.now()}` };
    const item = await GalleryItem.create(itemData);
    res.json(item);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/gallery/:id', async (req: Request, res: Response) => {
  try {
    await GalleryItem.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- BOOKINGS (TRIALS) ---
router.get('/bookings', async (req: Request, res: Response) => {
  try {
    const bookings = await TrialBooking.find().sort({ _id: -1 });
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/bookings', async (req: Request, res: Response) => {
  try {
    const bookingData = {
      ...req.body,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toLocaleString()
    };
    const booking = await TrialBooking.create(bookingData);
    res.json(booking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- CONTACT SUBMISSIONS ---
router.get('/contacts', async (req: Request, res: Response) => {
  try {
    const submissions = await ContactSubmission.find().sort({ _id: -1 });
    res.json(submissions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/contacts', async (req: Request, res: Response) => {
  try {
    const submissionData = {
      ...req.body,
      id: `contact-${Date.now()}`,
      createdAt: new Date().toLocaleString()
    };
    const submission = await ContactSubmission.create(submissionData);

    // Send email notification to owner
    const { name, email, subject, message } = req.body;
    const topicLabels: Record<string, string> = {
      membership_inquiry: 'Membership Inquiry',
      personal_coaching: 'Elite Coaching Assignment',
      corporate_inquiry: 'Corporate Wellness Pass',
      support_billing: 'Billing & Frozen Status',
    };
    const topicLabel = topicLabels[subject] || subject || 'General Inquiry';

    try {
      await getMailer().sendMail({
        from: `"Fitex Gym Contact Form" <${process.env.GMAIL_USER}>`,
        to: process.env.OWNER_EMAIL,
        replyTo: email,
        subject: `[Fitex Gym] New Message: ${topicLabel}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background: #FF6600; padding: 24px;">
              <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 1px;">FITEX GYM</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 13px;">New contact form submission</p>
            </div>
            <div style="padding: 24px; background: #ffffff;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 8px 0; color: #888; width: 100px;"><strong>Name</strong></td><td style="padding: 8px 0; color: #222;">${name}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #FF6600;">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #888;"><strong>Topic</strong></td><td style="padding: 8px 0; color: #222;">${topicLabel}</td></tr>
              </table>
              <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
              <p style="color: #888; font-size: 12px; margin: 0 0 8px;"><strong>Message:</strong></p>
              <p style="color: #222; font-size: 14px; line-height: 1.6; background: #f9f9f9; padding: 16px; border-left: 4px solid #FF6600; margin: 0;">${message.replace(/\n/g, '<br/>')}</p>
            </div>
            <div style="background: #f5f5f5; padding: 14px 24px; font-size: 11px; color: #aaa;">
              Submitted at: ${new Date().toLocaleString()} &mdash; Fitex Gym, Birgunj, Nepal
            </div>
          </div>
        `,
      });
    } catch (mailError) {
      // Email failure should not block the API response
      console.error('Email send error:', mailError);
    }

    res.json(submission);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- CONTACT INFO ---
router.get('/contact-info', async (req: Request, res: Response) => {
  try {
    let info = await ContactInfo.findOne();
    if (!info) {
      info = await ContactInfo.create(defaultContact);
    }
    res.json(info);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/contact-info', async (req: Request, res: Response) => {
  try {
    let info = await ContactInfo.findOne();
    if (!info) {
      info = await ContactInfo.create(req.body);
    } else {
      info.address = req.body.address;
      info.phone = req.body.phone;
      info.email = req.body.email;
      info.mapEmbedUrl = req.body.mapEmbedUrl;
      await info.save();
    }
    res.json(info);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
