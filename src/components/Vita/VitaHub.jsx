import React, { useState, useEffect } from 'react';
import ActionCard from '../ActionCard';
import EmergencySOS from './EmergencySOS';
import { 
  AlertTriangle, Droplet, Heart, Camera, Activity, MessageSquare, 
  Dog, Pill, Brain, ActivitySquare, Apple, MapPin, 
  Stethoscope, Bell, ShieldAlert, X, Send, Plus, CheckCircle, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VitaHub() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [activePortal, setActivePortal] = useState(null);
  
  // States for sub-modules
  const [scanStep, setScanStep] = useState(0); // v4 AI Scanner
  const [portalStep, setPortalStep] = useState(0); // General access portal flow
  const [patientData, setPatientData] = useState({ name: '', age: '', symptoms: '' });
  const [bookingData, setBookingData] = useState({ date: '', time: '' });
  const [showHistory, setShowHistory] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  
  const [chatMessages, setChatMessages] = useState([
    { text: "Hello! I am your AI Health Assistant. How can I help you today?", isBot: true }
  ]);
  const [chatInput, setChatInput] = useState('');

  const [medicines, setMedicines] = useState([]);
  const [medInput, setMedInput] = useState({ name: '', time: '' });
  const [showMedForm, setShowMedForm] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('vita_bookings') || '[]');
    setHistoryList(savedBookings);
    
    const savedMeds = JSON.parse(localStorage.getItem('vita_medicines') || '[]');
    if (savedMeds.length > 0) {
       setMedicines(savedMeds);
    } else {
       setMedicines([
          { name: 'Vitamin C', time: 'Morning after breakfast' },
          { name: 'Paracetamol', time: '08:00 PM' }
       ]);
    }
  }, []);

  const saveBooking = (doctor) => {
    const newBooking = {
       id: Date.now(),
       doctor: doctor.name,
       date: bookingData.date,
       time: bookingData.time,
       disease: patientData.symptoms || 'General Consultation',
       status: 'Confirmed',
       type: activePortal.id === 'v7' ? 'Pet Health' : 'Human Health'
    };
    const updated = [...historyList, newBooking];
    setHistoryList(updated);
    localStorage.setItem('vita_bookings', JSON.stringify(updated));
    setPortalStep(4); // Confirmation step
  };

  const saveMedicine = () => {
    if(!medInput.name || !medInput.time) return;
    const updated = [...medicines, medInput];
    setMedicines(updated);
    localStorage.setItem('vita_medicines', JSON.stringify(updated));
    setMedInput({ name: '', time: '' });
    setShowMedForm(false);
  };

  const cards = [
    { id: 'v1', title: "Emergency Alert", description: "Send immediate alerts with live location to safe contacts & ambulance.", icon: <AlertTriangle size={24} />, color: "#EF4444" },
    { id: 'v2', title: "Blood Donation", description: "Find or donate blood urgently in your area.", icon: <Droplet size={24} />, color: "#EF4444" },
    { id: 'v3', title: "Organ Donation", description: "Register for organ donation & save lives.", icon: <Heart size={24} />, color: "#F472B6" },
    { id: 'v4', title: "AI Injury Scanner", description: "Upload a picture of an injury for instant AI first-aid tips.", icon: <Camera size={24} />, color: "#60A5FA" },
    { id: 'v5', title: "Skin Allergy Check", description: "Online consultation & nearby doctor appointments.", icon: <Activity size={24} />, color: "#34D399" },
    { id: 'v6', title: "AI Health Chatbot", description: "Symptom checker & basic medicine suggestions.", icon: <MessageSquare size={24} />, color: "#A78BFA" },
    { id: 'v7', title: "Pet Health Care", description: "Hygiene tips and vet suggestions for your pets.", icon: <Dog size={24} />, color: "#FBBF24" },
    { id: 'v8', title: "Medicine Reminder", description: "Never miss a dose with timely notifications.", icon: <Pill size={24} />, color: "#60A5FA" },
    { id: 'v9', title: "Mental Health Support", description: "Guided meditation and therapy sessions.", icon: <Brain size={24} />, color: "#818CF8" },
    { id: 'v10', title: "Fitness Tracker", description: "Log your daily walks, workouts, & calories burned.", icon: <ActivitySquare size={24} />, color: "#34D399" },
    { id: 'v11', title: "Diet Suggestions", description: "Customized diet plans based on your health goals.", icon: <Apple size={24} />, color: "#10B981" },
    { id: 'v12', title: "Nearby Hospitals", description: "Live map of emergency centers near your current location.", icon: <MapPin size={24} />, color: "#F87171" },
    { id: 'v13', title: "First Aid Guide", description: "Step-by-step guides for common emergencies.", icon: <Stethoscope size={24} />, color: "#A78BFA" },
    { id: 'v14', title: "Health Notifications", description: "Daily health facts and seasonal alerts.", icon: <Bell size={24} />, color: "#FBBF24" },
    { id: 'v15', title: "Emergency Tips", description: "Critical survival tips with audible alert sounds.", icon: <ShieldAlert size={24} />, color: "#EF4444" },
  ];

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if(!chatInput.trim()) return;
    
    const newChat = [...chatMessages, { text: chatInput, isBot: false }];
    setChatMessages(newChat);
    setChatInput('');
    
    setTimeout(() => {
       setChatMessages(prev => [...prev, { 
         text: "Based on your input, I recommend resting, staying hydrated, and booking a consultation if symptoms persist for more than 48 hours. Here are some basic dummy precautions: 1. Drink warm water 2. Take ample sleep.", 
         isBot: true 
       }]);
    }, 1000);
  };

  // Dynamic content logic based on which card is open
  const getPortalMatter = (portalId, symptoms) => {
    switch (portalId) {
       case 'v5': return {
          condition: symptoms ? 'Contact Dermatitis / Skin Eruption' : 'General Roseacea',
          desc: `Based on your input "${symptoms || 'none'}", this pattern typically represents an allergic skin reaction or mild eczema.`,
          causes: ['Exposure to allergens (dust, pollen, pets)', 'Reaction to cosmetics or soaps', 'Weather or humidity changes'],
          precautions: 'Wash the affected area with mild soap, apply aloe vera gel or calamine lotion, and avoid scratching.',
          doctorName: 'Dr. Sarah Jenkins', doctorSpec: 'Dermatologist & Allergist',
          drBio: 'Expert in treating eczema, acne, and complex skin allergies with a gentle approach.',
       };
       case 'v7': return {
          condition: symptoms ? 'Canine/Feline Digestive Issue' : 'General Pet Fatigue',
          desc: `Based on your pet's symptoms "${symptoms || 'none'}", this looks like a minor dietary intolerance or tick-borne illness.`,
          causes: ['Eating unauthorized food items', 'Tick or flea bites', 'Change in environment/stress'],
          precautions: 'Ensure your pet has fresh water. Withhold food for 12 hours if vomiting occurs. Check coat for ticks.',
          doctorName: 'Dr. Emily Clark', doctorSpec: 'Veterinary Professional',
          drBio: 'Caring vet with 10+ years helping dogs, cats, and exotic animals recover from illnesses.',
       };
       case 'v2': return {
          condition: 'Blood Donor Evaluation',
          desc: `Blood requirement or donation intent logged. Blood details: "${symptoms || 'Not specified'}".`,
          causes: ['Emergency Surgery', 'Accident / Trauma', 'Chronic Anemia'],
          precautions: 'Ensure you have eaten well and are hydrated before donating. Bring valid ID.',
          doctorName: 'Dr. Richard Lee', doctorSpec: 'Hematologist & Blood Bank Director',
          drBio: 'Coordinates critical blood drives and urgent transfusions across the city network.',
       };
       case 'v3': return {
          condition: 'Organ Pledge Registration',
          desc: `Your organ donation intent has been evaluated. Added details: "${symptoms || 'N/A'}".`,
          causes: ['Voluntary post-life pledge', 'Living donor assessment'],
          precautions: 'Living donors must pass exhaustive physical and psychological testing.',
          doctorName: 'Dr. Alan Grant', doctorSpec: 'Transplant Coordinator',
          drBio: 'Handles organ matching logic and guides donors through the entire lifelong process.',
       };
       case 'v12': return {
          condition: 'Emergency Hospital Routing',
          desc: `Evaluating nearest emergency centers for: "${symptoms || 'General concern'}".`,
          causes: ['Urgent trauma', 'Sudden severe illness', 'Accident'],
          precautions: 'Do not move a critically injured person unless in immediate danger. Keep them warm.',
          doctorName: 'Dr. Meredith Grey', doctorSpec: 'Head of Trauma & Emergency',
          drBio: 'Specializes in rapid response stabilization and severe trauma care at City Hospital.',
       };
       default: return {
          condition: symptoms ? 'Viral Infection / Related Issue' : 'General Fatigue',
          desc: `Based on dummy analysis of "${symptoms || 'none'}", this condition often involves inflammation or seasonal viral responses.`,
          causes: ['Change in weather patterns', 'Exposure to allergens', 'Weakened immune system'],
          precautions: 'Hydrate regularly, rest for 8 hours, and consume Vitamin C. Do not self-medicate heavily without consulting a doctor.',
          doctorName: 'Dr. James Wilson', doctorSpec: 'General Physician & Immunologist',
          drBio: 'Dedicated professional with numerous successful treatments in generic symptomatology.',
       };
    }
  };

  // Renders the main Portal Flow (Form -> Disease -> Doctor -> Book)
  const renderPortalFlow = () => {
    const matter = activePortal ? getPortalMatter(activePortal.id, patientData.symptoms) : getPortalMatter('', '');
    if (showHistory) {
       return (
         <div style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
               <h3 style={{ margin: 0 }}>Appointment History</h3>
               <button className="btn-primary" onClick={() => setShowHistory(false)}>Close History</button>
            </div>
            {historyList.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No past appointments found.</p> : (
               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                 {historyList.map(item => (
                   <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', borderLeft: `4px solid ${activePortal.color}` }}>
                      <div>
                         <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Dr. {item.doctor} <span style={{ fontSize: '0.8rem', color: '#60A5FA', marginLeft: '10px' }}>{item.type}</span></p>
                         <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.disease}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                         <p style={{ margin: '0 0 5px 0' }}>{item.date} at {item.time}</p>
                         <span style={{ fontSize: '0.8rem', background: '#10B98122', color: '#10B981', padding: '4px 8px', borderRadius: '12px' }}>{item.status}</span>
                      </div>
                   </div>
                 ))}
               </div>
            )}
         </div>
       )
    }

    if (portalStep === 0) {
      return (
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '16px' }}>
          <h3 style={{ marginBottom: '20px' }}>Initial Consultation Form</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" placeholder="Patient Name" value={patientData.name} onChange={e => setPatientData({...patientData, name: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: `1px solid ${activePortal.color}40`, color: 'white' }} />
            <input type="number" placeholder="Patient Age" value={patientData.age} onChange={e => setPatientData({...patientData, age: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: `1px solid ${activePortal.color}40`, color: 'white' }} />
            <textarea placeholder="Describe Symptoms or Disease..." value={patientData.symptoms} onChange={e => setPatientData({...patientData, symptoms: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: `1px solid ${activePortal.color}40`, color: 'white', minHeight: '100px' }} />
            <button className="btn-primary" onClick={() => setPortalStep(1)} style={{ background: activePortal.color, color: '#000', border: 'none', padding: '15px', fontSize: '1.1rem', fontWeight: 'bold' }}>Analyze Symptoms</button>
          </div>
        </div>
      )
    } else if (portalStep === 1) {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '16px' }}>
          <h3 style={{ marginBottom: '15px', color: activePortal.color }}>Analysis Results</h3>
          <h4 style={{ margin: '0 0 10px 0' }}>Identified Condition: <span style={{ fontWeight: 'normal', color: 'var(--text-muted)' }}>{matter.condition}</span></h4>
          <div style={{ marginBottom: '20px' }}>
            <strong>Description:</strong>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{matter.desc}</p>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <strong>Common Causes:</strong>
            <ul style={{ color: 'var(--text-muted)', fontSize: '0.95rem', paddingLeft: '20px' }}>
              {matter.causes.map((cause, i) => <li key={i}>{cause}</li>)}
            </ul>
          </div>
          <div style={{ marginBottom: '25px' }}>
             <strong>Basic Precautions:</strong>
             <div style={{ background: 'rgba(16, 185, 129, 0.1)', borderLeft: '3px solid #10B981', padding: '10px 15px', marginTop: '10px', color: '#10B981', fontSize: '0.9rem' }}>
                {matter.precautions}
             </div>
          </div>
          <button className="btn-primary" onClick={() => setPortalStep(2)} style={{ background: activePortal.color, color: '#000', border: 'none', width: '100%' }}>View Recommended Doctors</button>
        </motion.div>
      )
    } else if (portalStep === 2) {
      return (
         <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
           <h3 style={{ margin: 0 }}>Recommended Specialists</h3>
           <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: activePortal.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#000', fontWeight: 'bold' }}>
                 M.D.
              </div>
              <div style={{ flex: 1 }}>
                 <h4 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{matter.doctorName}</h4>
                 <p style={{ margin: '0 0 5px 0', color: activePortal.color }}>{matter.doctorSpec}</p>
                 <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Experience: 12 Years | Rating: 4.9/5</p>
                 <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Bio: {matter.drBio}</p>
              </div>
              <button className="btn-primary" onClick={() => setPortalStep(3)} style={{ background: 'transparent', border: `1px solid ${activePortal.color}`, color: 'white' }}>Book Appointment</button>
           </div>
         </motion.div>
      )
    } else if (portalStep === 3) {
      return (
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '16px' }}>
            <h3 style={{ marginBottom: '20px' }}>Select Booking Slot</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
               <input type="text" value={patientData.name} disabled style={{ width: '100%', padding: '15px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: `1px solid #333`, color: 'gray' }} />
               <input type="date" value={bookingData.date} onChange={e => setBookingData({...bookingData, date: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: `1px solid ${activePortal.color}40`, color: 'white', colorScheme: 'dark' }} />
               <input type="time" value={bookingData.time} onChange={e => setBookingData({...bookingData, time: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: `1px solid ${activePortal.color}40`, color: 'white', colorScheme: 'dark' }} />
               <button className="btn-primary" onClick={() => saveBooking({ name: matter.doctorName })} style={{ background: activePortal.color, color: '#000', border: 'none', padding: '15px' }}>Confirm Booking</button>
            </div>
         </motion.div>
      )
    } else if (portalStep === 4) {
      return (
         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <CheckCircle size={64} color="#10B981" style={{ margin: '0 auto 20px auto' }} />
            <h2 style={{ color: '#10B981', marginBottom: '10px' }}>Booking Confirmed!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Your appointment has been successfully scheduled and saved to your history.</p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
               <button className="btn-primary" onClick={() => setShowHistory(true)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none' }}>View History</button>
               <button className="btn-primary" onClick={() => { setPortalStep(0); setActivePortal(null); }} style={{ background: 'transparent', border: '1px solid #10B981', color: '#10B981' }}>Return to Hub</button>
            </div>
         </motion.div>
      )
    }
  }

  // Active Portal (Full screen mode)
  if (activePortal) {
    return (
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} style={{ padding: '0 20px 40px 20px', display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
           <button onClick={() => { setActivePortal(null); setPortalStep(0); setShowHistory(false); }} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
             <X size={16} /> Back to Hub
           </button>
           <button onClick={() => setShowHistory(!showHistory)} style={{ background: 'transparent', border: `1px solid ${activePortal.color}`, color: activePortal.color, padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Clock size={16} /> {showHistory ? 'Close History' : 'View History'}
           </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
          <div style={{ color: activePortal.color, background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px' }}>
            {React.cloneElement(activePortal.icon, { size: 32 })}
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '2.5rem' }}>{activePortal.title} Portal</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1.2rem' }}>{activePortal.description}</p>
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            {renderPortalFlow()}
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 style={{ marginBottom: '10px' }}>Vita <span className="glow-text">Health</span></h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Your comprehensive health & emergency portal.</p>
      </motion.div>
      
      <motion.div 
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}
        initial="hidden"
        animate="show"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
      >
        {cards.map(card => (
          <motion.div key={card.id} variants={{ hidden: { opacity: 0, scale: 0.9, y: 20 }, show: { opacity: 1, scale: 1, y: 0 } }} transition={{ type: "spring", stiffness: 100 }}>
            <ActionCard 
              layoutId={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
              color={card.color}
              onClick={() => setSelectedCard(card)}
            />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1000, padding: '20px'
            }}
            onClick={() => { setSelectedCard(null); setScanStep(0); setShowMedForm(false); }}
          >
            <motion.div
              layoutId={`card-container-${selectedCard.id}`}
              style={{
                background: 'var(--bg-dark)', border: `1px solid ${selectedCard.color}`,
                borderRadius: '24px', padding: '40px', width: '600px', maxWidth: '100%',
                maxHeight: '90vh', overflowY: 'auto', position: 'relative',
                boxShadow: `0 0 50px ${selectedCard.color}44`
              }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => { setSelectedCard(null); setScanStep(0); setShowMedForm(false); }}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', padding: '8px', borderRadius: '50%' }}
              >
                <X size={20} />
              </button>
              
              <motion.div layoutId={`card-icon-${selectedCard.id}`} style={{ color: selectedCard.color, marginBottom: '20px', display: 'inline-block', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px' }}>
                {React.cloneElement(selectedCard.icon, { size: 32 })}
              </motion.div>
              <motion.h2 layoutId={`card-title-${selectedCard.id}`} style={{ fontSize: '2rem', marginBottom: '10px' }}>{selectedCard.title}</motion.h2>
              <motion.p layoutId={`card-desc-${selectedCard.id}`} style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem' }}>{selectedCard.description}</motion.p>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                
                {/* ---------- Emergency SOS (v1) ---------- */}
                {selectedCard.id === 'v1' && <EmergencySOS />}

                {/* ---------- AI INJURY SCANNER (v4) ---------- */}
                {selectedCard.id === 'v4' && (
                  <div style={{ textAlign: 'center' }}>
                    {scanStep === 0 && (
                       <>
                         <div style={{ border: '2px dashed var(--glass-border)', padding: '60px', borderRadius: '16px', marginBottom: '15px', background: 'rgba(96, 165, 250, 0.05)' }}>
                           <Camera size={48} style={{ color: 'var(--text-muted)', margin: '0 auto' }} />
                           <p style={{ marginTop: '15px', color: 'var(--text-muted)' }}>Tap to scan injury using AI Vision (Frontend Dummy)</p>
                         </div>
                         <button className="btn-primary" onClick={() => {
                            setScanStep(1);
                            setTimeout(() => setScanStep(2), 2500);
                         }} style={{ width: '100%', height: '50px' }}>Scan with AI</button>
                       </>
                    )}
                    {scanStep === 1 && (
                       <div style={{ padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '4px solid rgba(96, 165, 250, 0.2)', borderTopColor: '#60A5FA', marginBottom: '20px' }} />
                          <p style={{ color: '#60A5FA' }}>Analyzing imagery for depth, skin allergies, and trauma severity...</p>
                       </div>
                    )}
                    {scanStep === 2 && (
                       <div style={{ textAlign: 'left' }}>
                          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10B981', padding: '15px', borderRadius: '12px', marginBottom: '15px' }}>
                             <h4 style={{ color: '#10B981', margin: '0 0 5px 0' }}>Injury Type: Minor Abrasion</h4>
                             <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>No deep tissue damage detected.</p>
                          </div>
                          <div style={{ background: 'rgba(244, 114, 182, 0.1)', border: '1px solid #F472B6', padding: '15px', borderRadius: '12px', marginBottom: '15px' }}>
                             <h4 style={{ color: '#F472B6', margin: '0 0 5px 0' }}>Skin Allergy Details:</h4>
                             <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Mild redness detected. Common reaction. Avoid scratching.</p>
                          </div>
                          <div style={{ background: 'rgba(96, 165, 250, 0.1)', border: '1px solid #60A5FA', padding: '15px', borderRadius: '12px', marginBottom: '15px' }}>
                             <h4 style={{ color: '#60A5FA', margin: '0 0 5px 0' }}>Health Suggestions:</h4>
                             <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Wash with warm water and apply antibacterial cream.</p>
                          </div>
                          <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid #FBBF24', padding: '15px', borderRadius: '12px', marginBottom: '15px' }}>
                             <h4 style={{ color: '#FBBF24', margin: '0 0 5px 0' }}>🐾 Pet Health Alternative:</h4>
                             <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>If this is a pet scan, check for ticks or flea bites which mimic this pattern.</p>
                          </div>
                          <button className="btn-primary" onClick={() => setScanStep(0)} style={{ width: '100%', background: 'transparent', border: '1px solid #60A5FA', color: '#60A5FA' }}>Scan Another Image</button>
                       </div>
                    )}
                  </div>
                )}

                {/* ---------- AI HEALTH CHATBOT (v6) ---------- */}
                {selectedCard.id === 'v6' && (
                  <div style={{ display: 'flex', flexDirection: 'column', height: '400px' }}>
                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', paddingRight: '10px' }}>
                       {chatMessages.map((msg, i) => (
                          <div key={i} style={{ alignSelf: msg.isBot ? 'flex-start' : 'flex-end', background: msg.isBot ? 'rgba(255,255,255,0.05)' : '#A78BFA', color: msg.isBot ? 'white' : '#000', padding: '12px 16px', borderRadius: '12px', borderBottomLeftRadius: msg.isBot ? 0 : '12px', borderBottomRightRadius: !msg.isBot ? 0 : '12px', maxWidth: '80%' }}>
                             {msg.text}
                          </div>
                       ))}
                    </div>
                    <form onSubmit={handleChatSubmit} style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                       <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Type health questions..." style={{ flex: 1, padding: '15px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid #A78BFA', color: 'white' }} />
                       <button type="submit" className="btn-primary" style={{ background: '#A78BFA', border: 'none', color: '#000', padding: '0 20px' }}>
                         <Send size={20} />
                       </button>
                    </form>
                  </div>
                )}

                {/* ---------- MEDICINE REMINDER (v8) ---------- */}
                {selectedCard.id === 'v8' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {!showMedForm ? (
                      <>
                        {medicines.map((med, i) => (
                           <div key={i} style={{ background: 'rgba(96, 165, 250, 0.1)', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                             <div>
                               <h4 style={{ color: '#60A5FA', margin: 0 }}>{med.name}</h4>
                               <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>{med.time}</p>
                             </div>
                             <span style={{ border: '1px solid #60A5FA', color: '#60A5FA', padding: '5px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>Set</span>
                           </div>
                        ))}
                        <button onClick={() => setShowMedForm(true)} className="btn-primary" style={{ marginTop: '10px', background: 'transparent', border: '1px dashed #60A5FA', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '15px' }}>
                          <Plus size={18} /> Add Medication
                        </button>
                      </>
                    ) : (
                      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
                         <h4 style={{ marginBottom: '15px' }}>Add Medicine</h4>
                         <input type="text" placeholder="Medicine Name" value={medInput.name} onChange={e => setMedInput({...medInput, name: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', background: 'rgba(0,0,0,0.5)', border: '1px solid #60A5FA', color: 'white' }} />
                         <input type="text" placeholder="Time (e.g. 10:00 AM or 'After Dinner')" value={medInput.time} onChange={e => setMedInput({...medInput, time: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', background: 'rgba(0,0,0,0.5)', border: '1px solid #60A5FA', color: 'white' }} />
                         <button onClick={saveMedicine} className="btn-primary" style={{ width: '100%', background: '#60A5FA', border: 'none', color: '#000' }}>Save Reminder</button>
                      </div>
                    )}
                  </div>
                )}

                {/* ---------- HEALTH NOTIFICATIONS (v14) ---------- */}
                {selectedCard.id === 'v14' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                     <div style={{ borderLeft: '4px solid #10B981', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '0 12px 12px 0' }}>
                        <h4 style={{ margin: '0 0 5px 0', display: 'flex', alignItems: 'center', gap: '5px' }}><Apple size={16} /> Diet Plan Update</h4>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Remember to include leafy greens in your lunch today.</p>
                     </div>
                     <div style={{ borderLeft: '4px solid #EF4444', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '0 12px 12px 0' }}>
                        <h4 style={{ margin: '0 0 5px 0', display: 'flex', alignItems: 'center', gap: '5px' }}><Stethoscope size={16} /> First Aid Tip</h4>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Did you know? For minor burns, use cool water, not ice.</p>
                     </div>
                     <div style={{ borderLeft: '4px solid #60A5FA', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '0 12px 12px 0' }}>
                        <h4 style={{ margin: '0 0 5px 0', display: 'flex', alignItems: 'center', gap: '5px' }}><Pill size={16} /> Medicine Reminder</h4>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Upcoming: Vitamin C at 08:00 PM.</p>
                     </div>
                     <div style={{ borderLeft: '4px solid #818CF8', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '0 12px 12px 0' }}>
                        <h4 style={{ margin: '0 0 5px 0', display: 'flex', alignItems: 'center', gap: '5px' }}><Brain size={16} /> Mental Health Minute</h4>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Take 5 deep breaths. Breathe in for 4s, hold for 4s, exhale for 6s.</p>
                     </div>
                  </div>
                )}

                {/* ---------- DIET (v11) & MENTAL HEALTH (v9) ---------- */}
                {(selectedCard.id === 'v11' || selectedCard.id === 'v9') && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
                       <h3 style={{ marginBottom: '10px' }}>{selectedCard.id === 'v11' ? 'Current Diet Plan' : 'Relaxation Guidance'}</h3>
                       <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                         {selectedCard.id === 'v11' 
                           ? "Since your last checkup involved general fatigue, we suggest a high-iron, vitamin-rich dummy diet. Breakfast: Oatmeal with berries. Lunch: Grilled chicken salad. Dinner: Salmon and quinoa."
                           : "Stress relief is crucial. Avoid screens 1 hour before bed. Listen to our dummy ambient tracks in the background, and practice guided visualization for 10 minutes daily."}
                       </p>
                    </div>
                  </div>
                )}

                {/* ---------- GENERIC ACTIVE PORTAL REDIRECT (For v2, v3, v5, v7, etc.) ---------- */}
                {!['v1', 'v4', 'v6', 'v8', 'v14', 'v11', 'v9'].includes(selectedCard.id) && (
                  <div style={{ textAlign: 'center', padding: '10px 0' }}>
                    <img src="https://images.unsplash.com/photo-1576091160550-2173eff3e18d?w=400&h=200&fit=crop" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px' }} alt="Health Module Illustration" />
                    <h3 style={{ marginBottom: '10px' }}>{selectedCard.title} Operations</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '15px' }}>{selectedCard.description}</p>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', textAlign: 'left', marginBottom: '20px' }}>
                      <p style={{ fontSize: '0.9rem', color: '#9CA3AF', margin: '0 0 5px 0' }}>• Enter patient symptoms for AI analysis</p>
                      <p style={{ fontSize: '0.9rem', color: '#9CA3AF', margin: '0 0 5px 0' }}>• Connect with specific certified professionals</p>
                      <p style={{ fontSize: '0.9rem', color: '#9CA3AF', margin: '0' }}>• Manage bookings & history securely</p>
                    </div>
                    <button 
                      className="btn-primary" 
                      onClick={() => { 
                         setActivePortal(selectedCard); 
                         setSelectedCard(null); 
                         setPortalStep(0); 
                         setPatientData({ name: '', age: '', symptoms: '' });
                      }}
                      style={{ width: '100%', background: `linear-gradient(135deg, ${selectedCard.color}, #000)`, border: 'none', cursor: 'pointer' }}
                    >
                      Access Portal
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
