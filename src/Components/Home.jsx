import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const colorMap = {
  blue700: '#2563EB',
  blue800: '#1E40AF',
  blue400: '#60A5FA',
  orange500: '#F97316',
  orange600: '#EA580C',
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
};

const KhelPaathshala = () => {
  const [isHindi, setIsHindi] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // Floating animation effect
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }
      .floating-icon {
        animation: float 6s ease-in-out infinite;
      }
      .floating-icon:nth-child(2) {
        animation-delay: 2s;
      }
      .floating-icon:nth-child(3) {
        animation-delay: 4s;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleLanguageToggle = () => {
    setIsHindi(!isHindi);
  };

  const handleEmailSubmit = () => {
    if (email) {
      console.log('Subscribed email:', email);
      setEmail('');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: colorMap.white }}>
      {/* Header Navigation */}
      <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', background: colorMap.white, boxShadow: '0 2px 8px 0 rgba(31,41,55,0.08)', zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ fontFamily: 'serif', color: colorMap.blue700, fontSize: 24, fontWeight: 700 }}>KhelPaathshala</h1>
          </div>
          
          <nav style={{ display: 'none' /* md:flex */, alignItems: 'center', gap: 32 }}>
            <a href="#" style={{ color: colorMap.blue700, fontWeight: 500, borderBottom: `2px solid ${colorMap.blue700}` }}>Home</a>
            <a href="#" style={{ color: colorMap.gray700, transition: 'color 0.2s' }}>Modules</a>
            <a href="#" style={{ color: colorMap.gray700, transition: 'color 0.2s' }}>Quiz</a>
          </nav>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            
            <button 
              style={{ display: 'none', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', color: colorMap.gray700, background: 'none', border: 'none' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ paddingTop: 80, minHeight: '100vh', width: '100%', position: 'relative', overflow: 'hidden', background: `linear-gradient(90deg, ${colorMap.blue700} 0%, ${colorMap.orange500} 100%)` }}>
        <div style={{ position: 'absolute', inset: 0, background: '#0000004D' }}></div>
        {/* Floating Sports Icons */}
        <div className="floating-icon" style={{ position: 'absolute', top: 80, right: 80, opacity: 0.3 }}>
          {/* ...SVG... */}
        </div>
        <div className="floating-icon" style={{ position: 'absolute', bottom: 80, left: 80, opacity: 0.3 }}>
          {/* ...SVG... */}
        </div>
        <div className="floating-icon" style={{ position: 'absolute', top: '50%', right: '33%', opacity: 0.3 }}>
          {/* ...SVG... */}
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 16px', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 48 }}>
            <div style={{ width: '100%', maxWidth: 520, color: colorMap.white }}>
              <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 24, lineHeight: 1.1 }}>Scan. Learn. Play. Repeat.</h2>
              <p style={{ fontSize: 20, marginBottom: 32, maxWidth: 400 }}>Transform ordinary sports cards into interactive learning experiences. Point your camera, watch the magic happen, and learn while you play!</p>
              <button 
                style={{ background: colorMap.orange500, color: colorMap.white, fontWeight: 700, padding: '16px 32px', borderRadius: 12, fontSize: 18, boxShadow: '0 4px 16px 0 rgba(31,41,55,0.12)', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                onClick={() => navigate('/module')}
              >
                Start Learning
              </button>
            </div>
            <div style={{ width: '100%', maxWidth: 400, display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 384, height: 384, background: `linear-gradient(135deg, ${colorMap.blue400} 0%, #8B5CF6 100%)`, borderRadius: 24, boxShadow: '0 8px 32px 0 rgba(31,41,55,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ color: colorMap.white, textAlign: 'center' }}>
                    {/* ...SVG... */}
                    <p style={{ fontSize: 22, fontWeight: 600 }}>AR Learning Experience</p>
                  </div>
                </div>
                {/* AR Effect Overlay */}
                <div style={{ position: 'absolute', top: -16, right: -16, bottom: -16, left: -16, border: `4px solid ${colorMap.white}`, borderRadius: 24, opacity: 0.7 }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 80, height: 80, background: '#FFFFFF33', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* ...SVG... */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 0', background: colorMap.white }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: colorMap.gray900, marginBottom: 16 }}>How KhelPaathshala Works</h2>
            <p style={{ fontSize: 18, color: colorMap.gray600, maxWidth: 700, margin: '0 auto' }}>Our innovative platform combines sports and education through augmented reality technology</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            <div style={{ background: colorMap.gray50, borderRadius: 16, padding: 32, textAlign: 'center', boxShadow: '0 2px 8px 0 rgba(31,41,55,0.08)', transition: 'box-shadow 0.2s' }}>
              <div style={{ width: 64, height: 64, background: '#2563EB1A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                {/* ...SVG... */}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 600, color: colorMap.gray800, marginBottom: 12 }}>Scan Sports Cards</h3>
              <p style={{ color: colorMap.gray600 }}>Use your device camera to scan special sports cards that come to life with AR technology</p>
            </div>
            <div style={{ background: colorMap.gray50, borderRadius: 16, padding: 32, textAlign: 'center', boxShadow: '0 2px 8px 0 rgba(31,41,55,0.08)', transition: 'box-shadow 0.2s' }}>
              <div style={{ width: 64, height: 64, background: '#2563EB1A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                {/* ...SVG... */}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 600, color: colorMap.gray800, marginBottom: 12 }}>Interactive Learning</h3>
              <p style={{ color: colorMap.gray600 }}>Watch as 3D models, animations, and educational content spring from the cards</p>
            </div>
            <div style={{ background: colorMap.gray50, borderRadius: 16, padding: 32, textAlign: 'center', boxShadow: '0 2px 8px 0 rgba(31,41,55,0.08)', transition: 'box-shadow 0.2s' }}>
              <div style={{ width: 64, height: 64, background: '#2563EB1A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                {/* ...SVG... */}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 600, color: colorMap.gray800, marginBottom: 12 }}>Learn Through Play</h3>
              <p style={{ color: colorMap.gray600 }}>Complete fun challenges, quizzes, and games that reinforce educational concepts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Modules Section */}
      <section style={{ padding: '80px 0', background: colorMap.gray50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: colorMap.gray900, marginBottom: 16 }}>Popular Sports Modules</h2>
            <p style={{ fontSize: 18, color: colorMap.gray600, maxWidth: 700, margin: '0 auto' }}>Explore our growing collection of sports-based educational modules</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            { [
              {
                title: "Cricket Fundamentals",
                icon: "🏏",
                description: "Learn cricket rules, techniques, and history while improving math skills through scoring and statistics",
                lessons: 12
              },
              {
                title: "Football Basics",
                icon: "⚽",
                description: "Discover football strategies, positions, and rules while learning about physics, geometry, and teamwork",
                lessons: 15
              },
              {
                title: "Basketball Essentials",
                icon: "🏀",
                description: "Master basketball skills while learning about angles, probability, and physics through shooting and strategy",
                lessons: 10
              }
            ].map((module, index) => (
              <div key={index} style={{ background: colorMap.white, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 8px 0 rgba(31,41,55,0.10)', transition: 'box-shadow 0.2s', marginBottom: 0 }}>
                <div style={{ height: 192, background: `linear-gradient(135deg, ${colorMap.blue400} 0%, #22C55E 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 48 }}>{module.icon}</span>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#2563EB1A', borderRadius: '50%', marginRight: 12 }}>
                      <span style={{ fontSize: 22 }}>{module.icon}</span>
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 600, color: colorMap.gray800 }}>{module.title}</h3>
                  </div>
                  <p style={{ color: colorMap.gray600, marginBottom: 16 }}>{module.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: colorMap.blue700 }}>{module.lessons} Lessons</span>
                    <button style={{ background: colorMap.blue700, color: colorMap.white, padding: '8px 20px', borderRadius: 10, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>
                      Start Module
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button style={{ background: colorMap.white, border: `1.5px solid ${colorMap.blue700}`, color: colorMap.blue700, fontWeight: 500, padding: '12px 32px', borderRadius: 10, fontSize: 16, transition: 'background 0.2s, color 0.2s', cursor: 'pointer' }}>
              View All Modules
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '80px 0', background: colorMap.white }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: colorMap.gray900, marginBottom: 16 }}>What Parents & Teachers Say</h2>
            <p style={{ fontSize: 18, color: colorMap.gray600, maxWidth: 700, margin: '0 auto' }}>Join thousands of satisfied users who are transforming how children learn</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            { [
              {
                name: "Rajesh Patel",
                role: "Parent of 11-year-old",
                initials: "RP",
                rating: 5,
                text: "My son struggled with math concepts until we discovered KhelPaathshala. The cricket module made statistics and probability fun for him. Now he's teaching ME about run rates!"
              },
              {
                name: "Anjali Sharma",
                role: "PE Teacher, Delhi Public School",
                initials: "AS",
                rating: 5,
                text: "As a physical education teacher, I've incorporated KhelPaathshala into our curriculum. Students are engaged and excited about learning both sports and academic concepts simultaneously."
              },
              {
                name: "Vikram Kumar",
                role: "Parent of 9-year-old",
                initials: "VK",
                rating: 4.5,
                text: "My daughter was never interested in sports until KhelPaathshala. The AR technology fascinated her, and now she's learning physics concepts through basketball. It's been a game-changer!"
              }
            ].map((testimonial, index) => (
              <div key={index} style={{ background: colorMap.gray50, padding: 32, borderRadius: 18, boxShadow: '0 2px 8px 0 rgba(31,41,55,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
                  <div style={{ color: colorMap.orange500, display: 'flex', fontSize: 18 }}>
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                    {testimonial.rating % 1 !== 0 && <span>⭐</span>}
                  </div>
                </div>
                <p style={{ color: colorMap.gray700, marginBottom: 24, fontSize: 16 }}>&quot;{testimonial.text}&quot;</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, background: colorMap.blue700, color: colorMap.white, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16, fontWeight: 500, fontSize: 18 }}>
                    <span>{testimonial.initials}</span>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 600, color: colorMap.gray900, fontSize: 16 }}>{testimonial.name}</h4>
                    <p style={{ fontSize: 13, color: colorMap.gray600 }}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0', background: colorMap.blue700, color: colorMap.white }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Ready to Transform Learning Through Sports?</h2>
          <p style={{ fontSize: 20, marginBottom: 40, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>Join thousands of parents and educators who are revolutionizing how children learn with KhelPaathshala</p>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
        
            <button style={{ background: 'transparent', border: `2px solid ${colorMap.white}`, color: colorMap.white, fontWeight: 700, padding: '16px 32px', borderRadius: 12, fontSize: 18, transition: 'background 0.2s, color 0.2s', cursor: 'pointer' }}>
              Request Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: colorMap.gray900, color: colorMap.white, padding: '48px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            <div>
              <h1 style={{ fontFamily: 'serif', color: colorMap.white, fontSize: 24, fontWeight: 700, marginBottom: 16 }}>KhelPaathshala</h1>
              <p style={{ color: colorMap.gray400, marginBottom: 24 }}>Revolutionizing education through sports and augmented reality technology.</p>
              <div style={{ display: 'flex', gap: 16 }}>
                {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                  <a key={social} href="#" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: colorMap.gray800, borderRadius: '50%', transition: 'background 0.2s' }}>
                    <span style={{ color: colorMap.white }}>📱</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Quick Links</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Home', 'About Us', 'Modules', 'Quiz', 'Contact'].map((link) => (
                  <li key={link} style={{ marginBottom: 8 }}>
                    <a href="#" style={{ color: colorMap.gray400, transition: 'color 0.2s', textDecoration: 'none' }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Resources</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Help Center', 'Blog', 'Teacher Resources', 'Parent Guides', 'API Documentation'].map((resource) => (
                  <li key={resource} style={{ marginBottom: 8 }}>
                    <a href="#" style={{ color: colorMap.gray400, transition: 'color 0.2s', textDecoration: 'none' }}>{resource}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Subscribe</h3>
              <p style={{ color: colorMap.gray400, marginBottom: 16 }}>Stay updated with our latest modules and features</p>
              <div style={{ display: 'flex' }}>
                <input
                  type="email"
                  placeholder="Your email"
                  style={{ background: colorMap.gray800, color: colorMap.white, padding: '8px 16px', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, outline: 'none', width: '100%', border: 'none' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleEmailSubmit}
                  style={{ background: colorMap.orange500, color: colorMap.white, padding: '8px 16px', borderTopRightRadius: 8, borderBottomRightRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 500, transition: 'background 0.2s' }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${colorMap.gray800}`, marginTop: 48, paddingTop: 32, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: colorMap.gray400, fontSize: 14, margin: 0 }}>© 2025 KhelPaathshala. All rights reserved.</p>
            <div style={{ display: 'flex', gap: 24 }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((policy) => (
                <a key={policy} href="#" style={{ color: colorMap.gray400, transition: 'color 0.2s', fontSize: 14, textDecoration: 'none' }}>{policy}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KhelPaathshala;