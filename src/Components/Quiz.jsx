import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const colorMap = {
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  white: '#FFFFFF',
  blue50: '#EFF6FF',
  blue300: '#60A5FA',
  blue500: '#3B82F6',
  blue600: '#2563EB',
  blue700: '#1D4ED8',
  green50: '#ECFDF5',
  green200: '#A7F3D0',
  green500: '#10B981',
  green600: '#059669',
  green700: '#047857',
  red50: '#FEF2F2',
  red200: '#FECACA',
  red500: '#EF4444',
  yellow50: '#FFFBEB',
  yellow200: '#FEF08A',
  yellow400: '#FACC15',
  yellow700: '#B45309',
  yellow800: '#92400E',
  orange500: '#F97316',
};

const Result = ({ score, total, onRestart }) => (
  <div style={{ maxWidth: 480, width: '100%', background: colorMap.white, padding: 32, borderRadius: 16, boxShadow: '0 10px 32px 0 rgba(31,41,55,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
    <h2 style={{ fontSize: 28, fontWeight: 700, color: colorMap.blue600, marginBottom: 8 }}>Quiz Complete!</h2>
    <div style={{ fontSize: 20, color: colorMap.gray700, marginBottom: 16 }}>
      You scored <span style={{ color: colorMap.green600, fontWeight: 700 }}>{score}</span> out of <span style={{ color: colorMap.blue600, fontWeight: 700 }}>{total}</span>
    </div>
    <button
      onClick={onRestart}
      style={{ padding: '10px 32px', borderRadius: 8, background: colorMap.blue600, color: colorMap.white, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer', marginTop: 16 }}
    >
      Restart Quiz
    </button>
  </div>
);

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      question: "What factors affect the trajectory of a basketball during a shot?",
      options: [
        "Only the initial velocity",
        "Initial velocity, angle, and gravity",
        "Just the angle of release",
        "The color of the basketball"
      ],
      correctAnswer: "Initial velocity, angle, and gravity",
      hint: "Think about the physics principles that govern projectile motion. Consider what forces act on the ball after it leaves the player's hands."
    },
    {
      id: 2,
      question: "Which angle of release gives the maximum horizontal distance for a projectile?",
      options: [
        "90 degrees",
        "45 degrees",
        "30 degrees",
        "60 degrees"
      ],
      correctAnswer: "45 degrees",
      hint: "Consider the mathematical relationship between horizontal distance, initial velocity, and angle in projectile motion equations."
    },
    {
      id: 3,
      question: "How does air resistance affect a basketball's trajectory?",
      options: [
        "It has no effect",
        "It increases the maximum height",
        "It reduces the overall distance traveled",
        "It makes the ball accelerate faster"
      ],
      correctAnswer: "It reduces the overall distance traveled",
      hint: "Think about what happens when an object moves through air. What force opposes the motion?"
    }
  ];

  const handleOptionSelect = (option) => {
    if (!submitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      setSubmitted(true);
      if (selectedOption === questions[currentQuestion].correctAnswer) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setSubmitted(false);
      setShowHint(false);
    } else {
      // Navigate to result page with score and total
      navigate('/result', { state: { score, total: questions.length } });
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setSubmitted(false);
    setShowHint(false);
    setScore(0);
  };

  const currentQuestionData = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isCorrect = submitted && selectedOption === currentQuestionData.correctAnswer;

  return (
    <div style={{ minHeight: '100vh', background: colorMap.gray50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 4px' }}>
      <div style={{ maxWidth: 420, width: '100%', background: colorMap.white, padding: 16, borderRadius: 12, boxShadow: '0 6px 18px 0 rgba(31,41,55,0.08)', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: colorMap.gray800 }}>Quiz: Basketball – Projectile Motion</h1>
            <p style={{ color: colorMap.gray600, marginTop: 2, fontSize: 12 }}>Test your knowledge of physics in basketball</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <i className="fas fa-basketball-ball" style={{ color: colorMap.orange500, fontSize: 16 }}></i>
            <i className="fas fa-atom" style={{ color: colorMap.blue500, fontSize: 16 }}></i>
          </div>
        </div>
        
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: colorMap.gray700 }}>Question {currentQuestion + 1} of {questions.length}</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: colorMap.gray700 }}>{Math.round(progress)}% Complete</span>
          </div>
          <div style={{ width: '100%', background: colorMap.gray200, borderRadius: 9999, height: 6 }}>
            <div style={{ background: colorMap.blue600, height: 6, borderRadius: 9999, width: `${progress}%`, transition: 'width 0.3s' }}></div>
          </div>
        </div>

        <div style={{ background: colorMap.gray50, padding: 12, borderRadius: 8, border: `1px solid ${colorMap.gray200}`, marginTop: 12 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: colorMap.gray800, marginBottom: 8 }}>{currentQuestionData.question}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {currentQuestionData.options.map((option, index) => {
              let bg = colorMap.white;
              let border = colorMap.gray200;
              let radioBorder = colorMap.gray400;
              let radioBg = 'transparent';
              let text = colorMap.gray800;
              let icon = null;
              if (selectedOption === option) {
                if (submitted) {
                  if (option === currentQuestionData.correctAnswer) {
                    bg = colorMap.green50;
                    border = colorMap.green500;
                    radioBorder = colorMap.green500;
                    radioBg = colorMap.green500;
                  } else {
                    bg = colorMap.red50;
                    border = colorMap.red500;
                    radioBorder = colorMap.red500;
                    radioBg = colorMap.red500;
                  }
                } else {
                  bg = colorMap.blue50;
                  border = colorMap.blue500;
                  radioBorder = colorMap.blue500;
                  radioBg = colorMap.blue500;
                }
              }
              if (submitted && option === currentQuestionData.correctAnswer) {
                icon = <i className="fas fa-check" style={{ color: colorMap.green500, marginLeft: 'auto', fontSize: 14 }}></i>;
              } else if (submitted && selectedOption === option && option !== currentQuestionData.correctAnswer) {
                icon = <i className="fas fa-times" style={{ color: colorMap.red500, marginLeft: 'auto', fontSize: 14 }}></i>;
              }
              return (
                <div
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  style={{
                    display: 'flex', alignItems: 'center', padding: 8, borderRadius: 8, border: `1.5px solid ${border}`,
                    cursor: 'pointer', background: bg, transition: 'background 0.2s, border 0.2s',
                    boxShadow: selectedOption === option ? '0 1px 4px 0 rgba(59,130,246,0.08)' : undefined
                  }}
                >
                  <div style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${radioBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
                    {selectedOption === option && (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: radioBg }}></div>
                    )}
                  </div>
                  <span style={{ color: text, fontSize: 13 }}>{option}</span>
                  {icon}
                </div>
              );
            })}
          </div>
        </div>

        {showHint && (
          <div style={{ background: colorMap.yellow50, border: `1px solid ${colorMap.yellow200}`, borderRadius: 8, padding: 10, marginTop: 8 }}>
            <div style={{ display: 'flex' }}>
              <div style={{ flexShrink: 0 }}>
                <i className="fas fa-lightbulb" style={{ color: colorMap.yellow400, marginTop: 2, fontSize: 14 }}></i>
              </div>
              <div style={{ marginLeft: 8 }}>
                <h3 style={{ fontSize: 12, fontWeight: 600, color: colorMap.yellow800 }}>Hint</h3>
                <div style={{ marginTop: 4, fontSize: 12, color: colorMap.yellow700 }}>
                  <p>{currentQuestionData.hint}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16, alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={toggleHint}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px 10px', border: `1px solid ${colorMap.gray300}`, borderRadius: 6, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)', fontSize: 12, fontWeight: 500, color: colorMap.gray700, background: colorMap.white, cursor: 'pointer', outline: 'none', transition: 'background 0.2s', marginBottom: 0 }}
          >
            <i className="fas fa-lightbulb" style={{ color: colorMap.yellow400, marginRight: 6, fontSize: 13 }}></i>
            {showHint ? 'Hide Hint' : 'Use a Hint'}
          </button>
          <div style={{ display: 'flex', gap: 10 }}>
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedOption}
                style={{ padding: '6px 16px', borderRadius: 6, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)', fontSize: 12, fontWeight: 500, color: colorMap.white, background: selectedOption ? colorMap.blue600 : colorMap.blue300, cursor: selectedOption ? 'pointer' : 'not-allowed', outline: 'none', border: 'none', transition: 'background 0.2s' }}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                style={{ padding: '6px 16px', background: colorMap.green600, borderRadius: 6, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)', fontSize: 12, fontWeight: 500, color: colorMap.white, cursor: 'pointer', outline: 'none', border: 'none', transition: 'background 0.2s', display: 'flex', alignItems: 'center' }}
              >
                Next Question
                <i className="fas fa-arrow-right" style={{ marginLeft: 6, fontSize: 13 }}></i>
              </button>
            )}
          </div>
        </div>

        {submitted && (
          <div style={{ marginTop: 8, padding: 10, borderRadius: 8, background: isCorrect ? colorMap.green50 : colorMap.red50, border: `1px solid ${isCorrect ? colorMap.green200 : colorMap.red200}` }}>
            <div style={{ display: 'flex' }}>
              <div style={{ flexShrink: 0 }}>
                <i className={isCorrect ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'} style={{ color: isCorrect ? colorMap.green500 : colorMap.red500, marginTop: 1, fontSize: 14 }}></i>
              </div>
              <div style={{ marginLeft: 8 }}>
                <h3 style={{ fontSize: 12, fontWeight: 600, color: isCorrect ? colorMap.green700 : colorMap.red500 }}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h3>
                <div style={{ marginTop: 4, fontSize: 12, color: isCorrect ? colorMap.green700 : colorMap.red500 }}>
                  {isCorrect 
                    ? <p>Great job! You selected the right answer.</p>
                    : <p>The correct answer is: {currentQuestionData.correctAnswer}</p>
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;