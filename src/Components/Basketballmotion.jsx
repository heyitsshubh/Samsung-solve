import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as echarts from 'echarts';

const BasketballMotion = () => {
  const [angle, setAngle] = useState(45);
  const [power, setPower] = useState(70);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [optimalMessage, setOptimalMessage] = useState("At 45°, the basketball travels the farthest");
  const navigate = useNavigate();

  // Calculate trajectory based on angle and power
  const calculateTrajectory = (angle, power) => {
    const g = 9.8; // gravity constant
    const initialVelocity = power / 10; // Scale power to a reasonable velocity
    const radians = angle * Math.PI / 180;
    const vx = initialVelocity * Math.cos(radians);
    const vy = initialVelocity * Math.sin(radians);
    
    const points = [];
    let t = 0;
    let x = 0;
    let y = 0;
    
    // Calculate trajectory points
    while (y >= 0 && x <= 30) {
      x = vx * t;
      y = vy * t - 0.5 * g * t * t;
      if (y >= 0) {
        points.push([x, y]);
      }
      t += 0.1;
    }
    
    return points;
  };

  // Update chart with new trajectory
  const updateChart = () => {
    if (!chartInstance.current) return;
    
    const trajectoryData = calculateTrajectory(angle, power);
    
    const option = {
      animation: false,
      grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        top: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        min: 0,
        max: 30,
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(204, 204, 204, 0.2)'
          }
        }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 15,
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(204, 204, 204, 0.2)'
          }
        }
      },
      series: [
        {
          type: 'line',
          data: trajectoryData,
          showSymbol: false,
          smooth: true,
          lineStyle: {
            width: 3,
            color: '#2196F3'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(33, 150, 243, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(33, 150, 243, 0.1)'
                }
              ]
            }
          }
        },
        {
          type: 'scatter',
          symbolSize: 20,
          data: [trajectoryData[0]],
          itemStyle: {
            color: '#FF5722'
          }
        }
      ]
    };
    
    chartInstance.current.setOption(option);
  };

  // Initialize chart
  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
      updateChart();
      
      const handleResize = () => {
        chartInstance.current?.resize();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.current?.dispose();
      };
    }
  }, []);

  // Update chart when angle or power changes
  useEffect(() => {
    updateChart();
    
    // Update optimal message based on angle
    if (angle === 45) {
      setOptimalMessage("At 45°, the basketball travels the farthest");
    } else if (angle < 45) {
      setOptimalMessage("Increase angle toward 45° for maximum distance");
    } else {
      setOptimalMessage("Decrease angle toward 45° for maximum distance");
    }
  }, [angle, power]);

  // Handle angle selector drag
  const handleAngleDrag = (e) => {
    if (!isDragging) return;
    
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const x = e.clientX - rect.left - centerX;
    const y = centerY - (e.clientY - rect.top);
    
    let newAngle = Math.atan2(y, x) * 180 / Math.PI;
    if (newAngle < 0) newAngle = 0;
    if (newAngle > 90) newAngle = 90;
    
    setAngle(Math.round(newAngle));
  };

  // Helper for angle knob position
  const getKnobPosition = () => {
    const r = 64;
    const rad = angle * Math.PI / 180;
    return {
      left: `calc(50% + ${Math.cos(rad) * r}px)`,
      top: `calc(50% - ${Math.sin(rad) * r}px)`,
      transform: 'translate(-50%, -50%)'
    };
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', padding: '32px 16px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', background: '#fff', borderRadius: 20, boxShadow: '0 6px 32px 0 rgba(31,41,55,0.08)', overflow: 'hidden' }}>
        <div style={{ padding: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', color: '#1F2937', marginBottom: 32 }}>Projectile Motion Simulator</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, ...(window.innerWidth >= 1024 ? { flexDirection: 'row' } : {}) }}>
            {/* Left Panel - Basketball Court Visualization */}
            <div style={{ flex: window.innerWidth >= 1024 ? 2 : 'unset', background: '#EFF6FF', borderRadius: 16, padding: 16, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 16, left: 16, background: '#fff', padding: '4px 12px', borderRadius: 9999, boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)', zIndex: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#2563EB' }}>Basketball Court</span>
              </div>
              
              <div 
                ref={chartRef} 
                style={{ width: '100%', height: 500, background: 'linear-gradient(to bottom, #EFF6FF, #DBEAFE)', borderRadius: 12, overflow: 'hidden', position: 'relative', backgroundSize: 'cover', backgroundPosition: 'center' }}
              ></div>
              
              <div style={{ marginTop: 16, background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#4B5563' }}>Current Parameters:</span>
                </div>
                <div style={{ display: 'flex', gap: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="fas fa-angle-up" style={{ color: '#2563EB', marginRight: 8 }}></i>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>Launch Angle: {angle}°</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="fas fa-tachometer-alt" style={{ color: '#2563EB', marginRight: 8 }}></i>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>Power: {power}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Panel - Controls */}
            <div style={{ flex: window.innerWidth >= 1024 ? 1 : 'unset' }}>
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)', padding: 24, marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1F2937', marginBottom: 16 }}>Adjust Parameters</h2>
                
                {/* Angle Control */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>Launch Angle</label>
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#2563EB' }}>{angle}°</span>
                  </div>
                  
                  <div
                    style={{ width: '100%', height: 192, background: '#EFF6FF', borderRadius: 9999, position: 'relative', cursor: 'pointer', marginBottom: 8 }}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseLeave={() => setIsDragging(false)}
                    onMouseMove={handleAngleDrag}
                  >
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 128, height: 128, borderRadius: '50%', border: '2px solid #BFDBFE', position: 'relative' }}>
                        <div
                          style={{ position: 'absolute', width: 16, height: 16, background: '#2563EB', borderRadius: 9999, boxShadow: '0 2px 8px 0 rgba(37,99,235,0.15)', cursor: 'pointer', ...getKnobPosition() }}
                        ></div>
                        <div
                          style={{ position: 'absolute', left: '50%', top: '50%', height: 2, background: '#60A5FA', transform: `translateY(-1px) rotate(${-angle}deg)`, width: 64, transformOrigin: 'left' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={angle}
                    onChange={e => setAngle(parseInt(e.target.value))}
                    style={{ width: '100%', height: 8, background: '#BFDBFE', borderRadius: 8, appearance: 'none', cursor: 'pointer' }}
                  />
                </div>
                
                {/* Power Control */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>Power</label>
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#2563EB' }}>{power}%</span>
                  </div>
                  <div style={{ width: '100%', height: 24, background: '#DBEAFE', borderRadius: 9999, marginBottom: 8, overflow: 'hidden' }}>
                    <div
                      style={{ height: '100%', background: 'linear-gradient(to right, #60A5FA, #2563EB)', borderRadius: 9999, width: `${power}%` }}
                    ></div>
                  </div>
                  
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={power}
                    onChange={e => setPower(parseInt(e.target.value))}
                    style={{ width: '100%', height: 8, background: '#BFDBFE', borderRadius: 8, appearance: 'none', cursor: 'pointer' }}
                  />
                </div>
                
                {/* Results Summary */}
                <div style={{ background: '#EFF6FF', padding: 16, borderRadius: 12, border: '1px solid #DBEAFE' }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: '#2563EB', marginBottom: 8 }}>Physics Insight:</h3>
                  <p style={{ fontSize: 14, color: '#1D4ED8' }}>{optimalMessage}</p>
                </div>
              </div>
              
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)', padding: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1F2937', marginBottom: 16 }}>Theory</h2>
                <p style={{ fontSize: 14, color: '#4B5563', marginBottom: 16 }}>
                  Projectile motion follows a parabolic path affected by initial velocity, angle, and gravity. The optimal launch angle for maximum distance is 45° in a vacuum.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    style={{ background: '#2563EB', color: '#fff', fontWeight: 500, padding: '12px 24px', borderRadius: 12, boxShadow: '0 2px 8px 0 rgba(37,99,235,0.15)', fontSize: 16, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                    onClick={() => navigate('/quiz')}
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketballMotion;