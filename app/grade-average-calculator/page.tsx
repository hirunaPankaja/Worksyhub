// src/app/grade-average-calculator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Plus, Trash2, TrendingUp, Info, X } from 'lucide-react';

export default function GradeAverageCalculatorPage() {
  // Use objects with IDs for stable React keys
  const [grades, setGrades] = useState([
    { id: 1, value: '' },
    { id: 2, value: '' },
    { id: 3, value: '' },
  ]);
  const [gradeResult, setGradeResult] = useState('');
  let nextId = 4; // Simple ID counter

  const handleGradeChange = (id: number, value: string) => {
    setGrades(grades.map(g => g.id === id ? { ...g, value } : g));
  };

  const addGradeField = () => {
    setGrades([...grades, { id: nextId++, value: '' }]);
  };

  const removeGradeField = (id: number) => {
    // Only allow removal if there is more than one field
    if (grades.length > 1) {
      setGrades(grades.filter(g => g.id !== id));
    }
  };
  
  const clearAll = () => {
    setGrades([{ id: 1, value: '' }]);
    setGradeResult('');
  };

  const calculateGrade = () => {
    const validGrades = grades
      .map((g) => parseFloat(g.value))
      .filter((g) => !isNaN(g) && g >= 0);
      
    if (validGrades.length === 0) {
      setGradeResult('No valid grades entered.');
      return;
    }

    const sum = validGrades.reduce((a, b) => a + b, 0);
    const average = sum / validGrades.length;
    setGradeResult(`Your average grade is ${average.toFixed(2)}`);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        calculateGrade();
      }
      if (event.key === 'Escape') {
        clearAll();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [grades]); // Re-bind when grades change


  const tutorials = {
    title: 'How to Use the Grade Average Calculator',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Enter Grades:** Type your numerical grades into the input fields.',
          '**2. Add More:** Click the "Add Grade" button (+) to add more fields for more grades.',
          '**3. Remove:** Click the "X" button to remove any unwanted grade fields.',
          "**4. Calculate:** Press Enter or click the 'Calculate Average' button.",
          "**5. View Result:** Your average grade will appear in the result box.",
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Grade Average Calculator
        </h1>
        <p className="text-lg text-muted-foreground">
          Quickly find your average score from a list of grades.
        </p>
      </div>

      {/* --- Grade Average Calculator Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Enter Your Grades
        </h2>
        <p className="text-sm text-muted-foreground">
          Use keyboard: Enter to calculate, Escape to clear
        </p>

        <div className="space-y-4">
          {grades.map((grade, index) => (
            <div key={grade.id} className="flex items-center gap-2">
              <label className="block text-sm font-medium text-muted-foreground w-20">
                Grade {index + 1}
              </label>
              <input
                type="number"
                value={grade.value}
                onChange={(e) => handleGradeChange(grade.id, e.target.value)}
                placeholder="e.g., 85"
                className="w-full p-3 rounded-lg border bg-background"
              />
              <button
                onClick={() => removeGradeField(grade.id)}
                className={`p-3 rounded-lg ${grades.length > 1 ? 'bg-destructive/20 text-destructive hover:bg-destructive/30' : 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed'}`}
                disabled={grades.length <= 1}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <button
            onClick={addGradeField}
            className="w-full md:w-auto flex-1 py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Grade
          </button>
          <button
            onClick={clearAll}
            className="w-full md:w-auto flex-1 py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 flex items-center justify-center gap-2"
          >
            <Trash2 className="h-5 w-5" />
            Clear All
          </button>
          <button
            onClick={calculateGrade}
            className="w-full md:flex-[2] py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
          >
            Calculate Average
          </button>
        </div>

        {gradeResult && (
          <div className="p-4 rounded-lg bg-muted text-center">
            <p className="text-sm text-muted-foreground mb-1">
              Your Average:
            </p>
            <p className="text-3xl font-bold text-primary">
              {gradeResult}
            </p>
          </div>
        )}
      </div>

      {/* --- NEW: Rich Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        
        {/* --- How to Use (Tutorial) --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            How to Use This Calculator
          </h2>
          <div className="space-y-6">
            {tutorials.sections.map((section: { title: string, content: string[] }, sectionIndex: number) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  {section.title}
                </h3>
                <div className="prose prose-lg max-w-none text-foreground">
                  {section.content.map((line: string, lineIndex: number) => (
                    <div key={lineIndex} className="mb-3">
                      {line.startsWith('**') ? (
                        <strong className="text-foreground text-lg">{line.replace(/\*\*/g, '')}</strong>
                      ) : line.trim().startsWith('-') ? (
                        <p className="text-foreground leading-relaxed ml-4">{line}</p>
                      ) : line === '' ? (
                        <div className="my-4 border-t border-border"></div>
                      ) : (
                        <p className="text-foreground leading-relaxed">{line}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Why Calculate Your Average? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Why Calculate Your Average Grade?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>Calculating your average grade is a simple way to get a quick snapshot of your academic performance. It helps you:</p>
            <ul>
              <li><strong>Track Your Progress:</strong> See if your grades are improving or declining over the semester.</li>
              <li><strong>Identify Weaknesses:</strong> A low average in one subject can highlight where you need to focus more study time.</li>
              <li><strong>Set Goals:</strong> If you know your current average is 82, you can set a clear goal to raise it to 85 by the next report card.</li>
              <li><strong>Motivation:</strong> Watching your average climb can be a great motivator to keep working hard.</li>
            </ul>
            <p>While this tool is great for a quick average, a **GPA Calculator** is better for calculating your official university or college grade, as it includes "credit hours" for each course.</p>
          </div>
        </div>
        
        {/* --- Common Grading Systems Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-primary" />
            Common Grading Systems
          </h2>
          <p className="text-muted-foreground mb-4">Grades can be represented in many ways. This tool works with numerical grades (like percentages), but here’s how they often compare.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Letter Grade</th>
                  <th className="p-3 border border-border">Percentage</th>
                  <th className="p-3 border border-border">4.0 GPA Scale</th>
                  <th className="p-3 border border-border">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">A</td>
                  <td className="p-3 border border-border">90-100%</td>
                  <td className="p-3 border border-border">4.0</td>
                  <td className="p-3 border border-border">Excellent</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">B</td>
                  <td className="p-3 border border-border">80-89%</td>
                  <td className="p-3 border border-border">3.0</td>
                  <td className="p-3 border border-border">Good</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">C</td>
                  <td className="p-3 border border-border">70-79%</td>
                  <td className="p-3 border border-border">2.0</td>
                  <td className="p-3 border border-border">Average</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">D</td>
                  <td className="p-3 border border-border">60-69%</td>
                  <td className="p-3 border border-border">1.0</td>
                  <td className="p-3 border border-border">Passing</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">F</td>
                  <td className="p-3 border border-border">0-59%</td>
                  <td className="p-3 border border-border">0.0</td>
                  <td className="p-3 border border-border">Failing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/gpa-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            GPA Calculator
          </a>
          <a href="/scientific-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Scientific Calculator
          </a>
          <a href="/bmi-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            BMI Calculator
          </a>
          <a href="/basic-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Basic Calculator
          </a>
        </div>
      </div>
    </div>
  );
}