// src/app/calculator/page.tsx
'use client';

// --- NEW IMPORTS ---
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// --- END NEW IMPORTS ---

import {
  Calculator as CalcIcon,
  Percent,
  Heart,
  DollarSign,
  GraduationCap,
  Tag,
  Sigma,
  BookOpen,
  Plus,
  Minus,
} from 'lucide-react';

// --- NEW: A wrapper component to use Suspense ---
export default function CalculatorPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CalculatorPage />
    </Suspense>
  );
}

function CalculatorPage() { // Renamed from default export
  const [activeTab, setActiveTab] = useState('basic');
  const [activeTutorial, setActiveTutorial] = useState('basic');

  // ... (all your other useState hooks for calculators)
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [expression, setExpression] = useState('');

  const [scientificDisplay, setScientificDisplay] = useState('0');
  const [scientificMemory, setScientificMemory] = useState(0);
  const [scientificExpression, setScientificExpression] = useState('');

  const [percentValue, setPercentValue] = useState('');
  const [percentOf, setPercentOf] = useState('');
  const [percentResult, setPercentResult] = useState('');

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState('');
  const [bmiCategory, setBmiCategory] = useState('');

  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emiResult, setEmiResult] = useState('');

  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [finalPrice, setFinalPrice] = useState('');

  const [grades, setGrades] = useState(['', '', '', '', '']);
  const [gradeResult, setGradeResult] = useState('');

  const [courses, setCourses] = useState([{ subject: '', credit: '', grade: '' }]);
  const [gpaResult, setGpaResult] = useState('');
  const [gpaScale, setGpaScale] = useState('4.0');
  const [customGrades, setCustomGrades] = useState(false);
  const [gradeValues, setGradeValues] = useState([
    { grade: 'A+', value: 4.0 },
    { grade: 'A', value: 4.0 },
    { grade: 'A-', value: 3.7 },
    { grade: 'B+', value: 3.3 },
    { grade: 'B', value: 3.0 },
    { grade: 'B-', value: 2.7 },
    { grade: 'C+', value: 2.3 },
    { grade: 'C', value: 2.0 },
    { grade: 'C-', value: 1.7 },
    { grade: 'D+', value: 1.3 },
    { grade: 'D', value: 1.0 },
    { grade: 'F', value: 0.0 },
  ]);

  const tabs = [
    { id: 'basic', label: 'Basic', icon: CalcIcon },
    { id: 'scientific', label: 'Scientific', icon: Sigma },
    { id: 'percentage', label: 'Percentage', icon: Percent },
    { id: 'bmi', label: 'BMI', icon: Heart },
    { id: 'emi', label: 'EMI/Loan', icon: DollarSign },
    { id: 'discount', label: 'Discount', icon: Tag },
    { id: 'grade', label: 'Grade Average', icon: GraduationCap },
    { id: 'gpa', label: 'GPA Calculator', icon: GraduationCap },
  ];

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
      { grade: 'A+', value: 10.0 }, { grade: 'A', value: 9.0 }, { grade: 'B', value: 8.0 },
      { grade: 'C', value: 7.0 }, { grade: 'D', value: 6.0 }, { grade: 'F', value: 0.0 }
    ],
    'custom': []
  };

  // --- NEW: This block reads the URL query ---
  const searchParams = useSearchParams();
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tabs.some(t => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams, tabs]); // Added tabs to dependency array
  // --- END NEW BLOCK ---

  useEffect(() => {
    setActiveTutorial(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (!customGrades && gpaScale !== 'custom') {
      setGradeValues(gpaScales[gpaScale as keyof typeof gpaScales]);
    }
  }, [gpaScale, customGrades]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (activeTab === 'basic') {
        if (/[0-9.]/.test(key)) {
          handleNumberClick(key);
        }
        else if (['+', '-', '*', '/'].includes(key)) {
          handleOperationClick(key);
        }
        else if (key === 'Enter' || key === '=') {
          event.preventDefault();
          handleEquals();
        }
        else if (key === 'Escape' || key === 'Delete') {
          handleClear();
        }
        else if (key === 'Backspace') {
          handleBackspace();
        }
      }
      else if (activeTab === 'scientific') {
        if (/[0-9.]/.test(key)) {
          setScientificDisplay(scientificDisplay === '0' || scientificDisplay === 'Error' ? key : scientificDisplay + key);
        }
        else if (['+', '-', '*', '/'].includes(key)) {
          handleScientificInput(key);
        }
        else if (key === 'Enter' || key === '=') {
          event.preventDefault();
          handleScientificEquals();
        }
        else if (key === 'Escape' || key === 'Delete') {
          setScientificDisplay('0');
          setScientificExpression('');
        }
        else if (key === 'Backspace') {
          if (scientificDisplay.length > 1) {
            setScientificDisplay(scientificDisplay.slice(0, -1));
          } else {
            setScientificDisplay('0');
          }
        }
        else if (key === 's' && event.altKey) {
          handleScientificOperation('sin');
        }
        else if (key === 'c' && event.altKey) {
          handleScientificOperation('cos');
        }
        else if (key === 't' && event.altKey) {
          handleScientificOperation('tan');
        }
        else if (key === 'l' && event.altKey) {
          handleScientificOperation('log');
        }
        else if (key === 'n' && event.altKey) {
          handleScientificOperation('ln');
        }
        else if (key === 'r' && event.altKey) {
          handleScientificOperation('sqrt');
        }
        else if (key === 'p' && event.altKey) {
          handleScientificOperation('pi');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeTab, display, previousValue, operation, waitingForNewValue, scientificDisplay]);

  const handleNumberClick = (num: string) => {
    if (num === '.' && display.includes('.')) return;
    
    if (waitingForNewValue || display === '0' || display === 'Error') {
      setDisplay(num === '.' ? '0.' : num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display + num);
    }
    
    if (operation && waitingForNewValue) {
      setExpression(previousValue + ' ' + operation + ' ' + (num === '.' ? '0.' : num));
    } else if (!operation) {
      setExpression(display === '0' && num !== '.' ? num : display + num);
    }
  };

  const handleOperationClick = (op: string) => {
    if (waitingForNewValue && operation) {
      setOperation(op);
      setExpression(previousValue + ' ' + op + ' ');
      return;
    }

    const currentValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = performCalculation();
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
    setExpression((previousValue || currentValue) + ' ' + op + ' ');
  };

  const performCalculation = () => {
    const current = parseFloat(display);
    if (previousValue === null) return current;

    switch (operation) {
      case '+': return previousValue + current;
      case '-': return previousValue - current;
      case '*': return previousValue * current;
      case '/': 
        if (current === 0) {
          setExpression('Error: Division by zero');
          return 0;
        }
        return previousValue / current;
      default: return current;
    }
  };

  const handleEquals = () => {
    if (previousValue === null || operation === null) return;

    const result = performCalculation();
    setDisplay(String(result));
    setExpression(previousValue + ' ' + operation + ' ' + display + ' = ' + result);
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
    setExpression('');
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleScientificInput = (input: string) => {
    setScientificExpression(scientificExpression + scientificDisplay + ' ' + input + ' ');
    setScientificDisplay('0');
  };

  const handleScientificEquals = () => {
    try {
      const expression = scientificExpression + scientificDisplay;
      // Using a safer eval alternative is highly recommended for production
      // For this example, we'll stick to a simple eval.
      let result = eval(expression.replace(/×/g, '*').replace(/÷/g, '/'));
      setScientificDisplay(String(result));
      setScientificExpression(expression + ' = ' + result);
    } catch (error) {
      setScientificDisplay('Error');
    }
  };

  const handleScientificOperation = (op: string) => {
    const value = parseFloat(scientificDisplay);
    let result = 0;
    let displayText = '';
    
    switch (op) {
      case 'square':
        result = value * value;
        displayText = `${value}² = ${result}`;
        break;
      case 'cube':
        result = value * value * value;
        displayText = `${value}³ = ${result}`;
        break;
      case 'sqrt':
        if (value < 0) {
          setScientificDisplay('Error');
          return;
        }
        result = Math.sqrt(value);
        displayText = `√${value} = ${result}`;
        break;
      case 'power':
        result = Math.pow(value, 2);
        displayText = `${value}^2 = ${result}`;
        break;
      case 'power3':
        result = Math.pow(value, 3);
        displayText = `${value}^3 = ${result}`;
        break;
      case 'sin':
        result = Math.sin(value * Math.PI / 180);
        displayText = `sin(${value}°) = ${result.toFixed(6)}`;
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        displayText = `cos(${value}°) = ${result.toFixed(6)}`;
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        displayText = `tan(${value}°) = ${result.toFixed(6)}`;
        break;
      case 'log':
        if (value <= 0) {
          setScientificDisplay('Error');
          return;
        }
        result = Math.log10(value);
        displayText = `log(${value}) = ${result}`;
        break;
      case 'ln':
        if (value <= 0) {
          setScientificDisplay('Error');
          return;
        }
        result = Math.log(value);
        displayText = `ln(${value}) = ${result}`;
        break;
      case 'pi':
        result = Math.PI;
        displayText = 'π = 3.141592653589793';
        break;
      case 'e':
        result = Math.E;
        displayText = 'e = 2.718281828459045';
        break;
      case 'factorial':
        if (value < 0 || !Number.isInteger(value)) {
          setScientificDisplay('Error');
          return;
        }
        result = factorial(value);
        displayText = `${value}! = ${result}`;
        break;
      case 'memoryAdd':
        setScientificMemory(scientificMemory + value);
        displayText = `M+ ${value} (Memory: ${scientificMemory + value})`;
        break;
      case 'memoryRecall':
        setScientificDisplay(String(scientificMemory));
        return;
      case 'memoryClear':
        setScientificMemory(0);
        displayText = 'Memory Cleared';
        break;
      case 'exp':
        result = Math.exp(value);
        displayText = `e^${value} = ${result}`;
        break;
      case 'abs':
        result = Math.abs(value);
        displayText = `|${value}| = ${result}`;
        break;
    }

    setScientificDisplay(String(result));
    setScientificExpression(displayText);
  };

  const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const calculatePercentage = () => {
    const value = parseFloat(percentValue);
    const total = parseFloat(percentOf);
    if (isNaN(value) || isNaN(total)) {
      setPercentResult('Invalid Input');
      return;
    }
    const result = (value / 100) * total;
    setPercentResult(result.toFixed(2));
  };

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (isNaN(w) || isNaN(h) || h === 0 || w === 0) {
      setBmiResult('Invalid Input');
      setBmiCategory('');
      return;
    }

    const bmi = w / (h * h);
    setBmiResult(bmi.toFixed(1));

    if (bmi < 18.5) setBmiCategory('Underweight');
    else if (bmi < 25) setBmiCategory('Normal weight');
    else if (bmi < 30) setBmiCategory('Overweight');
    else setBmiCategory('Obese');
  };

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(loanTenure) * 12;

    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r < 0 || n <= 0) {
      setEmiResult('Invalid Input');
      return;
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmiResult(emi.toFixed(2));
  };

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);
    if (isNaN(price) || isNaN(discount) || price < 0 || discount < 0 || discount > 100) {
      setFinalPrice('Invalid Input');
      return;
    }

    const discountAmount = (price * discount) / 100;
    const final = price - discountAmount;
    setFinalPrice(final.toFixed(2));
  };

  const calculateGrade = () => {
    const validGrades = grades
      .map((g) => parseFloat(g))
      .filter((g) => !isNaN(g) && g >= 0);
      
    if (validGrades.length === 0) {
      setGradeResult('No valid grades');
      return;
    }

    const sum = validGrades.reduce((a, b) => a + b, 0);
    const average = sum / validGrades.length;
    setGradeResult(average.toFixed(2));
  };

  const addCourse = () => {
    setCourses([...courses, { subject: '', credit: '', grade: '' }]);
  };

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      const newCourses = courses.filter((_, i) => i !== index);
      setCourses(newCourses);
    }
  };

  const updateCourse = (index: number, field: string, value: string) => {
    const newCourses = courses.map((course, i) => 
      i === index ? { ...course, [field]: value } : course
    );
    setCourses(newCourses);
  };

  const addCustomGrade = () => {
    setGradeValues([...gradeValues, { grade: '', value: 0 }]);
  };

  const removeCustomGrade = (index: number) => {
    if (gradeValues.length > 1) {
      const newGrades = gradeValues.filter((_, i) => i !== index);
      setGradeValues(newGrades);
    }
  };

  const updateCustomGrade = (index: number, field: string, value: string) => {
    const newGrades = gradeValues.map((grade, i) => 
      i === index ? { ...grade, [field]: field === 'value' ? parseFloat(value) || 0 : value } : grade
    );
    setGradeValues(newGrades);
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;
    let hasInvalidInput = false;

    const gradeMap = new Map();
    gradeValues.forEach(g => {
      if (g.grade) {
        gradeMap.set(g.grade.toUpperCase(), g.value);
      }
    });

    courses.forEach(course => {
      const credit = parseFloat(course.credit);
      const grade = course.grade.toUpperCase();
      const gradeValue = gradeMap.get(grade);

      if (isNaN(credit) || credit <= 0 || gradeValue === undefined || !course.subject.trim()) {
        hasInvalidInput = true;
        return;
      }

      totalCredits += credit;
      totalGradePoints += credit * gradeValue;
    });

    if (hasInvalidInput || totalCredits === 0) {
      setGpaResult('Invalid Input - Check all fields');
      return;
    }

    const gpa = totalGradePoints / totalCredits;
    setGpaResult(gpa.toFixed(2));
  };

  const resetToDefault = (scale: string) => {
    setGpaScale(scale);
    setCustomGrades(false);
    setGradeValues(gpaScales[scale as keyof typeof gpaScales]);
  };

  const tutorials = {
    basic: {
      title: "Basic Calculator Guide",
      sections: [
        {
          title: "Quick Start Guide",
          content: [
            "Learn to use the basic calculator with these essential tips and shortcuts.",
            "",
            "Keyboard Shortcuts:",
            "Numbers: 0-9 keys for quick input",
            "Operations: +, -, *, / keys for calculations", 
            "Equals: Press Enter or = key for results",
            "Clear: Use Escape or Delete to reset",
            "Backspace: Remove last digit easily",
            "",
            "Tip: Chain multiple operations like 2 + 3 × 4 = 14 for complex calculations."
          ]
        },
        {
          title: "Advanced Features",
          content: [
            "Expression Display: See your entire calculation history",
            "Real-time Updates: Watch numbers change as you type",
            "Error Handling: Get clear error messages for invalid operations",
            "",
            "Example Workflow:",
            "1. Type '25' then '+'",
            "2. Type '15' then '='",
            "3. See result: '40' instantly",
            "",
            "Perfect for quick math, shopping calculations, and everyday arithmetic."
          ]
        }
      ]
    },
    scientific: {
      title: "Scientific Calculator Guide",
      sections: [
        {
          title: "Advanced Functions",
          content: [
            "Unlock powerful mathematical capabilities with our scientific calculator.",
            "",
            "Keyboard Shortcuts:",
            "Alt+S: Sine function",
            "Alt+C: Cosine function", 
            "Alt+T: Tangent function",
            "Alt+L: Logarithm (base 10)",
            "Alt+N: Natural logarithm",
            "Alt+R: Square root",
            "Alt+P: π constant",
            "",
            "Available Functions:",
            "Trigonometric (sin, cos, tan in degrees)",
            "Exponential and Logarithmic",
            "Power functions (x², x³, x^y)",
            "Constants (π, e)",
            "Factorial calculations",
            "Memory functions"
          ]
        },
        {
          title: "Real-world Applications",
          content: [
            "Engineering Calculations:",
            "Structural design with trigonometric functions",
            "Electrical engineering with exponential calculations",
            "",
            "Scientific Research:",
            "Statistical analysis with factorial",
            "Physics calculations with constants",
            "",
            "Academic Use:",
            "Advanced mathematics homework",
            "University-level calculations",
            "",
            "Example: Calculate sin(30°) + cos(60°) = 1.0"
          ]
        }
      ]
    },
    bmi: {
      title: "BMI Calculator Health Guide",
      sections: [
        {
          title: "Understanding Your BMI",
          content: [
            "BMI (Body Mass Index) is a crucial health indicator that measures body fat based on your height and weight.",
            "",
            "BMI Formula:",
            "BMI = Weight (kg) / [Height (m)]²",
            "",
            "BMI Categories:",
            "Underweight: < 18.5",
            "Normal weight: 18.5 - 24.9", 
            "Overweight: 25 - 29.9",
            "Obese: ≥ 30",
            "",
            "How to Use:",
            "1. Enter weight in kilograms",
            "2. Enter height in centimeters",
            "3. Click 'Calculate BMI'",
            "4. Get instant results with category"
          ]
        },
        {
          title: "Health Insights & Tips",
          content: [
            "Important Considerations:",
            "BMI doesn't account for muscle mass",
            "Not suitable for athletes or pregnant women",
            "Consult healthcare professionals for personalized advice",
            "",
            "Healthy BMI Tips:",
            "Maintain balanced diet and exercise",
            "Regular health check-ups",
            "Focus on overall wellness, not just weight",
            "",
            "Example Calculation:",
            "Weight: 70 kg, Height: 175 cm",
            "BMI = 70 / (1.75 × 1.75) = 22.9 (Normal Weight)"
          ]
        }
      ]
    },
    gpa: {
      title: "GPA Calculator University Guide",
      sections: [
        {
          title: "Master Your Academic Performance",
          content: [
            "Calculate your Grade Point Average accurately for any university system worldwide.",
            "",
            "GPA Formula:",
            "GPA = Total Grade Points ÷ Total Credits",
            "",
            "Supported Scales:",
            "4.0 Scale: US universities standard",
            "5.0 Scale: Some international schools", 
            "10.0 Scale: India and other countries",
            "Custom Scale: Your specific institution",
            "",
            "How to Calculate:",
            "1. Select your GPA scale",
            "2. Add courses with subject names, credits, and grades",
            "3. Use custom grades if needed",
            "4. Get instant GPA calculation"
          ]
        },
        {
          title: "Academic Success Tips",
          content: [
            "GPA Importance:",
            "Graduate school applications",
            "Scholarship eligibility",
            "Job opportunities after graduation",
            "",
            "Target GPAs:",
            "3.0+: Good standing",
            "3.5+: Dean's list consideration",
            "3.7+: Honors eligibility",
            "",
            "Pro Tips:",
            "Track your GPA each semester",
            "Use weighted grades if available",
            "Consult academic advisors for specific requirements",
            "",
            "Example: 4 courses × 3 credits each with A, B+, A-, B grades = 3.475 GPA"
          ]
        }
      ]
    },
    // Adding stubs for the missing tutorial keys
    percentage: {
      title: "Percentage Calculator Guide",
      sections: [
        {
          title: "How to Use",
          content: ["Enter the percentage you want to find in the first box.", "Enter the total amount in the second box.", "Click 'Calculate' to see the result."]
        }
      ]
    },
    emi: {
      title: "EMI/Loan Calculator Guide",
      sections: [
        {
          title: "How to Use",
          content: ["Enter your total loan amount.", "Enter the annual interest rate (e.g., 8.5 for 8.5%).", "Enter the loan tenure in years (e.g., 5).", "Click 'Calculate EMI' to see your monthly payment."]
        }
      ]
    },
    discount: {
      title: "Discount Calculator Guide",
      sections: [
        {
          title: "How to Use",
          content: ["Enter the original price of the item.", "Enter the discount percentage (e.g., 20 for 20% off).", "Click 'Calculate Final Price' to see the price after the discount and your total savings."]
        }
      ]
    },
    grade: {
      title: "Grade Average Calculator Guide",
      sections: [
        {
          title: "How to Use",
          content: ["Enter your grades (as numbers) into the input fields.", "Only fields with numbers will be counted.", "Click 'Calculate Average' to see your average grade."]
        }
      ]
    }
  };


  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Advanced Calculator Suite</h1>
        <p className="text-lg text-muted-foreground">
          Complete calculator with scientific functions, customizable GPA calculator, and detailed tutorials
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'basic' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Simple Calculator
          </h2>
          <p className="text-sm text-muted-foreground">
            Use keyboard: Numbers (0-9), Operations (+, -, *, /), Enter (=), Escape (Clear), Backspace
          </p>

          <div className="w-full max-w-sm mx-auto">
            {expression && (
              <div className="mb-2 p-2 text-right text-sm text-muted-foreground bg-muted/50 rounded">
                {expression}
              </div>
            )}
            
            <div className="mb-4 p-4 text-right text-3xl font-bold bg-muted rounded-lg break-all min-h-[68px] flex items-center justify-end">
              {display}
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button onClick={handleClear} className="col-span-2 p-4 text-lg font-semibold bg-destructive text-destructive-foreground rounded-lg">
                Clear
              </button>
              <button onClick={handleBackspace} className="p-4 text-lg font-semibold bg-muted hover:bg-muted/80 rounded-lg">
                ⌫
              </button>
              <button onClick={() => handleOperationClick('/')} className="p-4 text-lg font-semibold bg-primary text-primary-foreground rounded-lg">
                /
              </button>

              {['7', '8', '9', '*'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => btn === '*' ? handleOperationClick('*') : handleNumberClick(btn)}
                  className={`p-4 text-lg font-semibold rounded-lg ${
                    btn === '*' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {btn}
                </button>
              ))}

              {['4', '5', '6', '-'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => btn === '-' ? handleOperationClick('-') : handleNumberClick(btn)}
                  className={`p-4 text-lg font-semibold rounded-lg ${
                    btn === '-' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {btn}
                </button>
              ))}

              {['1', '2', '3', '+'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => btn === '+' ? handleOperationClick('+') : handleNumberClick(btn)}
                  className={`p-4 text-lg font-semibold rounded-lg ${
                    btn === '+' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {btn}
                </button>
              ))}

              <button onClick={() => handleNumberClick('0')} className="p-4 text-lg font-semibold bg-muted hover:bg-muted/80 rounded-lg col-span-2">
                0
              </button>
              <button onClick={() => handleNumberClick('.')} className="p-4 text-lg font-semibold bg-muted hover:bg-muted/80 rounded-lg">
                .
              </button>
              <button onClick={handleEquals} className="p-4 text-lg font-semibold bg-primary text-primary-foreground rounded-lg">
                =
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'scientific' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Scientific Calculator
          </h2>
          <p className="text-sm text-muted-foreground">
            Use keyboard: Numbers (0-9), Operations (+, -, *, /), Enter (=), Escape (Clear), Backspace
            <br />
            Advanced: Alt+S (sin), Alt+C (cos), Alt+T (tan), Alt+L (log), Alt+N (ln), Alt+R (sqrt), Alt+P (π)
          </p>

          <div className="w-full max-w-2xl mx-auto">
            {scientificExpression && (
              <div className="mb-2 p-2 text-right text-sm text-muted-foreground bg-muted/50 rounded">
                {scientificExpression}
              </div>
            )}
            
            <div className="mb-4 p-4 text-right text-3xl font-bold bg-muted rounded-lg break-all min-h-[68px]">
              {scientificDisplay}
            </div>

            <div className="grid grid-cols-6 gap-2">
              <button onClick={() => handleScientificOperation('memoryAdd')} className="p-3 text-sm font-semibold bg-muted hover:bg-muted/80 rounded-lg">
                M+
              </button>
              <button onClick={() => handleScientificOperation('memoryRecall')} className="p-3 text-sm font-semibold bg-muted hover:bg-muted/80 rounded-lg">
                MR
              </button>
              <button onClick={() => handleScientificOperation('memoryClear')} className="p-3 text-sm font-semibold bg-muted hover:bg-muted/80 rounded-lg">
                MC
              </button>
              <button onClick={() => handleScientificOperation('pi')} className="p-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
                π
              </button>
              <button onClick={() => handleScientificOperation('e')} className="p-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
                e
              </button>
              <button onClick={() => setScientificDisplay('0')} className="p-3 text-sm font-semibold bg-destructive text-destructive-foreground rounded-lg">
                Clear
              </button>

              <button onClick={() => handleScientificOperation('sin')} className="p-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
                sin
              </button>
              <button onClick={() => handleScientificOperation('cos')} className="p-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
                cos
              </button>
              <button onClick={() => handleScientificOperation('tan')} className="p-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
                tan
              </button>
              <button onClick={() => handleScientificOperation('log')} className="p-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
                log
              </button>
              <button onClick={() => handleScientificOperation('ln')} className="p-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
                ln
              </button>
              <button onClick={() => handleScientificOperation('exp')} className="p-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
                e^x
              </button>

              <button onClick={() => handleScientificOperation('square')} className="p-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
                x²
              </button>
              <button onClick={() => handleScientificOperation('cube')} className="p-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
                x³
              </button>
              <button onClick={() => handleScientificOperation('sqrt')} className="p-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
                √
              </button>
              <button onClick={() => handleScientificOperation('power')} className="p-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
                x^2
              </button>
              <button onClick={() => handleScientificOperation('power3')} className="p-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
                x^3
              </button>
              <button onClick={() => handleScientificOperation('factorial')} className="p-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
                x!
              </button>

              {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => setScientificDisplay(scientificDisplay === '0' || scientificDisplay === 'Error' ? btn : scientificDisplay + btn)}
                  className="p-3 text-lg font-semibold bg-muted hover:bg-muted/80 rounded-lg"
                >
                  {btn}
                </button>
              ))}

              <button onClick={() => handleScientificInput('+')} className="p-3 text-lg font-semibold bg-primary text-primary-foreground rounded-lg">
                +
              </button>
              <button onClick={() => handleScientificInput('-')} className="p-3 text-lg font-semibold bg-primary text-primary-foreground rounded-lg">
                -
              </button>
              <button onClick={() => handleScientificInput('*')} className="p-3 text-lg font-semibold bg-primary text-primary-foreground rounded-lg">
                ×
              </button>
              <button onClick={() => handleScientificInput('/')} className="p-3 text-lg font-semibold bg-primary text-primary-foreground rounded-lg">
                ÷
              </button>
              <button onClick={handleScientificEquals} className="p-3 text-lg font-semibold bg-primary text-primary-foreground rounded-lg col-span-2">
                =
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'percentage' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Percentage Calculator
          </h2>

          <div>
            <label className="block text-sm font-medium mb-2">
              What is % (percentage)
            </label>
            <input
              type="number"
              value={percentValue}
              onChange={(e) => setPercentValue(e.target.value)}
              placeholder="Enter percentage"
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              of (total value)
            </label>
            <input
              type="number"
              value={percentOf}
              onChange={(e) => setPercentOf(e.target.value)}
              placeholder="Enter total value"
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>

          <button
            onClick={calculatePercentage}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
          >
            Calculate
          </button>

          {percentResult && (
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">Result:</p>
              <p className="text-2xl font-bold text-foreground">
                {percentResult}
              </p>
            </div>
          )}

          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">
              Formula: (Percentage / 100) × Total Value
            </p>
          </div>
        </div>
      )}

      {activeTab === 'bmi' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            BMI Calculator
          </h2>

          <div>
            <label className="block text-sm font-medium mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height in cm"
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>

          <button
            onClick={calculateBMI}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
          >
            Calculate BMI
          </button>

          {bmiResult && (
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground mb-1">
                  Your BMI:
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {bmiResult}
                </p>
              </div>
              {bmiCategory && (
                <div className="p-4 rounded-lg bg-primary/10">
                  <p className="text-sm text-muted-foreground mb-1">
                    Category:
                  </p>
                  <p className="text-xl font-semibold text-primary">
                    {bmiCategory}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-2">
              BMI Formula: Weight (kg) / [Height (m)]²
            </p>
            <p className="text-sm text-muted-foreground">
              Categories: Underweight (&lt;18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (≥30)
            </p>
          </div>
        </div>
      )}

      {activeTab === 'emi' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            EMI / Loan Calculator
          </h2>

          <div>
            <label className="block text-sm font-medium mb-2">
              Loan Amount (e.g., 500000)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Interest Rate (% per year) (e.g., 8.5)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate"
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Loan Tenure (years) (e.g., 5)
            </label>
            <input
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              placeholder="Enter tenure"
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>

          <button
            onClick={calculateEMI}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
          >
            Calculate EMI
          </button>

          {emiResult && (
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">
                Monthly EMI:
              </p>
              <p className="text-3xl font-bold text-foreground">
                {emiResult}
              </p>
            </div>
          )}

          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">
              EMI Formula: [P × r × (1+r)ⁿ] / [(1+r)ⁿ-1]
              <br />
              Where P = Principal, r = Monthly interest rate, n = Number of months
            </p>
          </div>
        </div>
      )}

      {activeTab === 'discount' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Discount Calculator
          </h2>

          <div>
            <label className="block text-sm font-medium mb-2">
              Original Price (e.g., 1000)
            </label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Enter original price"
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Discount (%) (e.g., 20)
            </label>
            <input
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              placeholder="Enter discount percentage"
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>

          <button
            onClick={calculateDiscount}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
          >
            Calculate Final Price
          </button>

          {finalPrice && (
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">
                Final Price:
              </p>
              <p className="text-3xl font-bold text-foreground">
                {finalPrice}
              </p>
              {finalPrice !== 'Invalid Input' && parseFloat(originalPrice) > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  You save: 
                  {(
                    parseFloat(originalPrice) - parseFloat(finalPrice)
                  ).toFixed(2)}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'grade' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Grade / Average Calculator
          </h2>

          {grades.map((grade, index) => (
            <div key={index}>
              <label className="block text-sm font-medium mb-2">
                Grade {index + 1}
              </label>
              <input
                type="number"
                value={grade}
                onChange={(e) => {
                  const newGrades = [...grades];
                  newGrades[index] = e.target.value;
                  setGrades(newGrades);
                }}
                placeholder={`Enter grade ${index + 1} (e.g., 85)`}
                className="w-full p-3 rounded-lg border bg-background"
              />
            </div>
          ))}

          <button
            onClick={calculateGrade}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
          >
            Calculate Average
          </button>

          {gradeResult && (
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">
                Average Grade:
              </p>
              <p className="text-3xl font-bold text-foreground">
                {gradeResult}
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'gpa' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            GPA Calculator (University)
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                GPA Scale
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

            {customGrades && (
              <div className="p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Custom Grade Values</h3>
                  <button
                    onClick={addCustomGrade}
                    className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4" />
                    Add Grade
                  </button>
                </div>
                
                <div className="space-y-3">
                  {gradeValues.map((grade, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                      <div>
                        <label className="block text-sm font-medium mb-1">Grade Letter</label>
                        <input
                          type="text"
                          value={grade.grade}
                          onChange={(e) => updateCustomGrade(index, 'grade', e.target.value)}
                          placeholder="e.g., A+"
                          className="w-full p-2 rounded border bg-background"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Grade Value</label>
                        <input
                          type="number"
                          step="0.1"
                          value={grade.value}
                          onChange={(e) => updateCustomGrade(index, 'value', e.target.value)}
                          placeholder="e.g., 4.0"
                          className="w-full p-2 rounded border bg-background"
                        />
                      </div>
                      <div className="flex gap-2">
                        {gradeValues.length > 1 && (
                          <button
                            onClick={() => removeCustomGrade(index)}
                            className="w-full py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
                          >
                            <Minus className="h-4 w-4 mx-auto" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border rounded-lg bg-muted/30">
              <h3 className="text-lg font-semibold mb-3">Current Grade Values</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {gradeValues.map((grade, index) => (
                  <div key={index} className="p-2 bg-background rounded text-center">
                    <div className="font-semibold">{grade.grade}</div>
                    <div className="text-sm text-muted-foreground">{grade.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Courses</h3>
              <button
                onClick={addCourse}
                className="flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
                Add Course
              </button>
            </div>

            {courses.map((course, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 border rounded-lg">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    value={course.subject}
                    onChange={(e) => updateCourse(index, 'subject', e.target.value)}
                    placeholder="e.g., Mathematics"
                    className="w-full p-2 rounded-lg border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Credit Hours
                  </label>
                  <input
                    type="number"
                    value={course.credit}
                    onChange={(e) => updateCourse(index, 'credit', e.target.value)}
                    placeholder="e.g., 3"
                    className="w-full p-2 rounded-lg border bg-background"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Grade
                  </label>
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                    className="w-full p-2 rounded-lg border bg-background"
                  >
                    <option value="">Select Grade</option>
                    {gradeValues.map((g, i) => (
                      <option key={i} value={g.grade}>
                        {g.grade} ({g.value})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  {courses.length > 1 && (
                    <button
                      onClick={() => removeCourse(index)}
                      className="w-full py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={calculateGPA}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
          >
            Calculate GPA
          </button>

          {gpaResult && (
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">
                Your GPA:
              </p>
              <p className="text-3xl font-bold text-foreground">
                {gpaResult}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                on {customGrades ? 'custom' : gpaScale} scale
              </p>
            </div>
          )}
        </div>
      )}

      {/* --- Tutorials Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Tutorials & Guides</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-2">
            <h3 className="font-semibold mb-3 text-lg">Select Tutorial:</h3>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTutorial(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all border ${
                  activeTutorial === tab.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background hover:bg-muted border-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-background border rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                {tutorials[activeTutorial as keyof typeof tutorials]?.title}
              </h3>
              
              <div className="space-y-6">
                {/* ===> FIXED: Added types and keys <=== */}
                {tutorials[activeTutorial as keyof typeof tutorials]?.sections?.map((section: { title: string, content: string[] }, sectionIndex: number) => (
                  <div key={sectionIndex} className="space-y-4">
                    <h4 className="text-xl font-semibold text-foreground border-b pb-2">
                      {section.title}
                    </h4>
                    
                    <div className="prose prose-lg max-w-none text-foreground">
                      {section.content.map((line: string, lineIndex: number) => (
                        <div key={lineIndex} className="mb-3">
                          {line.startsWith('**') && line.endsWith('**') ? (
                            <strong className="text-foreground text-lg">{line.slice(2, -2)}</strong>
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

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 dark:bg-blue-950/50 dark:border-blue-800">
              <h4 className="text-lg font-bold mb-3 text-blue-800 dark:text-blue-300">Pro Tip</h4>
              <p className="text-blue-700 dark:text-blue-300">
                {activeTutorial === 'basic' && "Use keyboard shortcuts for faster calculations."}
                {activeTutorial === 'scientific' && "Master Alt key combinations for advanced functions."}
                {activeTutorial === 'percentage' && "You can calculate tips or sales tax quickly here."}
                {activeTutorial === 'bmi' && "Track your BMI regularly for better health awareness."}
                {activeTutorial === 'emi' && "Check your monthly payments before taking a loan."}
                {activeTutorial === 'discount' && "Instantly find out the final price during a sale."}
                {activeTutorial === 'grade' && "Quickly find your average score before an exam."}
                {activeTutorial === 'gpa' && "Calculate your GPA each semester to stay on track."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/time-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Time Converter
          </a>
          <a href="/measurement-converter" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Unit Converter
          </a>
          <a href="/#tools" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            All Tools
          </a>
          <a href="/about" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            About Us
          </a>
        </div>
      </div>
    </div>
  );
}