import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as echarts from 'echarts';

const colorMap = {
  blue50: '#EFF6FF',
  blue100: '#DBEAFE',
  blue400: '#60A5FA',
  blue500: '#3B82F6',
  blue600: '#2563EB',
  green500: '#10B981',
  green600: '#059669',
  yellow100: '#FEF9C3',
  yellow300: '#FCD34D',
  yellow400: '#FACC15',
  yellow500: '#EAB308',
  yellow600: '#CA8A04',
  gray200: '#E5E7EB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  white: '#FFFFFF',
  orange500: '#F97316',
};

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score ?? 0;
  const total = location.state?.total ?? 3;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const progressChart = echarts.init(document.getElementById('progress-chart'));
    const option = {
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: { show: false },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: { color: colorMap.green500 }
          },
          axisLine: {
            lineStyle: {
              width: 18,
              color: [[1, '#E0E0E0']]
            }
          },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          detail: { show: false },
          data: [{ value: (score / total) * 100 }]
        }
      ],
      animation: false
    };
    progressChart.setOption(option);
    return () => {
      progressChart.dispose();
    };
  }, [score, total]);

  // Confetti colors
  const confettiColors = ['#FFD700', '#4CAF50', '#2196F3', '#FF5722'];

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(to bottom, ${colorMap.blue50}, ${colorMap.white})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
      {/* Confetti animation */}
      {showConfetti && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}>
          {[...Array(50)].map((_, i) => {
            const left = Math.random() * 100;
            const size = Math.random() * 10 + 5;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            return (
              <div
                key={i}
                className="animate-confetti"
                style={{
                  position: 'absolute',
                  left: `${left}%`,
                  top: '-5%',
                  backgroundColor: color,
                  width: size,
                  height: size,
                  borderRadius: 4,
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`
                }}
              />
            );
          })}
        </div>
      )}

      <div style={{ maxWidth: 768, width: '100%', background: colorMap.white, borderRadius: 24, boxShadow: '0 10px 32px 0 rgba(31,41,55,0.08)', padding: 32, position: 'relative', overflow: 'hidden' }}>
        {/* Background decoration */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: 256, height: 256, background: colorMap.yellow100, borderRadius: '50%', marginRight: -128, marginTop: -128, opacity: 0.5 }}></div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 192, height: 192, background: colorMap.blue100, borderRadius: '50%', marginLeft: -96, marginBottom: -96, opacity: 0.5 }}></div>
        {/* Score section */}
        <div style={{ textAlign: 'center', marginBottom: 40, position: 'relative' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: colorMap.gray800, marginBottom: 8 }}>You scored {score}/{total}!</h1>
          <p style={{ fontSize: 18, color: colorMap.gray600 }}>Perfect score! Outstanding work!</p>
        </div>
        {/* Badge section */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 160, height: 160, borderRadius: '50%', background: `linear-gradient(90deg, ${colorMap.yellow300}, ${colorMap.yellow500})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px 0 rgba(250,204,21,0.15)', animation: 'pulse 2s infinite' }}>
              <div style={{ width: 144, height: 144, borderRadius: '50%', background: `linear-gradient(90deg, ${colorMap.yellow400}, ${colorMap.yellow600})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: colorMap.white, fontSize: 56 }}>
                  <i className="fas fa-trophy"></i>
                </div>
              </div>
            </div>
            {/* Stars around badge */}
            {[...Array(5)].map((_, i) => {
              const angle = (i * 2 * Math.PI) / 5;
              const left = 80 + Math.cos(angle) * 80;
              const top = 80 + Math.sin(angle) * 80;
              const duration = Math.random() * 2 + 1;
              const delay = Math.random() * 0.5;
              return (
                <div
                  key={i}
                  className="animate-ping"
                  style={{
                    position: 'absolute',
                    left,
                    top,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`
                  }}
                >
                  <i className="fas fa-star" style={{ color: colorMap.yellow400, fontSize: 20 }}></i>
                </div>
              );
            })}
          </div>
        </div>
        {/* Summary section */}
        <div style={{ background: colorMap.blue50, borderRadius: 16, padding: 24, marginBottom: 40, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: colorMap.gray800, marginBottom: 8 }}>Excellent understanding of projectile motion!</h2>
              <p style={{ color: colorMap.gray600 }}>You've mastered the core concepts and are ready to tackle more advanced topics.</p>
            </div>
            <div style={{ width: 96, height: 96, flexShrink: 0, marginLeft: 16, animation: 'wiggle 2s ease-in-out infinite' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: colorMap.blue100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: 32 }}>😄</div>
              </div>
            </div>
          </div>
        </div>
        {/* Progress section */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: colorMap.gray700 }}>Your Learning Journey</h3>
            <span style={{ fontSize: 14, color: colorMap.gray500 }}>1 of 3 modules completed</span>
          </div>
          <div style={{ height: 80 }} id="progress-chart"></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: colorMap.green500, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                <i className="fas fa-check" style={{ color: colorMap.white }}></i>
              </div>
              <p style={{ fontSize: 12, marginTop: 4, color: colorMap.gray600 }}>Physics</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: colorMap.gray200, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                <i className="fas fa-futbol" style={{ color: colorMap.gray400 }}></i>
              </div>
              <p style={{ fontSize: 12, marginTop: 4, color: colorMap.gray600 }}>Football</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: colorMap.gray200, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                <i className="fas fa-chart-line" style={{ color: colorMap.gray400 }}></i>
              </div>
              <p style={{ fontSize: 12, marginTop: 4, color: colorMap.gray600 }}>Advanced</p>
            </div>
          </div>
        </div>
        {/* CTA section */}
        <div style={{ textAlign: 'center' }}>
          <button style={{ background: colorMap.green500, color: colorMap.white, fontWeight: 700, padding: '16px 32px', borderRadius: 9999, boxShadow: '0 4px 16px 0 rgba(16,185,129,0.15)', fontSize: 18, border: 'none', cursor: 'pointer', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
            Try Football Module Next
            <i className="fas fa-arrow-right" style={{ marginLeft: 8 }}></i>
          </button>
          <button style={{ marginTop: 16, color: colorMap.blue500, fontWeight: 500, fontSize: 16, background: 'none', border: 'none', cursor: 'pointer' }}>
            Review This Module
          </button>
        </div>
      </div>
      {/* Share results */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <p style={{ color: colorMap.gray600, marginBottom: 8 }}>Share your achievement</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <button style={{ width: 40, height: 40, borderRadius: '50%', background: colorMap.blue600, color: colorMap.white, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>
            <i className="fab fa-facebook-f"></i>
          </button>
          <button style={{ width: 40, height: 40, borderRadius: '50%', background: colorMap.blue400, color: colorMap.white, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>
            <i className="fab fa-twitter"></i>
          </button>
          <button style={{ width: 40, height: 40, borderRadius: '50%', background: colorMap.green500, color: colorMap.white, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>
            <i className="fas fa-share-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

// Add necessary animations
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confetti {
      0% { transform: translateY(0) rotate(0); opacity: 1; }
      100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
    .animate-confetti {
      animation: confetti 5s ease-in-out forwards;
    }
    @keyframes wiggle {
      0%, 100% { transform: rotate(-5deg); }
      50% { transform: rotate(5deg); }
    }
    .animate-wiggle {
      animation: wiggle 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(250,204,21,0.4); }
      50% { box-shadow: 0 0 0 16px rgba(250,204,21,0); }
    }
    .pulse {
      animation: pulse 2s infinite;
    }
    .animate-ping {
      animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    @keyframes ping {
      75%, 100% { transform: scale(2); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

export default Result;