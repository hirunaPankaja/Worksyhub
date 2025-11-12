// src/app/gpa-calculator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  Plus,
  Minus,
  Trash2,
  TrendingUp,
  Calculator,
  Info,
} from 'lucide-react';

// Default Grade Scale Definitions
const gpaScales = {
  '4.0': [
    { grade: 'A+', value: 4.0 }, { grade: 'A', value: 4.0 }, { grade: 'A-', value: 3.7 },
    { grade: 'B+', value: 3.3 }, { grade: 'B', value: 3.0 }, { grade: 'B-', value: 2.7 },
    { grade: 'C+', value: 2.3 }, { grade: 'C', value: 2.0 }, { grade: 'C-', value: 1.7 },
    { grade: 'D+', value: 1.3 }, { grade: 'D', value: 1.0 }, { grade: 'F', value: 0.0 }
  ],
  '5.0': [
    { grade: 'A', value: 5.0 }, { grade: 'B', value: 4.0 }, { grade: 'C', value: 3.0 },
    { grade: 'D', value: 2.0 }, { grade: 'F', value: 0.0 }
  ],
  '10.0': [
    { grade: 'O', value: 10.0 }, { grade: 'A+', value: 9.0 }, { grade: 'A', value: 8.0 },
    { grade: 'B+', value: 7.0 }, { grade: 'B', value: 6.0 }, { grade: 'C', value: 5.0 },
    { grade: 'P', value: 4.0 }, { grade: 'F', value: 0.0 }
  ],
  'custom': []
};

// Type for a single course
type Course = {
  id: number;
  subject: string;
  credit: string;
  grade: string;
};

// Type for a grade value pair
type GradeValue = {
  grade: string;
  value: number;
};

let courseNextId = 1; // Simple ID counter for courses

