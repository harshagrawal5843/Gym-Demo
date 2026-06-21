"use client";

import React, { useState, useEffect } from 'react';
import { PageType, Trainer, PriceTier, GalleryItem } from '../types';
import { useGym } from '../context/GymContext';
import { 
  Users, UserCheck, CreditCard, ShieldAlert, Sparkles, Plus, Trash2, Edit2, 
  RotateCcw, LogOut, Phone, Mail, Calendar, Clock, Image as ImageIcon, MapPin, 
  Globe, Info 
} from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  setCurrentPage: (page: PageType) => void;
}

type TabType = 'bookings' | 'coaches' | 'plans' | 'gallery' | 'info' | 'dev';

export default function Dashboard({ setCurrentPage }: DashboardProps) {
  const { 
    currentUser, logout, trialBookings, coaches, membershipPlans, galleryItems, contactInfo,
    addCoach, updateCoach, deleteCoach, updateMembershipPlan, addGalleryItem, deleteGalleryItem,
    updateContactInfo, resetDatabase 
  } = useGym();

  const [activeTab, setActiveTab] = useState<TabType>('bookings');
  
  // Coaches Form States
  const [editingCoach, setEditingCoach] = useState<Trainer | null>(null);
  const [isAddingCoach, setIsAddingCoach] = useState(false);
  const [coachForm, setCoachForm] = useState<Omit<Trainer, 'id'>>({
    name: '',
    role: '',
    category: 'strength',
    photoUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=400',
    certifications: ['IFBB Pro Certified', 'CPR/AED Standard'],
    experience: '5 Years',
    specialization: ['Hypertrophy', 'Biomechanics'],
    successMetric: '100+ Lifts Upgraded',
    quote: 'Forge your physique with relentless intensity.'
  });

  // Plans Form State
  const [editingPlan, setEditingPlan] = useState<PriceTier | null>(null);

  // Gallery Form State
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [photoForm, setPhotoForm] = useState<Omit<GalleryItem, 'id'>>({
    imageUrl: '',
    category: 'interior',
    title: ''
  });
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    address: contactInfo.address,
    phone: contactInfo.phone,
    email: contactInfo.email,
    mapEmbedUrl: contactInfo.mapEmbedUrl || ''
  });

  useEffect(() => {
    setContactForm({
      address: contactInfo.address,
      phone: contactInfo.phone,
      email: contactInfo.email,
      mapEmbedUrl: contactInfo.mapEmbedUrl || ''
    });
  }, [contactInfo]);

  // Auto redirect if not logged in
  if (!currentUser) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-6">
        <ShieldAlert className="h-12 w-12 text-rose-500 animate-bounce" />
        <h2 className="text-xl font-black uppercase text-white">Unauthorized Access</h2>
        <button 
          onClick={() => setCurrentPage('login')}
          className="px-6 py-2.5 bg-[#FF6600] text-white text-xs font-bold uppercase tracking-wider"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleLogoutClick = () => {
    logout();
    setCurrentPage('home');
  };

  const handleSaveCoach = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCoach) {
      updateCoach({ ...editingCoach, ...coachForm });
      setEditingCoach(null);
    } else if (isAddingCoach) {
      addCoach(coachForm);
      setIsAddingCoach(false);
    }
  };

  const handleStartEditCoach = (coach: Trainer) => {
    setEditingCoach(coach);
    setIsAddingCoach(false);
    setCoachForm({
      name: coach.name,
      role: coach.role,
      category: coach.category,
      photoUrl: coach.photoUrl,
      certifications: coach.certifications,
      experience: coach.experience,
      specialization: coach.specialization,
      successMetric: coach.successMetric,
      quote: coach.quote
    });
  };

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPlan) {
      updateMembershipPlan(editingPlan);
      setEditingPlan(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setUploadError(null);
  };

  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) { setUploadError('Please select an image file.'); return; }
    if (!photoForm.title) { setUploadError('Please enter a title.'); return; }
    setUploadingPhoto(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiBase}/upload`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      addGalleryItem({ ...photoForm, imageUrl: data.url });
      setIsAddingPhoto(false);
      setPhotoForm({ imageUrl: '', category: 'interior', title: '' });
      setSelectedFile(null);
      setPhotoPreview(null);
    } catch (err) {
      setUploadError('Upload failed. Make sure the backend is running.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleDeletePhoto = async (item: GalleryItem) => {
    // Try to delete the file from backend if it's a local upload
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    if (item.imageUrl.includes('/uploads/')) {
      const filename = item.imageUrl.split('/uploads/')[1];
      try {
        await fetch(`${apiBase}/upload/${filename}`, { method: 'DELETE' });
      } catch (_) {}
    }
    deleteGalleryItem(item.id);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactInfo(contactForm);
    alert('Contact coordinates updated dynamically!');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 font-sans space-y-8">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6" id="dashboard-header-bar">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              SYSTEM ONLINE
            </span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
              Role: {currentUser.role === 'developer' ? 'Super Developer' : 'Gym Owner'}
            </span>
          </div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tighter mt-1">
            Fitex Administrative Workspace
          </h1>
        </div>
        <button
          onClick={handleLogoutClick}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-widest transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Terminate Session
        </button>
      </div>

      {/* Tabs list */}
      <div className="flex flex-wrap gap-2.5" id="dashboard-tabs">
        <button
          onClick={() => { setActiveTab('bookings'); setEditingCoach(null); setIsAddingCoach(false); setEditingPlan(null); }}
          className={`flex items-center gap-2 px-5 py-3 border text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === 'bookings'
              ? 'border-[#FF6600] bg-[#FF6600]/10 text-white'
              : 'border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Users className="h-4 w-4" />
          Trial Passes ({trialBookings.length})
        </button>
        <button
          onClick={() => { setActiveTab('coaches'); setEditingCoach(null); setIsAddingCoach(false); setEditingPlan(null); }}
          className={`flex items-center gap-2 px-5 py-3 border text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === 'coaches'
              ? 'border-[#FF6600] bg-[#FF6600]/10 text-white'
              : 'border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <UserCheck className="h-4 w-4" />
          Coaches Database ({coaches.length})
        </button>
        <button
          onClick={() => { setActiveTab('plans'); setEditingCoach(null); setIsAddingCoach(false); setEditingPlan(null); }}
          className={`flex items-center gap-2 px-5 py-3 border text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === 'plans'
              ? 'border-[#FF6600] bg-[#FF6600]/10 text-white'
              : 'border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <CreditCard className="h-4 w-4" />
          Membership Setup
        </button>
        <button
          onClick={() => { setActiveTab('gallery'); setEditingCoach(null); setIsAddingCoach(false); setEditingPlan(null); }}
          className={`flex items-center gap-2 px-5 py-3 border text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === 'gallery'
              ? 'border-[#FF6600] bg-[#FF6600]/10 text-white'
              : 'border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <ImageIcon className="h-4 w-4" />
          Gallery Manager ({galleryItems.length})
        </button>
        <button
          onClick={() => { setActiveTab('info'); setEditingCoach(null); setIsAddingCoach(false); setEditingPlan(null); }}
          className={`flex items-center gap-2 px-5 py-3 border text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === 'info'
              ? 'border-[#FF6600] bg-[#FF6600]/10 text-white'
              : 'border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Info className="h-4 w-4" />
          Club Info
        </button>

        {currentUser.role === 'developer' && (
          <button
            onClick={() => { setActiveTab('dev'); setEditingCoach(null); setIsAddingCoach(false); setEditingPlan(null); }}
            className={`flex items-center gap-2 px-5 py-3 border text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'dev'
                ? 'border-orange-500 bg-orange-500/10 text-white'
                : 'border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Developer Console
          </button>
        )}
      </div>

      {/* Main Workspace content */}
      <div className="bg-[#111] border border-white/10 p-6 relative min-h-[500px]" id="dashboard-viewport">
        
        {/* TAB 1: TRIAL BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <h2 className="text-lg font-black uppercase text-white tracking-widest">Active Day Pass Registrations</h2>
              <span className="text-xs font-bold text-zinc-500">Live lead ingestion</span>
            </div>
            {trialBookings.length === 0 ? (
              <div className="py-20 text-center text-zinc-500 space-y-3">
                <Users className="h-10 w-10 mx-auto opacity-30 text-[#FF6600]" />
                <p className="text-sm font-semibold uppercase tracking-wider">No trial pass entries registered yet.</p>
                <p className="text-xs text-zinc-600 max-w-sm mx-auto">Active client bookings show up here instantly once filled.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-zinc-400 font-black uppercase tracking-wider">
                      <th className="py-4 px-4">Leads Name</th>
                      <th className="py-4 px-4">Pass ID</th>
                      <th className="py-4 px-4">Target Goal</th>
                      <th className="py-4 px-4">Slot</th>
                      <th className="py-4 px-4">Schedule Day</th>
                      <th className="py-4 px-4">Contact</th>
                      <th className="py-4 px-4">Registered Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-zinc-300 font-semibold">
                    {trialBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-4 text-white font-black">{b.name}</td>
                        <td className="py-4 px-4"><span className="font-mono text-[#FF6600]">{b.voucherId}</span></td>
                        <td className="py-4 px-4 capitalize">{b.goal.replace('_', ' ')}</td>
                        <td className="py-4 px-4 capitalize">{b.preferredTime.replace('_', ' ')}</td>
                        <td className="py-4 px-4">{b.selectedDay}</td>
                        <td className="py-4 px-4 space-y-1">
                          <div className="flex items-center gap-1"><Phone className="h-3 w-3 text-zinc-500" /> {b.phone}</div>
                          <div className="flex items-center gap-1 text-[11px] text-zinc-400"><Mail className="h-3 w-3 text-zinc-500" /> {b.email}</div>
                        </td>
                        <td className="py-4 px-4 text-zinc-500">{b.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: COACHES MANAGEMENT */}
        {activeTab === 'coaches' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <h2 className="text-lg font-black uppercase text-white tracking-widest">Gym Coaches Registry</h2>
              {!isAddingCoach && !editingCoach && (
                <button
                  onClick={() => setIsAddingCoach(true)}
                  className="flex items-center gap-1.5 px-4.5 py-2 bg-[#FF6600] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#cc5200] cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  Add Coach
                </button>
              )}
            </div>

            {(isAddingCoach || editingCoach) ? (
              <form onSubmit={handleSaveCoach} className="bg-black/30 border border-white/10 p-6 space-y-5">
                <h3 className="text-sm font-black uppercase text-white tracking-wider">
                  {editingCoach ? `Modify Coach: ${editingCoach.name}` : 'Register New Professional Coach'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={coachForm.name}
                      onChange={(e) => setCoachForm({ ...coachForm, name: e.target.value })}
                      className="w-full bg-[#151515] border border-white/10 px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Professional Role / Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Master Biomechanics Specialist"
                      value={coachForm.role}
                      onChange={(e) => setCoachForm({ ...coachForm, role: e.target.value })}
                      className="w-full bg-[#151515] border border-white/10 px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Category</label>
                    <select
                      value={coachForm.category}
                      onChange={(e: any) => setCoachForm({ ...coachForm, category: e.target.value })}
                      className="w-full bg-[#151515] border border-white/10 px-4 py-2.5 text-xs text-white"
                    >
                      <option value="strength">Strength Zone</option>
                      <option value="weight_loss">Weight Loss</option>
                      <option value="nutrition">Nutrition</option>
                      <option value="functional">Functional Training</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Experience Level</label>
                    <input
                      type="text"
                      required
                      value={coachForm.experience}
                      onChange={(e) => setCoachForm({ ...coachForm, experience: e.target.value })}
                      className="w-full bg-[#151515] border border-white/10 px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Photo URL</label>
                    <input
                      type="text"
                      required
                      value={coachForm.photoUrl}
                      onChange={(e) => setCoachForm({ ...coachForm, photoUrl: e.target.value })}
                      className="w-full bg-[#151515] border border-white/10 px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Career Success Metric</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 100+ Gains Unlocked"
                      value={coachForm.successMetric}
                      onChange={(e) => setCoachForm({ ...coachForm, successMetric: e.target.value })}
                      className="w-full bg-[#151515] border border-white/10 px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <button type="submit" className="px-5 py-2.5 bg-[#FF6600] text-white text-xs font-black uppercase tracking-widest cursor-pointer">
                    Commit Coach Details
                  </button>
                  <button type="button" onClick={() => { setIsAddingCoach(false); setEditingCoach(null); }} className="px-5 py-2.5 bg-zinc-800 text-zinc-300 text-xs font-black uppercase tracking-widest hover:bg-zinc-700 cursor-pointer">
                    Cancel Action
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coaches.map((c) => (
                  <div key={c.id} className="p-4 bg-black/20 border border-white/5 flex gap-4 items-start relative justify-between">
                    <div className="flex gap-4">
                      <img src={c.photoUrl} alt={c.name} className="w-16 h-16 object-cover border border-white/10" />
                      <div className="space-y-1">
                        <span className="inline-block px-1.5 py-0.5 text-[8px] bg-[#FF6600]/10 text-[#FF6600] font-bold uppercase tracking-wider">
                          {c.category.replace('_', ' ')}
                        </span>
                        <h4 className="text-sm font-black uppercase text-white">{c.name}</h4>
                        <p className="text-xs text-zinc-400">{c.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => handleStartEditCoach(c)} className="p-2 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all cursor-pointer">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => deleteCoach(c.id)} className="p-2 border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MEMBERSHIPS SETUP */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <h2 className="text-lg font-black uppercase text-white tracking-widest">Configure Pricing plans</h2>
            </div>
            {editingPlan ? (
              <form onSubmit={handleSavePlan} className="bg-black/30 border border-white/10 p-6 space-y-5">
                <h3 className="text-sm font-black uppercase text-white tracking-wider">Modify {editingPlan.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Monthly Pricing</label>
                    <input
                      type="number"
                      required
                      value={editingPlan.monthlyPrice}
                      onChange={(e) => setEditingPlan({ ...editingPlan, monthlyPrice: parseInt(e.target.value) || 0 })}
                      className="w-full bg-[#151515] border border-white/10 px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Quarterly Pricing</label>
                    <input
                      type="number"
                      required
                      value={editingPlan.quarterlyPrice}
                      onChange={(e) => setEditingPlan({ ...editingPlan, quarterlyPrice: parseInt(e.target.value) || 0 })}
                      className="w-full bg-[#151515] border border-white/10 px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Yearly Pricing</label>
                    <input
                      type="number"
                      required
                      value={editingPlan.yearlyPrice}
                      onChange={(e) => setEditingPlan({ ...editingPlan, yearlyPrice: parseInt(e.target.value) || 0 })}
                      className="w-full bg-[#151515] border border-white/10 px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-3">
                  <button type="submit" className="px-5 py-2.5 bg-[#FF6600] text-white text-xs font-black uppercase tracking-widest cursor-pointer">Commit Plan Changes</button>
                  <button type="button" onClick={() => setEditingPlan(null)} className="px-5 py-2.5 bg-zinc-800 text-zinc-300 text-xs font-black uppercase tracking-widest hover:bg-zinc-700 cursor-pointer">Cancel</button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {membershipPlans.map((plan) => (
                  <div key={plan.name} className="p-5 bg-black/20 border border-white/10 relative flex flex-col justify-between h-[280px]">
                    <div className="space-y-3">
                      <h4 className="text-lg font-black uppercase text-white">{plan.name}</h4>
                      <p className="text-xs text-zinc-500 min-h-[32px]">{plan.tagline}</p>
                      <div className="space-y-1 text-xs text-zinc-300 font-mono">
                        <div>Monthly: <span className="text-white font-bold">₹{plan.monthlyPrice}</span></div>
                        <div>Quarterly: <span className="text-white font-bold">₹{plan.quarterlyPrice}</span></div>
                        <div>Yearly: <span className="text-white font-bold">₹{plan.yearlyPrice}</span></div>
                      </div>
                    </div>
                    <button onClick={() => setEditingPlan(plan)} className="w-full py-2.5 border border-[#FF6600]/20 text-[#FF6600] text-xs font-black uppercase tracking-widest hover:bg-[#FF6600] hover:text-white transition-all cursor-pointer">
                      Configure Tier Pricing
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <h2 className="text-lg font-black uppercase text-white tracking-widest">Gallery Photo Manager</h2>
              {!isAddingPhoto && (
                <button
                  onClick={() => setIsAddingPhoto(true)}
                  className="flex items-center gap-1.5 px-4.5 py-2 bg-[#FF6600] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#cc5200] cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  Add Photo
                </button>
              )}
            </div>

            {isAddingPhoto ? (
              <form onSubmit={handleSavePhoto} className="bg-black/30 border border-white/10 p-6 space-y-5">
                <h3 className="text-sm font-black uppercase text-white tracking-wider">Upload New Gallery Photo</h3>
                {uploadError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-widest">
                    {uploadError}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Photo Title</label>
                    <input
                      type="text"
                      required
                      value={photoForm.title}
                      onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                      className="w-full bg-[#151515] border border-white/10 px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Category</label>
                    <select
                      value={photoForm.category}
                      onChange={(e: any) => setPhotoForm({ ...photoForm, category: e.target.value })}
                      className="w-full bg-[#151515] border border-white/10 px-4 py-2.5 text-xs text-white"
                    >
                      <option value="interior">Interior</option>
                      <option value="equipment">Equipment</option>
                      <option value="classes">Group Classes</option>
                      <option value="events">Events</option>
                      <option value="members">Members</option>
                    </select>
                  </div>
                </div>

                {/* File Picker */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Select Image File</label>
                  <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-white/10 hover:border-[#FF6600]/50 bg-black/20 cursor-pointer transition-colors group">
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="h-full w-full object-contain p-2" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-zinc-500 group-hover:text-zinc-300">
                        <ImageIcon className="h-8 w-8" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Click to select image</span>
                        <span className="text-[9px] text-zinc-600">JPG, PNG, WEBP — max 10MB</span>
                      </div>
                    )}
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={uploadingPhoto}
                    className="px-5 py-2.5 bg-[#FF6600] text-white text-xs font-black uppercase tracking-widest cursor-pointer disabled:opacity-50"
                  >
                    {uploadingPhoto ? 'Uploading...' : 'Upload & Add'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsAddingPhoto(false); setPhotoPreview(null); setSelectedFile(null); setUploadError(null); }}
                    className="px-5 py-2.5 bg-zinc-800 text-zinc-300 text-xs font-black uppercase tracking-widest hover:bg-zinc-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {galleryItems.map((item) => (
                  <div key={item.id} className="relative group border border-white/10 overflow-hidden bg-black/40 flex flex-col justify-between">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover opacity-80" />
                    <div className="p-3 space-y-1 bg-black/85">
                      <span className="inline-block px-1 py-0.5 text-[7px] bg-[#FF6600]/10 text-[#FF6600] font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h5 className="text-[10px] font-black uppercase text-white truncate">{item.title}</h5>
                    </div>
                    <button
                      onClick={() => handleDeletePhoto(item)}
                      className="absolute top-2 right-2 p-1.5 bg-black/80 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}


        {/* TAB 5: CLUB INFORMATION */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <h2 className="text-lg font-black uppercase text-white tracking-widest">Club Information Coordinates</h2>
              <span className="text-xs font-bold text-zinc-500">Configure global metadata</span>
            </div>

            <form onSubmit={handleSaveContact} className="bg-black/30 border border-white/10 p-6 space-y-5 max-w-2xl">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">HQ Registry Address</label>
                <input
                  type="text"
                  required
                  value={contactForm.address}
                  onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                  className="w-full bg-[#151515] border border-white/10 px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Operations Phone</label>
                  <input
                    type="text"
                    required
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full bg-[#151515] border border-white/10 px-4 py-2.5 text-xs text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Official Email</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-[#151515] border border-white/10 px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-3.5 border border-white/5 bg-[#111] p-4.5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h3 className="text-xs font-black uppercase text-white tracking-wider">Gym Map Location Picker</h3>
                    <p className="text-[10px] text-zinc-500 font-semibold">Search a location or paste a custom embed URL below.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const query = encodeURIComponent(contactForm.address);
                      const embedUrl = `https://maps.google.com/maps?q=${query}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
                      setContactForm(prev => ({ ...prev, mapEmbedUrl: embedUrl }));
                    }}
                    className="px-3.5 py-1.5 bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] text-[10px] font-black uppercase tracking-wider hover:bg-[#F97316]/20 transition-all cursor-pointer animate-pulse"
                  >
                    Locate Address on Map
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Google Maps Embed URL</label>
                  <input
                    type="text"
                    required
                    value={contactForm.mapEmbedUrl}
                    onChange={(e) => setContactForm({ ...contactForm, mapEmbedUrl: e.target.value })}
                    className="w-full bg-[#151515] border border-white/10 px-4 py-2.5 text-xs text-white"
                    placeholder="https://maps.google.com/maps?q=Address&t=&z=14&output=embed"
                  />
                </div>

                {contactForm.mapEmbedUrl && (
                  <div className="space-y-1.5 pt-1.5">
                    <span className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">Live Map Preview</span>
                    <div className="w-full h-48 border border-white/10 overflow-hidden bg-black/40">
                      <iframe
                        src={contactForm.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'grayscale(0.85) invert(0.92) contrast(1.1)' }}
                        allowFullScreen={false}
                        loading="lazy"
                        title="Dashboard Map Preview"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#FF6600] text-white text-xs font-black uppercase tracking-widest cursor-pointer"
              >
                Update Contact Information
              </button>
            </form>
          </div>
        )}

        {/* TAB 6: DEVELOPER CONSOLE */}
        {activeTab === 'dev' && currentUser.role === 'developer' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <h2 className="text-lg font-black uppercase text-white tracking-widest">System Developer Suite</h2>
              <span className="text-xs font-bold text-orange-400">Sandbox state override controls</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 border border-orange-500/20 bg-orange-500/[0.02] flex flex-col justify-between h-44">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-orange-400">Flush Registry Settings</h4>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-semibold">
                    Restores pricing, coaches, contact info and gallery items back to default blueprints.
                  </p>
                </div>
                <button
                  onClick={() => { resetDatabase(); alert('LocalStorage database flushes complete!'); }}
                  className="flex items-center gap-1.5 w-fit px-4.5 py-2 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-wider hover:bg-orange-500/10 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  Restore Defaults
                </button>
              </div>

              <div className="p-5 border border-white/10 bg-black/25 col-span-2 flex flex-col justify-between min-h-44">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">Local DB JSON payload size</h4>
                  <p className="text-[10px] font-mono text-zinc-500 mt-2">
                    localStorage registry statistics:
                  </p>
                  <ul className="text-xs text-zinc-400 space-y-1.5 mt-3 font-mono">
                    <li>- Fitex Plans: {(typeof window !== 'undefined' ? localStorage.getItem('fitex_plans') || '' : '').length} chars</li>
                    <li>- Fitex Coaches: {(typeof window !== 'undefined' ? localStorage.getItem('fitex_coaches') || '' : '').length} chars</li>
                    <li>- Fitex Gallery: {(typeof window !== 'undefined' ? localStorage.getItem('fitex_gallery') || '' : '').length} chars</li>
                    <li>- Fitex Contact Info: {(typeof window !== 'undefined' ? localStorage.getItem('fitex_contact_info') || '' : '').length} chars</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

