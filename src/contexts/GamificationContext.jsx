import React, { createContext, useContext, useState, useEffect } from 'react';

const GamificationContext = createContext();

export function useGamification() {
  return useContext(GamificationContext);
}

export function GamificationProvider({ children }) {
  const [score, setScore] = useState(0); // Also used as coins
  const [unlockedCourses, setUnlockedCourses] = useState([1]); 
  const [unlockedProjects, setUnlockedProjects] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [streak, setStreak] = useState(1);
  const [resumeSession, setResumeSession] = useState(null); // { id: 1, step: 2 }

  // Init from localStorage
  useEffect(() => {
    const savedScore = parseInt(localStorage.getItem('vn_score') || '0');
    const savedCourses = JSON.parse(localStorage.getItem('vn_courses') || '[1]');
    const savedProjects = localStorage.getItem('vn_projects') === 'true';
    const savedCerts = JSON.parse(localStorage.getItem('vn_certs') || '[]');
    const savedStreak = parseInt(localStorage.getItem('vn_streak') || '1');
    const savedResume = JSON.parse(localStorage.getItem('vn_resume') || 'null');

    setScore(savedScore);
    setUnlockedCourses(savedCourses);
    setUnlockedProjects(savedProjects);
    setCertificates(savedCerts);
    setStreak(savedStreak);
    setResumeSession(savedResume);

    // Simple streak logic (daily increment mockup over sessions)
    const lastLogin = localStorage.getItem('vn_last_login');
    const today = new Date().toDateString();
    if (lastLogin !== today) {
       if (lastLogin) {
          const newStreak = savedStreak + 1;
          setStreak(newStreak);
          localStorage.setItem('vn_streak', newStreak);
       }
       localStorage.setItem('vn_last_login', today);
    }
  }, []);

  const addScore = (points) => {
    const newScore = score + Math.max(0, points);
    setScore(newScore);
    localStorage.setItem('vn_score', newScore);
    if (newScore >= 50 && !unlockedProjects) {
      setUnlockedProjects(true);
      localStorage.setItem('vn_projects', 'true');
    }
  };

  const deductScore = (points) => {
    if (score >= points) {
      const newScore = score - points;
      setScore(newScore);
      localStorage.setItem('vn_score', newScore);
      return true;
    }
    return false;
  }

  const unlockCourse = (courseId) => {
    if (!unlockedCourses.includes(courseId)) {
      const updated = [...unlockedCourses, courseId];
      setUnlockedCourses(updated);
      localStorage.setItem('vn_courses', JSON.stringify(updated));
    }
  };

  const awardCertificate = (courseName) => {
    const newCert = { id: Date.now(), title: courseName, date: new Date().toLocaleDateString() };
    const updated = [...certificates, newCert];
    setCertificates(updated);
    localStorage.setItem('vn_certs', JSON.stringify(updated));
  };

  const saveResumeState = (courseId, step) => {
    const state = { id: courseId, step };
    setResumeSession(state);
    localStorage.setItem('vn_resume', JSON.stringify(state));
  };

  return (
    <GamificationContext.Provider value={{ 
      score, addScore, deductScore, 
      unlockedCourses, unlockCourse, 
      unlockedProjects,
      certificates, awardCertificate,
      streak,
      resumeSession, saveResumeState
    }}>
      {children}
    </GamificationContext.Provider>
  );
}