export default function GPACalculatorPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 0, subject: '', credit: '', grade: '' }
  ]);
  const [gpaResult, setGpaResult] = useState('');
  const [gpaScale, setGpaScale] = useState('4.0');
  const [customGrades, setCustomGrades] = useState(false);
  const [gradeValues, setGradeValues] = useState<GradeValue[]>(gpaScales['4.0']);

  useEffect(() => {
    if (!customGrades && gpaScale !== 'custom') {
      setGradeValues(gpaScales[gpaScale as keyof typeof gpaScales]);
      setCourses([{ id: 0, subject: '', credit: '', grade: '' }]); // Reset courses on scale change
      setGpaResult('');
    }
  }, [gpaScale, customGrades]);

  const addCourse = () => {
    setCourses([...courses, { id: courseNextId++, subject: '', credit: '', grade: '' }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(courses.map((course) =>
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const addCustomGrade = () => {
    setGradeValues([...gradeValues, { grade: '', value: 0 }]);
  };

  const removeCustomGrade = (index: number) => {
    if (gradeValues.length > 1) {
      setGradeValues(gradeValues.filter((_, i) => i !== index));
    }
  };

  const updateCustomGrade = (index: number, field: keyof GradeValue, value: string | number) => {
    setGradeValues(gradeValues.map((grade, i) =>
      i === index ? { ...grade, [field]: value } : grade
    ));
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;
    let hasInvalidInput = false;

    const gradeMap = new Map(gradeValues.map(g => [g.grade.toUpperCase(), g.value]));

    courses.forEach(course => {
      const credit = parseFloat(course.credit);
      const grade = course.grade.toUpperCase();
      const gradeValue = gradeMap.get(grade);

      if (isNaN(credit) || credit <= 0 || gradeValue === undefined) {
        if(course.subject || course.credit || course.grade) { // Only flag if user entered something
          hasInvalidInput = true;
        }
        return;
      }

      totalCredits += credit;
      totalGradePoints += credit * gradeValue;
    });

    if (totalCredits === 0) {
      setGpaResult('Please enter valid courses.');
      return;
    }

    if (hasInvalidInput) {
      setGpaResult('Invalid Input - Check all fields');
      return;
    }

    const gpa = totalGradePoints / totalCredits;
    setGpaResult(`${gpa.toFixed(2)} / ${customGrades ? 'Custom' : gpaScale}`);
  };
  
  const resetToDefault = (scale: string) => {
    setGpaScale(scale);
    setCustomGrades(false);
  };
  
  const clearAllCourses = () => {
    setCourses([{ id: 0, subject: '', credit: '', grade: '' }]);
    setGpaResult('');
  };

  const tutorials = {
    title: 'How to Use the GPA Calculator',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Select Your GPA Scale:** Choose your institution\'s scale (e.g., 4.0, 5.0) or select "Custom" to define your own grade values.',
          '**2. Add Courses:** Fill in the fields for each course. Use the "Add Course" button (+) to add more rows.',
          '**3. Enter Credits:** Add the credit hours for each course (e.g., 3).',
          '**4. Select Grade:** Choose the letter grade you received for that course from the dropdown.',
          "**5. Calculate:** Press the 'Calculate GPA' button to see your result.",
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          GPA Calculator (University & College)
        </h1>
        <p className="text-lg text-muted-foreground">
          Calculate your weighted or unweighted GPA on any scale.
        </p>
      </div>

      {/* --- GPA Calculator Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Calculate Your GPA
        </h2>

        {/* --- Scale Selection --- */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              1. Select Your GPA Scale
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => resetToDefault('4.0')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  gpaScale === '4.0' && !customGrades
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                4.0 Scale
              </button>
              <button
                onClick={() => resetToDefault('5.0')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  gpaScale === '5.0' && !customGrades
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                5.0 Scale
              </button>
              <button
                onClick={() => resetToDefault('10.0')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  gpaScale === '10.0' && !customGrades
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                10.0 Scale
              </button>
              <button
                onClick={() => {
                  setGpaScale('custom');
                  setCustomGrades(true);
                }}
                className={`px-4 py-2 rounded-lg transition-all ${
                  customGrades
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                Custom Scale
              </button>
            </div>
          </div>

          {/* --- Custom Grade Editor --- */}
          {customGrades && (
            <div className="p-4 border rounded-lg bg-muted/30 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Custom Grade Values</h3>
                <button
                  onClick={addCustomGrade}
                  className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Grade
                </button>
              </div>
              
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {gradeValues.map((grade, index) => (
                  <div key={index} className="grid grid-cols-3 gap-3 items-center">
                    <input
                      type="text"
                      value={grade.grade}
                      onChange={(e) => updateCustomGrade(index, 'grade', e.target.value)}
                      placeholder="e.g., A+"
                      className="w-full p-2 rounded border bg-background"
                      maxLength={5}
                    />
                    <input
                      type="number"
                      step="0.1"
                      value={grade.value}
                      onChange={(e) => updateCustomGrade(index, 'value', parseFloat(e.target.value) || 0)}
                      placeholder="e.g., 4.0"
                      className="w-full p-2 rounded border bg-background"
                    />
                    <button
                      onClick={() => removeCustomGrade(index)}
                      className="p-2 bg-destructive/20 text-destructive rounded hover:bg-destructive/30"
                      disabled={gradeValues.length <= 1}
                    >
                      <Minus className="h-4 w-4 mx-auto" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- Current Scale Display --- */}
          <div className="p-4 border rounded-lg bg-muted/30">
            <h3 className="text-lg font-semibold mb-3">Current Grade Scale</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {gradeValues.map((grade, index) => (
                <div key={index} className="p-2 bg-background rounded text-center">
                  <div className="font-semibold">{grade.grade}</div>
                  <div className="text-sm text-muted-foreground">{grade.value}</div>
                </div>
              ))}
              {gradeValues.length === 0 && <p className="text-sm text-muted-foreground">Please add custom grades.</p>}
            </div>
          </div>
        </div>

        {/* --- Course Input --- */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">2. Enter Your Courses</h3>
            <button
              onClick={addCourse}
              className="flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm"
            >
              <Plus className="h-4 w-4" />
              Add Subject
            </button>
          </div>

          <div className="hidden md:grid md:grid-cols-4 gap-4 px-4">
            <label className="block text-sm font-medium">Subject Name (Optional)</label>
            <label className="block text-sm font-medium">Credit Hours</label>
            <label className="block text-sm font-medium">Grade</label>
            <label className="block text-sm font-medium">Remove</label>
          </div>

          {courses.map((course, index) => (
            <div key={course.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 border rounded-lg">
              <div>
                <label className="block text-sm font-medium mb-2 md:hidden">Subject Name (Optional)</label>
                <input
                  type="text"
                  value={course.subject}
                  onChange={(e) => updateCourse(course.id, 'subject', e.target.value)}
                  placeholder="e.g., Mathematics"
                  className="w-full p-2 rounded-lg border bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 md:hidden">Credit Hours</label>
                <input
                  type="number"
                  value={course.credit}
                  onChange={(e) => updateCourse(course.id, 'credit', e.target.value)}
                  placeholder="e.g., 3"
                  className="w-full p-2 rounded-lg border bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 md:hidden">Grade</label>
                <select
                  value={course.grade}
                  onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                  className="w-full p-2 rounded-lg border bg-background"
                >
                  <option value="">Select Grade</option>
                  {gradeValues.map((g, i) => (
                    <option key={i} value={g.grade}>
                      {g.grade}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => removeCourse(course.id)}
                  className="w-full py-2 bg-destructive/20 text-destructive rounded-lg hover:bg-destructive/30"
                  disabled={courses.length <= 1}
                >
                  <Trash2 className="h-4 w-4 mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 pt-6 border-t">
          <button
            onClick={clearAllCourses}
            className="w-full md:w-auto py-3 px-6 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80"
          >
            Clear All
          </button>
          <button
            onClick={calculateGPA}
            className="w-full md:flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
          >
            Calculate GPA
          </button>
        </div>

        {gpaResult && (
          <div className="p-6 rounded-lg bg-muted text-center">
            <p className="text-sm text-muted-foreground mb-1">
              Your Calculated GPA:
            </p>
            <p className="text-4xl font-bold text-primary">
              {gpaResult}
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

        {/* --- What is GPA? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-primary" />
            What is a GPA?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>A **Grade Point Average (GPA)** is a standard way to measure academic achievement. It's a single number that represents your average grade across all your courses.</p>
            <p>Unlike a simple grade average, a GPA is typically **weighted**, meaning courses that are worth more "credit hours" have a larger impact on your final score. A good grade in a 5-credit class will raise your GPA more than a good grade in a 1-credit class.</p>
          </div>
        </div>

        {/* --- How is GPA Calculated? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calculator className="h-6 w-6 text-primary" />
            How is GPA Calculated?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>The formula for calculating GPA is:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>(Grade Points × Credits) / (Total Credits)</code>
            </pre>
            <p>Here is the step-by-step process:</p>
            <ol>
              <li>**Find Grade Points:** Each letter grade (A, B, C) is assigned a point value (e.g., A=4.0, B=3.0).</li>
              <li>**Calculate Total Points:** For each course, multiply its Grade Points by its Credit Hours. Sum these all up.</li>
              <li>**Calculate Total Credits:** Sum up all the credit hours for the courses you are calculating.</li>
              <li>**Divide:** Divide your Total Grade Points by your Total Credits to get your GPA.</li>
            </ol>
          </div>
        </div>
        
        {/* --- Weighted vs. Unweighted GPA Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Weighted vs. Unweighted GPA
          </h2>
          <p className="text-muted-foreground mb-4">Understanding the difference is key to interpreting your score.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Feature</th>
                  <th className="p-3 border border-border">Unweighted GPA</th>
                  <th className="p-3 border border-border">Weighted GPA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">Scale</td>
                  <td className="p-3 border border-border">Typically 0.0 to 4.0.</td>
                  <td className="p-3 border border-border">Often goes up to 5.0 (or higher).</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Course Difficulty</td>
                  <td className="p-3 border border-border">All classes are treated equally. An 'A' is 4.0, no matter the class.</td>
                  <td className="p-3 border border-border">Harder classes (like AP, IB, or Honors) are given extra points.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">Example</td>
                  <td className="p-3 border border-border">An 'A' in a standard class = 4.0. An 'A' in an AP class = 4.0.</td>
                  <td className="p-3 border border-border">An 'A' in a standard class = 4.0. An 'A' in an AP class = 5.0.</td>
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
          <a href="/basic-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Basic Calculator
          </a>
          <a href="/percentage-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Percentage Calculator
          </a>
          <a href="/bmi-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            BMI Calculator
          </a>
          <a href="/emi-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            EMI Calculator
          </a>
        </div>
      </div>
    </div>
  );
}