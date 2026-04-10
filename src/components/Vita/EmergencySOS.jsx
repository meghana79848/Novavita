import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, Phone, ShieldCheck, XCircle, Activity, Vibrate } from 'lucide-react';

export default function EmergencySOS() {
  const [status, setStatus] = useState('idle'); // idle, countdown, sent
  const [timer, setTimer] = useState(10);
  const [showDataForm, setShowDataForm] = useState(false);
  const [formData, setFormData] = useState({ bloodType: '', allergies: '', physician: '', condition: '' });
  
  // Accident Detector State
  const [speed, setSpeed] = useState(40);
  const [prevSpeed, setPrevSpeed] = useState(40);
  const [location, setLocation] = useState('Fetching location...');
  const [detectorStatus, setDetectorStatus] = useState('Safe'); // Safe, Warning, Accident
  
  const dummyContacts = [
    { id: 1, name: 'Mom', relation: 'Family', phone: '+1 234-567-8900' },
    { id: 2, name: 'John Doe', relation: 'Brother', phone: '+1 987-654-3210' },
    { id: 3, name: 'City Hospital Ambulance', relation: 'Medical', phone: '911' }
  ];

  // Geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`),
        (err) => setLocation('123 Main St, Tech Park, Cityville (Fallback)')
      );
    } else {
      setLocation('Location not supported');
    }
  }, []);

  // Shake Detection
  useEffect(() => {
    const handleMotion = (event) => {
      if (status !== 'idle') return;
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;
      
      const totalAcc = Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);
      if (totalAcc > 25) { // Arbitrary threshold for "shake"
         triggerAccident('Shock impact detected!');
      }
    };
    
    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [status]);

  // Speed drop logic
  useEffect(() => {
    if (speed < prevSpeed - 40 && prevSpeed > 60 && status === 'idle') {
       triggerAccident('Sudden speed drop detected!');
    } else if (speed > 100) {
       setDetectorStatus('Warning');
    } else {
       setDetectorStatus('Safe');
    }
    setPrevSpeed(speed);
  }, [speed]);

  useEffect(() => {
    let interval;
    if (status === 'countdown' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (status === 'countdown' && timer === 0) {
      setStatus('sent');
    }
    return () => clearInterval(interval);
  }, [status, timer]);

  const triggerAccident = (reason = 'Manual Trigger') => {
    console.log(reason);
    setDetectorStatus('Accident');
    setStatus('countdown');
    setTimer(10);
  };

  const cancelAccident = () => {
    setStatus('idle');
    setDetectorStatus('Safe');
    setSpeed(40);
    setPrevSpeed(40);
    setTimer(10);
  };

  if (status === 'countdown') {
    return (
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} 
          transition={{ repeat: Infinity, duration: 1 }}
          style={{ 
            background: 'rgba(239, 68, 68, 0.15)', 
            border: '2px solid #EF4444',
            borderRadius: '50%', 
            width: '120px', 
            height: '120px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}
        >
          <AlertTriangle color="#EF4444" size={64} />
        </motion.div>
        
        <h2 style={{ color: '#EF4444', fontSize: '2.5rem', marginBottom: '10px' }}>Accident Detected!</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '30px' }}>
          Sending emergency SOS with live location in:
        </p>
        
        <motion.div 
          key={timer}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ fontSize: '5rem', fontWeight: 'bold', color: 'white', marginBottom: '40px', fontFamily: 'monospace' }}
        >
          {timer}s
        </motion.div>
        
        <button 
          onClick={cancelAccident}
          className="btn-primary" 
          style={{ 
            background: 'transparent', 
            border: '2px solid #6B7280', 
            color: '#D1D5DB', 
            width: '100%', 
            height: '60px', 
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <XCircle size={24} /> Cancel Request
        </button>
      </div>
    );
  }

  if (status === 'sent') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '30px 0' }}>
        <div style={{ 
          background: 'rgba(16, 185, 129, 0.1)', 
          borderRadius: '50%', 
          width: '100px', 
          height: '100px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '0 auto 20px auto'
        }}>
          <ShieldCheck color="#10B981" size={56} />
        </div>
        
        <h2 style={{ color: '#10B981', fontSize: '2rem', marginBottom: '15px' }}>SOS Sent Successfully</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Live location and medical profile have been shared with your emergency contacts and nearby responders.</p>
        
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '20px', textAlign: 'left', marginBottom: '30px' }}>
          <h4 style={{ color: 'white', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Notified Contacts</h4>
          {dummyContacts.map(c => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <strong style={{ display: 'block', color: 'white' }}>{c.name}</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.relation}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#60A5FA' }}>
                <Phone size={14} /> {c.phone}
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={cancelAccident}
          className="btn-primary" 
          style={{ width: '100%', background: 'rgba(255,255,255,0.1)', border: 'none', height: '50px', cursor: 'pointer', color: 'white' }}
        >
          Return to Dashboard
        </button>
      </motion.div>
    );
  }

  const handleSaveData = (e) => {
    e.preventDefault();
    alert("Emergency data updated successfully!");
    setShowDataForm(false);
  };

  if (showDataForm) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'left' }}>
        <h3 style={{ color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={20} color="#60A5FA" /> Medical Profile Setup
        </h3>
        <form onSubmit={handleSaveData} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.9rem' }}>Blood Type</label>
            <input type="text" value={formData.bloodType} onChange={e => setFormData({...formData, bloodType: e.target.value})} placeholder="e.g. O Positive" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} required />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.9rem' }}>Known Allergies</label>
            <textarea value={formData.allergies} onChange={e => setFormData({...formData, allergies: e.target.value})} placeholder="e.g. Penicillin, Peanuts" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', resize: 'vertical' }}></textarea>
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.9rem' }}>Primary Physician Name</label>
            <input type="text" value={formData.physician} onChange={e => setFormData({...formData, physician: e.target.value})} placeholder="Dr. Smith" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setShowDataForm(false)} className="btn-primary" style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>Cancel</button>
            <button type="submit" className="btn-primary" style={{ flex: 2, background: '#60A5FA', color: '#000', border: 'none' }}>Save Record</button>
          </div>
        </form>
      </motion.div>
    );
  }

  const getStatusColor = () => {
    if (detectorStatus === 'Safe') return '#10B981';
    if (detectorStatus === 'Warning') return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '20px', border: `1px solid ${getStatusColor()}40` }}>
        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 0 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Activity size={20} color={getStatusColor()} /> Accident Detector System
          </span>
          <span style={{ background: `${getStatusColor()}20`, color: getStatusColor(), padding: '5px 10px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 'bold' }}>
             {detectorStatus}
          </span>
        </h3>
        
        <div style={{ marginBottom: '20px' }}>
           <label style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '10px' }}>
              <span>Current Speed</span>
              <span style={{ color: 'white', fontWeight: 'bold' }}>{speed} km/h</span>
           </label>
           <input 
              type="range" 
              min="0" max="150" 
              value={speed} 
              onChange={(e) => setSpeed(parseInt(e.target.value))} 
              style={{ width: '100%', accentColor: getStatusColor() }} 
           />
           <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px' }}>Top drop speed sudden change to test auto-SOS</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px', marginBottom: '10px' }}>
           <Vibrate size={18} color="#A78BFA" />
           <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Shake mobile device to trigger SOS manually (Devicemotion API)</span>
        </div>
      </div>

      <div style={{ background: 'rgba(239, 68, 68, 0.05)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
        <h3 style={{ color: '#EF4444', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', marginTop: 0 }}>
          <MapPin size={20} /> Current Location Detected
        </h3>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>{location}</p>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '20px' }}>
        <h4 style={{ color: 'white', marginBottom: '15px', marginTop: 0 }}>Emergency Contacts (Dummy Data)</h4>
        {dummyContacts.slice(0, 2).map(c => (
          <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: 'var(--text-muted)' }}>{c.name} ({c.relation})</span>
            <span style={{ color: 'white' }}>{c.phone}</span>
          </div>
        ))}
        <button 
          className="btn-primary" 
          style={{ width: '100%', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.5)', color: '#60A5FA', marginTop: '15px', height: '40px', borderRadius: '8px', cursor: 'pointer' }}
          onClick={() => setShowDataForm(true)}
        >
          + Add More Data
        </button>
      </div>

      <button 
        onClick={() => triggerAccident('Manual Trigger')}
        className="btn-primary" 
        style={{ 
          background: 'linear-gradient(135deg, #EF4444, #991B1B)', 
          height: '60px', 
          fontSize: '1.2rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)',
          border: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          color: 'white',
          borderRadius: '12px'
        }}
      >
        <AlertTriangle size={24} /> TRIGGER ACCIDENT
      </button>
    </div>
  );
}

