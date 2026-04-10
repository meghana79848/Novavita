import React, { useState, useEffect } from 'react';
import ActionCard from '../ActionCard';
import { 
  Calendar, MonitorPlay, Puzzle, Target, Coins, BookOpen, 
  FileText, HelpCircle, Flame, Trophy, Award, Users, 
  Video, Bell, BarChart, X, PlayCircle, Lock, Unlock, CheckCircle,
  QrCode, Book, Download, Send, CreditCard, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '../../contexts/GamificationContext';

// --- DUMMY DATA --- //
const DUMMY_COURSES = [
  { id: 1, title: 'AI Basics', level: 'Beginner', duration: '2 Hrs', std: '6-8' },
  { id: 2, title: 'Python Programming', level: 'Beginner', duration: '5 Hrs', std: '9-10' },
  { id: 3, title: 'Web Development', level: 'Intermediate', duration: '12 Hrs', std: '11-12' },
  { id: 4, title: 'JavaScript Advanced', level: 'Intermediate', duration: '8 Hrs', std: '11-12' },
  { id: 5, title: 'Database Management', level: 'Intermediate', duration: '6 Hrs', std: '11-12' },
  { id: 6, title: 'Machine Learning', level: 'Advanced', duration: '15 Hrs', std: '11-12' },
  { id: 7, title: 'Data Science', level: 'Advanced', duration: '14 Hrs', std: '11-12' },
  { id: 8, title: 'Cyber Security', level: 'Advanced', duration: '10 Hrs', std: '11-12' },
  { id: 9, title: 'Cloud Computing', level: 'Advanced', duration: '8 Hrs', std: '11-12' },
  { id: 10, title: 'UI/UX Design', level: 'All Levels', duration: '4 Hrs', std: '9-10' },
  { id: 11, title: 'Arts & Painting', level: 'Beginner', duration: '3 Hrs', std: '6-8' },
  { id: 12, title: 'Communication Skills', level: 'All Levels', duration: '5 Hrs', std: '9-10' },
  { id: 13, title: 'Basic Electronics', level: 'Beginner', duration: '6 Hrs', std: '6-8' },
  { id: 14, title: 'App Development', level: 'Intermediate', duration: '10 Hrs', std: '9-10' },
  { id: 15, title: 'Business Strategy', level: 'Advanced', duration: '7 Hrs', std: '11-12' }
];

const DUMMY_BOOKS = [
  { id: 101, title: 'Cracking the Coding Interview', price: 500, desc: 'Essential 189 programming questions and solutions.' },
  { id: 102, title: 'Clean Code', price: 450, desc: 'A Handbook of Agile Software Craftsmanship.' },
  { id: 103, title: 'Design Patterns', price: 600, desc: 'Elements of Reusable Object-Oriented Software.' },
  { id: 104, title: 'Introduction to Algorithms', price: 800, desc: 'Comprehensive guide to algorithms.' },
  { id: 105, title: 'The Pragmatic Programmer', price: 550, desc: 'Your journey to mastery in software dev.' }
];

const DUMMY_LIVE_CLASSES = [
  { id: 1, title: 'Live: Watercolor Arts', host: 'Emma V.', time: '10:00 AM' },
  { id: 2, title: 'Live: Python Data Structs', host: 'Alex JS.', time: '11:00 AM' },
  { id: 3, title: 'Live: Advanced AI', host: 'Dr. Smith', time: '12:00 PM' },
  { id: 4, title: 'Live: Web UI Design', host: 'Sarah M.', time: '01:00 PM' },
  { id: 5, title: 'Live: Cloud Security', host: 'Kevin T.', time: '02:00 PM' },
  { id: 6, title: 'Live: Algebra Basics', host: 'Mr. John', time: '03:00 PM' },
  { id: 7, title: 'Live: Chemistry 101', host: 'Mrs. D.', time: '04:00 PM' },
  { id: 8, title: 'Live: Physics Lab', host: 'Prof. X', time: '05:00 PM' },
  { id: 9, title: 'Live: English Communication', host: 'Lucy G.', time: '06:00 PM' },
  { id: 10, title: 'Live: Yoga & Fitness', host: 'Zen M.', time: '07:00 AM' },
  { id: 11, title: 'Live: Digital Marketing', host: 'Chris P.', time: '08:00 AM' },
  { id: 12, title: 'Live: Freelancing 101', host: 'Tom B.', time: '09:00 AM' },
  { id: 13, title: 'Live: Mobile App Design', host: 'Jane D.', time: '10:30 AM' },
  { id: 14, title: 'Live: DevOps Practices', host: 'Sam W.', time: '11:30 AM' },
  { id: 15, title: 'Live: Interview Prep', host: 'HR Team', time: '06:30 PM' }
];

const LEADERBOARD_MEMBERS = [
  { rank: 1, name: 'Alex Johnson', score: 12450, img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
  { rank: 2, name: 'Sarah Miller', score: 11200, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { rank: 3, name: 'Meghana (You)', score: 9850, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  { rank: 4, name: 'David Lee', score: 8900, img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
  { rank: 5, name: 'Emma Wilson', score: 8500, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop' },
  { rank: 6, name: 'James Brown', score: 8100, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  { rank: 7, name: 'Olivia Davis', score: 7950, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
  { rank: 8, name: 'William Garcia', score: 7600, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { rank: 9, name: 'Sophia Martinez', score: 7200, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
  { rank: 10, name: 'Lucas Rodriguez', score: 6800, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' }
];

// --- SUB-COMPONENTS --- //

const CourseView = ({ course, color, onComplete, onBack, setResumeState, initStep }) => {
  const [step, setStep] = useState(initStep || 1);
  const { awardCertificate } = useGamification();

  useEffect(() => {
    setResumeState(course.id, step);
  }, [step, course.id, setResumeState]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <button onClick={onBack} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', width: 'max-content', marginBottom: '10px' }}>
        <X size={16} /> Back to Courses
      </button>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{ flex: 1, height: '4px', background: step >= i ? color : 'rgba(255,255,255,0.1)', borderRadius: '2px', transition: 'background 0.3s' }} />
        ))}
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '1.8rem' }}>1. Introduction to {course.title}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>Welcome! This {course.level.toLowerCase()} level course is tailored for Std {course.std} and takes {course.duration}. Review the notes, pass the quiz, and watch the masterclass.</p>
          <button className="btn-primary" onClick={() => setStep(2)} style={{ background: color, border: 'none', color: '#000', fontSize: '1.1rem', padding: '12px 24px', marginTop: '20px' }}>Start Course Material</button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '1.8rem' }}>2. Course Materials: {course.title}</h2>
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '12px', color: 'var(--text-muted)', maxHeight: '300px', overflowY: 'auto', marginBottom: '20px', fontSize: '1rem', lineHeight: '1.6' }}>
            <h4 style={{ color: 'white', marginTop: 0 }}>Chapter 1: The Basics</h4>
            <p>Understanding the basics of {course.title} requires a solid grasp of underlying principles. Notes: Ensure you practice daily. Theoretical foundations include logical reasoning and paradigm structures.</p>
          </div>
          <button className="btn-primary" onClick={() => setStep(3)} style={{ background: color, border: 'none', color: '#000', fontSize: '1.1rem', padding: '12px 24px' }}>Proceed to Quiz</button>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '1.8rem' }}>3. Challenge Check</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '20px' }}>Which of the following is core to {course.title}?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
            <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '15px', textAlign: 'left', fontSize: '1.1rem' }} onClick={() => alert("Incorrect! Try again.")}>A. Irrelevant Option</button>
            <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '15px', textAlign: 'left', fontSize: '1.1rem' }} onClick={() => setStep(4)}>B. Core Principles & Logic</button>
          </div>
        </motion.div>
      )}

      {step === 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '16px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem' }}>4. Video Masterclass</h2>
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${color}` }}>
              <PlayCircle size={64} color={color} className="animate-pulse-slow" />
            </div>
          </div>
          <button className="btn-primary" onClick={() => {
            awardCertificate(course.title);
            onComplete();
          }} style={{ background: color, border: 'none', color: '#000', width: '100%', fontSize: '1.1rem', padding: '15px' }}>Finish Course & Claim Certificate</button>
        </motion.div>
      )}
    </div>
  );
};

const CourseDirectory = ({ color }) => {
  const { score, unlockedCourses, unlockCourse, addScore, resumeSession, saveResumeState } = useGamification();
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeStd, setActiveStd] = useState('All');

  useEffect(() => {
    // If a resume session is triggered, auto load it
    if (resumeSession && resumeSession.action === 'load') {
       const course = DUMMY_COURSES.find(c => c.id === resumeSession.id);
       if (course) {
          setActiveCourse({ ...course, initStep: resumeSession.step });
          saveResumeState(resumeSession.id, resumeSession.step); // remove action flag
       }
    }
  }, [resumeSession, saveResumeState]);

  if (activeCourse) {
    return <CourseView 
            course={activeCourse} 
            color={color} 
            initStep={activeCourse.initStep}
            setResumeState={saveResumeState}
            onBack={() => setActiveCourse(null)} 
            onComplete={() => {
              addScore(100);
              unlockCourse(activeCourse.id + 1);
              setActiveCourse(null);
              saveResumeState(null, null);
              alert("Course completed! +100 Coins & Certificate Unlocked!");
            }} 
          />;
  }

  const filteredCourses = activeStd === 'All' ? DUMMY_COURSES : DUMMY_COURSES.filter(c => c.std === activeStd);

  return (
    <div style={{ display: 'grid', gap: '15px', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
         <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Courses Database</h2>
         <select value={activeStd} onChange={e => setActiveStd(e.target.value)} style={{ padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', color: 'white', border: `1px solid ${color}` }}>
            <option value="All">All Standards</option>
            <option value="6-8">Class 6-8</option>
            <option value="9-10">Class 9-10</option>
            <option value="11-12">Class 11-12</option>
         </select>
      </div>
      
      {resumeSession?.id && (
         <div onClick={() => setActiveCourse({...DUMMY_COURSES.find(c=>c.id===resumeSession.id), initStep: resumeSession.step})} style={{ background: `linear-gradient(90deg, ${color}22, transparent)`, padding: '15px', borderRadius: '12px', border: `1px solid ${color}`, marginBottom: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
               <h4 style={{ margin: 0, color: color }}>Resume Session</h4>
               <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Continue exactly where you left off.</p>
            </div>
            <PlayCircle color={color} size={24} />
         </div>
      )}

      {filteredCourses.map(c => {
         const isUnlocked = unlockedCourses.includes(c.id);
         const isCompleted = unlockedCourses.includes(c.id + 1); // Mock completion logic
         return (
           <div key={c.id} onClick={() => isUnlocked && !isCompleted ? setActiveCourse(c) : null} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: isUnlocked ? 1 : 0.5, cursor: isUnlocked && !isCompleted ? 'pointer' : 'default', border: isCompleted ? '1px solid #10B981' : (isUnlocked ? `1px solid ${color}` : '1px solid transparent'), transition: 'all 0.3s' }}>
              <div>
                 <h3 style={{ margin: 0, color: isCompleted ? '#10B981' : 'white' }}>{c.title}</h3>
                 <p style={{ margin: '5px 0 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Std {c.std} • {c.level} • {c.duration}</p>
              </div>
              <div>
                 {isCompleted ? <CheckCircle color="#10B981" /> : (isUnlocked ? <Unlock color={color} /> : <Lock color="gray" />)}
              </div>
           </div>
         )
      })}
    </div>
  )
}

const ProjectsDirectory = ({ color }) => {
  const { unlockedProjects } = useGamification();

  if (!unlockedProjects) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(0,0,0,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <Lock size={64} color="gray" style={{ margin: '0 auto 20px' }}/>
        <h2 style={{ fontSize: '2rem' }}>Projects Database Locked</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '500px', margin: '0 auto' }}>You must reach a Score of 50 by completing courses/puzzles to unlock real-world projects.</p>
      </div>
    );
  }

  const projects = [
    { id: 1, title: 'E-Commerce Backend API', desc: 'Build a secure REST API with Node.js and Express.', status: 'Unlocked' },
    { id: 2, title: 'AI Facial Recognition Flow', desc: 'Integrate OpenCV standard hooks for recognition.', status: 'Unlocked' },
    { id: 3, title: 'React Gamified Dashboard', desc: 'Compile a personalized React frontend mapping.', status: 'Unlocked' }
  ];

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Unlocked Real-World Projects</h2>
      <div style={{ display: 'grid', gap: '20px' }}>
        {projects.map(p => (
          <div key={p.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px', border: `1px solid ${color}44` }}>
            <h3 style={{ fontSize: '1.3rem', margin: '0 0 10px 0' }}>{p.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '15px' }}>{p.desc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>{p.status}</span>
              <button className="btn-primary" style={{ background: 'transparent', border: `1px solid ${color}`, color: 'white', padding: '8px 16px' }} onClick={() => alert('Launching Project IDE (Dummy)...')}>Start Coding</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function NovaHub() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [activePortal, setActivePortal] = useState(null);
  
  const { score, deductScore, addScore, certificates, resumeSession, saveResumeState } = useGamification();

  // Internal states for complex cards
  const [studyPlanStep, setStudyPlanStep] = useState(0);
  const [studyPlanForm, setStudyPlanForm] = useState({ name: '', std: '', subjects: '', goals: '' });
  
  const [testStep, setTestStep] = useState(0);
  
  const [convertStep, setConvertStep] = useState(0);
  
  const [buyBook, setBuyBook] = useState(null);

  const cards = [
    { id: 'n1', title: "Study Planner", description: "Set goals and get your custom learning path.", icon: <Calendar size={24} />, color: "#FACC15" },
    { id: 'n2', title: "Skill Learning Hub", description: "15+ interactive courses organized by standard.", icon: <MonitorPlay size={24} />, color: "#EF4444" },
    { id: 'n3', title: "Mock Tests", description: "Aptitude and Coding quizzes leading to coin rewards.", icon: <Puzzle size={24} />, color: "#8B2FF5" },
    { id: 'n4', title: "Project Assignments", description: "Unlockable real world projects based on level.", icon: <Target size={24} />, color: "#10B981" },
    { id: 'n5', title: "Coin Conversion", description: "Withdraw your learning coins to Paytm/PhonePe.", icon: <Coins size={24} />, color: "#F59E0B" },
    { id: 'n6', title: "Study Store", description: "Buy premium notes & books with dummy payment UI.", icon: <BookOpen size={24} />, color: "#6366F1" },
    { id: 'n7', title: "Quiz & Puzzles", description: "Solve logical puzzles daily and earn coins.", icon: <HelpCircle size={24} />, color: "#EC4899" },
    { id: 'n8', title: "Performance Dashboard", description: "Visualize daily metrics, streaks, and stats.", icon: <BarChart size={24} />, color: "#8B2FF5" },
    { id: 'n9', title: "Live Classes", description: "15+ scheduled streaming classes (Arts, Coding).", icon: <Video size={24} />, color: "#EF4444" },
    { id: 'n10', title: "Peer Groups", description: "Chat with friends and join Zoom meetings.", icon: <Users size={24} />, color: "#14B8A6" },
    { id: 'n11', title: "Certifications", description: "View generated blockchain certificates.", icon: <Award size={24} />, color: "#3B82F6" },
    { id: 'n12', title: "Leaderboard", description: "Global ranking of top 10 performers.", icon: <Trophy size={24} />, color: "#EAB308" },
    { id: 'n13', title: "Resume Learning", description: "Quickly continue your last active session.", icon: <PlayCircle size={24} />, color: "#FACC15" }
  ];

  const handlePortalSwitch = (card) => {
     setActivePortal(card);
     setSelectedCard(null);
  };

  if (activePortal) {
    return (
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} style={{ padding: '0 20px 40px 20px', display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
        <button onClick={() => setActivePortal(null)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', width: 'max-content', marginBottom: '20px' }}>
          <X size={16} /> Back to Hub
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
          <div style={{ color: activePortal.color, background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px' }}>
            {React.cloneElement(activePortal.icon, { size: 32 })}
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '2.5rem' }}>{activePortal.title} Portal</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1.2rem' }}>{activePortal.description}</p>
          </div>
        </div>

        {activePortal.id === 'n2' ? (
          <CourseDirectory color={activePortal.color} />
        ) : activePortal.id === 'n4' ? (
          <ProjectsDirectory color={activePortal.color} />
        ) : (
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '24px', border: `1px solid ${activePortal.color}44`, padding: '40px' }}>
             
             {/* PERFORMANCE DASHBOARD */}
             {activePortal.id === 'n8' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                   <div style={{ flex: '1 1 300px', background: 'rgba(139, 47, 245, 0.1)', padding: '20px', borderRadius: '16px', border: '1px solid #8B2FF5' }}>
                      <h3 style={{ margin: '0 0 10px 0' }}>Profile Metrics</h3>
                      <p style={{ fontSize: '1.2rem', margin: '5px 0' }}>Coins: <strong style={{ color: '#F59E0B' }}>{score}</strong></p>
                      <p style={{ fontSize: '1.2rem', margin: '5px 0' }}>Certs: <strong>{certificates.length}</strong></p>
                      <p style={{ fontSize: '1.2rem', margin: '5px 0' }}>Classes Done: <strong>5</strong></p>
                      <p style={{ fontSize: '1.2rem', margin: '5px 0' }}>Test Accuracy: <strong style={{ color: '#10B981' }}>87%</strong></p>
                      <p style={{ fontSize: '1.2rem', margin: '5px 0' }}>Attendance: <strong>92%</strong></p>
                   </div>
                   <div style={{ flex: '2 1 400px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px' }}>
                      <h3 style={{ margin: '0 0 15px 0' }}>Weekly Activity Chart (Mock)</h3>
                      <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '15px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }}>
                         {[40, 70, 45, 90, 60, 100, 80].map((h, i) => (
                           <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1, delay: i*0.1 }} style={{ flex: 1, background: `linear-gradient(180deg, ${activePortal.color}, transparent)`, borderRadius: '4px 4px 0 0' }}></motion.div>
                         ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                         <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                      </div>
                   </div>
                </div>
             )}

             {/* LIVE CLASSES */}
             {activePortal.id === 'n9' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                   {DUMMY_LIVE_CLASSES.map(live => (
                     <div key={live.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', border: `1px solid ${activePortal.color}40`, position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 10, right: 10, background: '#EF4444', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', padding: '2px 8px', borderRadius: '12px', animation: 'pulse 2s infinite' }}>LIVE</div>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{live.title}</h4>
                        <p style={{ margin: '0 0 15px 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Host: {live.host} • {live.time}</p>
                        <button className="btn-primary" onClick={() => alert("Joining dummy Zoom meeting...")} style={{ width: '100%', background: 'transparent', border: `1px solid ${activePortal.color}`, color: activePortal.color }}>Join Session</button>
                     </div>
                   ))}
                </div>
             )}

             {/* PEER GROUPS */}
             {activePortal.id === 'n10' && (
                <div style={{ display: 'flex', height: '60vh', gap: '20px' }}>
                   <div style={{ width: '250px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px' }}>
                      <h4 style={{ margin: '0 0 15px 0' }}>Active Groups</h4>
                      <div style={{ padding: '10px', background: 'rgba(20, 184, 166, 0.2)', borderRadius: '8px', marginBottom: '10px', cursor: 'pointer' }}>🚀 Web Dev React Group</div>
                      <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '10px', cursor: 'pointer' }}>🎨 Drawing & Arts</div>
                      <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer' }}>🤖 AI Enthusiasts</div>
                      <button className="btn-primary" style={{ width: '100%', marginTop: '20px', background: activePortal.color, border: 'none', color: '#000' }} onClick={() => alert("Launching Dummy Zoom Room")}>Join Room Call</button>
                   </div>
                   <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ flex: 1, overflowY: 'auto' }}>
                         <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 15px', borderRadius: '12px', width: 'max-content', marginBottom: '10px' }}><p style={{ margin:0, fontSize:'0.8rem', color:'#14B8A6' }}>Alex</p>Has anyone figured out the puzzle?</div>
                         <div style={{ background: '#14B8A6', color: '#000', padding: '10px 15px', borderRadius: '12px', width: 'max-content', alignSelf: 'flex-end', marginLeft: 'auto', marginBottom: '10px' }}>Yes, it relies on binary search.</div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                         <input type="text" placeholder="Type a message..." style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #14B8A6', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
                         <button className="btn-primary" style={{ background: '#14B8A6', border: 'none', color: '#000', padding: '0 20px' }}><Send size={20}/></button>
                      </div>
                   </div>
                </div>
             )}

             {/* LEADERBOARD */}
             {activePortal.id === 'n12' && (
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                   {LEADERBOARD_MEMBERS.map(member => (
                      <div key={member.rank} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: member.rank === 3 ? 'rgba(234, 179, 8, 0.15)' : 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', marginBottom: '10px', border: member.rank === 3 ? '1px solid #EAB308' : 'none' }}>
                         <h2 style={{ margin: 0, color: member.rank <= 3 ? '#EAB308' : 'gray', width: '40px' }}>#{member.rank}</h2>
                         <img src={member.img} alt="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                         <div style={{ flex: 1 }}>
                            <h4 style={{ margin: 0 }}>{member.name}</h4>
                         </div>
                         <strong style={{ color: '#EAB308' }}>{member.score} pts</strong>
                      </div>
                   ))}
                </div>
             )}

             {/* CERTIFICATIONS */}
             {activePortal.id === 'n11' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                   {certificates.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>Complete courses to earn certificates.</p> : certificates.map(cert => (
                      <div key={cert.id} style={{ width: '400px', background: 'linear-gradient(135deg, #1e3a8a, #000)', padding: '30px', borderRadius: '16px', border: '2px solid #3B82F6', textAlign: 'center', position: 'relative' }}>
                         <Award size={48} color="#3B82F6" style={{ margin: '0 auto 10px auto' }} />
                         <h2 style={{ margin: '0 0 10px 0', fontFamily: 'serif' }}>Certificate of Completion</h2>
                         <p style={{ margin: 0, color: 'var(--text-muted)' }}>This certifies that</p>
                         <h3 style={{ margin: '10px 0', color: '#FACC15', fontSize: '1.5rem' }}>Meghana</h3>
                         <p style={{ margin: 0, color: 'var(--text-muted)' }}>has successfully completed</p>
                         <h4 style={{ margin: '10px 0', color: 'white' }}>{cert.title}</h4>
                         <p style={{ margin: '20px 0 0 0', fontSize: '0.8rem', color: '#3B82F6' }}>Issued: {cert.date} | ID: {cert.id}</p>
                         <button className="btn-primary" style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.1)', border: 'none', padding: '5px' }}><Download size={16}/></button>
                      </div>
                   ))}
                </div>
             )}

          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 style={{ marginBottom: '10px' }}>Nova <span className="glow-text">Learn</span></h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Your ultimate gamified learning, testing, and earning hub.</p>
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
              onClick={() => {
                 if (card.id === 'n13') { // Resume Tracking Auto-trigger
                    if (resumeSession && resumeSession.id) {
                       saveResumeState(resumeSession.id, resumeSession.step);
                       // hack: push an action flag
                       setResumeSessionState({...resumeSession, action:'load'});
                       setActivePortal(cards.find(c => c.id === 'n2'));
                    } else {
                       alert("No active session found. Start a course first!");
                    }
                 } else {
                    setSelectedCard(card);
                    setStudyPlanStep(0);
                    setTestStep(0);
                    setConvertStep(0);
                    setBuyBook(null);
                 }
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* MODAL SYSTEM */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              layoutId={`card-container-${selectedCard.id}`}
              style={{ background: 'var(--bg-dark)', border: `1px solid ${selectedCard.color}`, borderRadius: '24px', padding: '40px', width: '600px', maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: `0 0 50px ${selectedCard.color}44` }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCard(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', padding: '8px', borderRadius: '50%' }}
              ><X size={20} /></button>
              
              <motion.div layoutId={`card-icon-${selectedCard.id}`} style={{ color: selectedCard.color, marginBottom: '20px', display: 'inline-block', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px' }}>
                {React.cloneElement(selectedCard.icon, { size: 32 })}
              </motion.div>
              <motion.h2 layoutId={`card-title-${selectedCard.id}`} style={{ fontSize: '2rem', marginBottom: '10px' }}>{selectedCard.title}</motion.h2>
              <motion.p layoutId={`card-desc-${selectedCard.id}`} style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem' }}>{selectedCard.description}</motion.p>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                
                {/* 1. STUDY PLANNER */}
                {selectedCard.id === 'n1' && (
                   <div>
                     {studyPlanStep === 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                           <input type="text" placeholder="Name" value={studyPlanForm.name} onChange={e=>setStudyPlanForm({...studyPlanForm, name: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: `1px solid ${selectedCard.color}`, color: 'white' }} />
                           <select value={studyPlanForm.std} onChange={e=>setStudyPlanForm({...studyPlanForm, std: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: `1px solid ${selectedCard.color}`, color: 'white' }}>
                              <option value="">Select Standard/Class</option>
                              <option value="6-8">Class 6th - 8th</option>
                              <option value="9-10">Class 9th - 10th</option>
                              <option value="11-12">Class 11th - 12th</option>
                           </select>
                           <input type="text" placeholder="Favorite Subjects (e.g. Math, Coding)" value={studyPlanForm.subjects} onChange={e=>setStudyPlanForm({...studyPlanForm, subjects: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: `1px solid ${selectedCard.color}`, color: 'white' }} />
                           <input type="text" placeholder="Goal (e.g. Learn AI, Pass Exams)" value={studyPlanForm.goals} onChange={e=>setStudyPlanForm({...studyPlanForm, goals: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: `1px solid ${selectedCard.color}`, color: 'white' }} />
                           <button className="btn-primary" style={{ background: selectedCard.color, color: '#000', border: 'none', padding: '15px' }} onClick={() => setStudyPlanStep(1)}>Generate Study Plan</button>
                        </div>
                     )}
                     {studyPlanStep === 1 && (
                        <div style={{ textAlign: 'center' }}>
                           <h3 style={{ color: selectedCard.color }}>Your Personalized Path</h3>
                           <p style={{ color: 'var(--text-muted)' }}>Based on your goal "{studyPlanForm.goals}", we recommend these courses:</p>
                           <ul style={{ textAlign: 'left', background: 'rgba(0,0,0,0.4)', padding: '20px 40px', borderRadius: '12px', color: 'white' }}>
                              {DUMMY_COURSES.filter(c => c.std === studyPlanForm.std).slice(0, 3).map(c => <li key={c.id} style={{ margin: '10px 0' }}>{c.title} ({c.level})</li>)}
                           </ul>
                           <button className="btn-primary" style={{ background: 'transparent', border: `1px solid ${selectedCard.color}`, color: selectedCard.color, marginTop: '20px', width: '100%' }} onClick={() => handlePortalSwitch(cards.find(c=>c.id==='n2'))}>Go to Courses Now</button>
                        </div>
                     )}
                   </div>
                )}

                {/* 3 & 7. MOCK TESTS & QUIZZES */}
                {(selectedCard.id === 'n3' || selectedCard.id === 'n7') && (
                   <div>
                     {testStep === 0 && (
                        <div style={{ textAlign: 'center' }}>
                           <h3 style={{ marginBottom: '15px' }}>{selectedCard.id === 'n3' ? 'Aptitude & Coding Mock Test' : 'Daily Logic Puzzle'}</h3>
                           <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Solve this to earn 50 Coins instantly!</p>
                           <button className="btn-primary" style={{ background: selectedCard.color, color: 'white', padding: '15px 30px', border: 'none' }} onClick={() => setTestStep(1)}>Start Now</button>
                        </div>
                     )}
                     {testStep === 1 && (
                        <div>
                           <h4>Q1. If 5 machines make 5 items in 5 mins, how long for 100 machines to make 100 items?</h4>
                           <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                              <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }} onClick={() => alert("Wrong!")}>100 Mins</button>
                              <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: `1px solid ${selectedCard.color}`, textAlign: 'left' }} onClick={() => { addScore(50); setTestStep(2); }}>5 Mins (Correct)</button>
                              <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }} onClick={() => alert("Wrong!")}>50 Mins</button>
                           </div>
                        </div>
                     )}
                     {testStep === 2 && (
                        <div style={{ textAlign: 'center' }}>
                           <h2 style={{ color: '#10B981' }}>Brilliant!</h2>
                           <p style={{ color: 'var(--text-muted)' }}>You scored perfectly and earned 50 Coins.</p>
                           <button className="btn-primary" style={{ background: 'transparent', border: `1px solid ${selectedCard.color}`, color: selectedCard.color, marginTop: '20px' }} onClick={() => setSelectedCard(null)}>Close</button>
                        </div>
                     )}
                   </div>
                )}

                {/* 5. COIN CONVERSION */}
                {selectedCard.id === 'n5' && (
                   <div style={{ textAlign: 'center' }}>
                     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', fontSize: '3rem', marginBottom: '30px' }}>
                       <Coins color="#F59E0B" size={48} /> <span style={{ fontWeight: 'bold' }}>{score}</span>
                     </div>
                     {convertStep === 0 && (
                        <>
                           <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Convert rate: 1000 Coins = ₹10 (Dummy)</p>
                           <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                              <input type="text" placeholder="Enter PhonePe / Paytm Number" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: `1px solid ${selectedCard.color}`, color: 'white' }} />
                              <select style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', border: `1px solid ${selectedCard.color}`, color: 'white' }}>
                                 <option>PhonePe</option><option>Paytm</option>
                              </select>
                           </div>
                           <button className="btn-primary" onClick={() => {
                              if(score >= 1000) { deductScore(1000); setConvertStep(1); } else { alert("Not enough coins! Need 1000+"); }
                           }} style={{ width: '100%', height: '50px', fontSize: '1.1rem', background: 'linear-gradient(135deg, #F59E0B, #E11D48)', border: 'none' }}>
                             Withdraw ₹10
                           </button>
                        </>
                     )}
                     {convertStep === 1 && (
                        <div>
                           <CheckCircle size={64} color="#10B981" style={{ margin: '0 auto 20px auto' }} />
                           <h3 style={{ color: '#10B981' }}>Transfer Successful!</h3>
                           <p style={{ color: 'var(--text-muted)' }}>₹10 has been simulated to your account.</p>
                           <button className="btn-primary" onClick={() => setSelectedCard(null)} style={{ background: 'transparent', border: `1px solid ${selectedCard.color}`, color: selectedCard.color, marginTop: '20px' }}>Close Window</button>
                        </div>
                     )}
                   </div>
                )}

                {/* 6. STUDY STORE */}
                {selectedCard.id === 'n6' && (
                   <div>
                     {buyBook === null ? (
                        <div style={{ display: 'grid', gap: '15px', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
                           {DUMMY_BOOKS.map(book => (
                              <div key={book.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px' }}>
                                 <div>
                                    <h4 style={{ margin: '0 0 5px 0' }}>{book.title}</h4>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{book.desc}</p>
                                 </div>
                                 <button className="btn-primary" style={{ background: 'transparent', border: `1px solid ${selectedCard.color}`, color: selectedCard.color, minWidth: '80px' }} onClick={() => setBuyBook(book)}>₹{book.price}</button>
                              </div>
                           ))}
                        </div>
                     ) : (
                        <div style={{ textAlign: 'center' }}>
                           <h3>Purchase: {buyBook.title}</h3>
                           <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Amount to pay: ₹{buyBook.price}</p>
                           <div style={{ background: 'white', padding: '20px', borderRadius: '16px', display: 'inline-block', marginBottom: '20px' }}>
                              <QrCode size={120} color="#000" />
                              <p style={{ color: '#000', margin: '10px 0 0 0', fontWeight: 'bold' }}>Scan via PhonePe (Dummy)</p>
                           </div>
                           <div style={{ display: 'flex', gap: '10px' }}>
                              <button className="btn-primary" style={{ flex: 1, background: 'linear-gradient(90deg, #5f259f, #8138d6)', border: 'none', color: 'white' }} onClick={() => { alert("Mock Purchase Successful!"); setBuyBook(null); }}>Simulate Payment</button>
                              <button className="btn-primary" style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }} onClick={() => setBuyBook(null)}>Cancel</button>
                           </div>
                        </div>
                     )}
                   </div>
                )}

                {/* GENERIC FULL PORTALS */}
                {['n4', 'n8', 'n9', 'n10', 'n11', 'n12'].includes(selectedCard.id) && (
                  <div style={{ textAlign: 'center', padding: '10px 0' }}>
                    <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px' }} alt="Module Illustration" />
                    <h3 style={{ marginBottom: '10px' }}>{selectedCard.title} Ecosystem</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '15px' }}>Access your personalized {selectedCard.title.toLowerCase()} view.</p>
                    <button 
                      className="btn-primary" 
                      onClick={() => handlePortalSwitch(selectedCard)}
                      style={{ width: '100%', background: `linear-gradient(135deg, ${selectedCard.color}, #000)`, border: 'none', cursor: 'pointer', padding: '15px', fontSize: '1.1rem' }}
                    >
                      Enter Full Portal
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
