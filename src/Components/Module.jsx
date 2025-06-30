import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Module = () => {
  const [showCameraPermission, setShowCameraPermission] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show camera permission dialog after a short delay
    const timer = setTimeout(() => {
      setShowCameraPermission(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAllowCamera = () => {
    setShowCameraPermission(false);
    // In a real app, this would trigger the camera permission request
  };

  const handleStartLesson = () => {
    setShowLessonModal(true);
    
    // Remove modal after delay
    setTimeout(() => {
      setShowLessonModal(false);
      navigate('/basketballmotion');
    }, 2000);
  };

  // Color map for hex values (consistent with other components)
  const colorMap = {
    blue50: '#E6F3FF',
    blue100: '#B3D8FF',
    blue600: '#2563EB',
    blue800: '#1E40AF',
    white: '#FFFFFF',
    black: '#000000',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    orange500: '#F97316',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: colorMap.blue50, fontFamily: 'Inter, sans-serif',  maxWidth:'100vw'}}>
      <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, position: 'absolute', top: 0, left: 0, zIndex: 10 }}>
        <div style={{ fontFamily: 'Pacifico, cursive', fontSize: 24, color: colorMap.blue600 }}>ARLearn</div>
      </header>

      <main style={{ width: '100%', maxWidth: 340, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* AR Camera View Container */}
        <div style={{ position: 'relative', width: '100%', background: '#111827E6', borderRadius: 18, overflow: 'hidden', boxShadow: '0 6px 18px 0 rgba(31,41,55,0.12)', marginBottom: 16, aspectRatio: '9/16' }}>
          {/* Camera Feed (simulated) */}
          <div style={{ position: 'absolute', inset: 0, background: '#00000033' }}></div>
          {/* AR Frame Corners */}
          <div style={{ position: 'absolute', width: 20, height: 20, borderTop: '3px solid #FFFFFF', borderLeft: '3px solid #FFFFFF', top: 20, left: 20 }}></div>
          <div style={{ position: 'absolute', width: 20, height: 20, borderTop: '3px solid #FFFFFF', borderRight: '3px solid #FFFFFF', top: 20, right: 20 }}></div>
          <div style={{ position: 'absolute', width: 20, height: 20, borderBottom: '3px solid #FFFFFF', borderLeft: '3px solid #FFFFFF', bottom: 20, left: 20 }}></div>
          <div style={{ position: 'absolute', width: 20, height: 20, borderBottom: '3px solid #FFFFFF', borderRight: '3px solid #FFFFFF', bottom: 20, right: 20 }}></div>
          {/* Scan Line Effect */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)', animation: 'pulse 2s infinite' }}></div>
          {/* AR Content */}
          <div style={{ position: 'absolute', width: 100, height: 140, background: colorMap.white, borderRadius: 16, boxShadow: '0 2px 8px 0 rgba(31,41,55,0.10)', left: '50%', bottom: '25%', marginLeft: -50 }}>
            <div style={{ position: 'absolute', width: 40, height: 40, background: colorMap.orange500, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', top: 20, left: 30 }}>
              <span style={{ color: colorMap.white, fontSize: 22 }}>🏀</span>
            </div>
          </div>
          {/* Projectile Arc */}
          <div style={{ position: 'absolute', borderTop: '2px dashed #FFFFFF', borderRadius: '9999px 9999px 0 0', width: 120, height: 80, transform: 'rotate(-30deg)', top: '40%', left: '50%', marginLeft: -60, marginTop: -40 }}></div>
          {/* Basketball */}
          <div style={{ position: 'absolute', width: 40, height: 40, borderRadius: '50%', boxShadow: '0 2px 8px 0 rgba(31,41,55,0.10)', background: 'linear-gradient(135deg, #FF8C00, #D2691E)', top: '50%', left: '50%', marginLeft: -20, marginTop: -60, animation: 'bounce 1.5s infinite' }}>
            <div style={{ position: 'absolute', width: 20, height: 8, background: '#FFFFFF4D', borderRadius: 8, top: 5, left: 15, transform: 'rotate(-40deg)' }}></div>
          </div>
          {/* Detection Status */}
          <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', background: '#00000080', backdropFilter: 'blur(4px)', padding: '8px 16px', borderRadius: 9999, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 24, border: '3px solid #FFFFFF4D', borderTop: `3px solid ${colorMap.white}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <span style={{ color: colorMap.white, fontSize: 13 }}>Detecting STEM Concept...</span>
          </div>
          {/* Camera Permission Request */}
          {showCameraPermission && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000B3' }}>
              <div style={{ background: colorMap.white, padding: 24, borderRadius: 14, textAlign: 'center', maxWidth: 320 }}>
                <div style={{ width: 64, height: 64, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#2563EB1A', borderRadius: '50%' }}>
                  <span style={{ color: colorMap.blue600, fontSize: 32 }}>📷</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, color: colorMap.gray800 }}>Camera Access Required</h3>
                <p style={{ color: colorMap.gray600, fontSize: 13, marginBottom: 16 }}>We need camera access to enable the AR experience for STEM learning</p>
                <button 
                  onClick={handleAllowCamera}
                  style={{ background: colorMap.blue600, color: colorMap.white, padding: '8px 0', borderRadius: 8, width: '100%', cursor: 'pointer', fontWeight: 500, fontSize: 15, border: 'none', whiteSpace: 'nowrap' }}
                >
                  Allow Camera
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Lesson Start Button */}
        <div 
          onClick={handleStartLesson}
          style={{ width: '100%', background: colorMap.white, borderRadius: 16, padding: 16, boxShadow: '0 2px 8px 0 rgba(31,41,55,0.10)', cursor: 'pointer', marginBottom: 0, animation: 'pulse 2s infinite' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, background: '#2563EB1A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: colorMap.blue600, fontSize: 20 }}>▶️</span>
            </div>
            <p style={{ color: colorMap.gray800, fontWeight: 500, fontSize: 15, margin: 0 }}>Tap to Start Lesson on Projectile Motion</p>
          </div>
        </div>
        {/* Feature Highlights */}
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 24 }}>
          <div style={{ background: '#FFFFFFCC', backdropFilter: 'blur(4px)', padding: 12, borderRadius: 10, textAlign: 'center' }}>
            <div style={{ width: 40, height: 40, margin: '0 auto 8px', background: colorMap.blue100, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: colorMap.blue600, fontSize: 18 }}>🎲</span>
            </div>
            <p style={{ fontSize: 11, color: colorMap.gray700, margin: 0 }}>3D Models</p>
          </div>
          <div style={{ background: '#FFFFFFCC', backdropFilter: 'blur(4px)', padding: 12, borderRadius: 10, textAlign: 'center' }}>
            <div style={{ width: 40, height: 40, margin: '0 auto 8px', background: colorMap.blue100, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: colorMap.blue600, fontSize: 18 }}>👑</span>
            </div>
            <p style={{ fontSize: 11, color: colorMap.gray700, margin: 0 }}>Interactive</p>
          </div>
          <div style={{ background: '#FFFFFFCC', backdropFilter: 'blur(4px)', padding: 12, borderRadius: 10, textAlign: 'center' }}>
            <div style={{ width: 40, height: 40, margin: '0 auto 8px', background: colorMap.blue100, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: colorMap.blue600, fontSize: 18 }}>📚</span>
            </div>
            <p style={{ fontSize: 11, color: colorMap.gray700, margin: 0 }}>STEM Learning</p>
          </div>
        </div>
      </main>
      {/* Lesson Modal */}
      {showLessonModal && (
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#00000080', zIndex: 50 }}>
          <div style={{ background: colorMap.white, padding: 24, borderRadius: 14, maxWidth: 320 }}>
            <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, color: colorMap.gray800 }}>Starting Lesson</h3>
            <p style={{ color: colorMap.gray600, fontSize: 14, marginBottom: 16 }}>Launching AR lesson on Projectile Motion...</p>
            <div style={{ width: 24, height: 24, margin: '0 auto', border: '3px solid #2563EB4D', borderTop: `3px solid ${colorMap.blue600}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Module;