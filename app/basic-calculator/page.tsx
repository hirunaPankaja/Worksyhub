// src/app/basic-calculator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

export default function BasicCalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [expression, setExpression] = useState('');

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;

      if (/[0-9.]/.test(key)) {
        handleNumberClick(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperationClick(key);
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleEquals();
      } else if (key === 'Escape' || key === 'Delete') {
        handleClear();
      } else if (key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, previousValue, operation, waitingForNewValue]);

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
        // Handle expression building from the start
        const newExpression = (display === '0' && num !== '.') ? num : (waitingForNewValue ? num : display + num);
        setExpression(newExpression);
      } else {
        setExpression(expression + num);
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
      if (result === 'Error') {
        handleClear();
        setExpression('Error: Division by zero');
        setDisplay('Error');
        return;
      }
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
    setExpression((previousValue || currentValue) + ' ' + op + ' ');
  };

  const performCalculation = (): number | 'Error' => {
    const current = parseFloat(display);
    if (previousValue === null) return current;

    switch (operation) {
      case '+': return previousValue + current;
      case '-': return previousValue - current;
      case '*': return previousValue * current;
      case '/': 
        if (current === 0) {
          return 'Error';
        }
        return previousValue / current;
      default: return current;
    }
  };

  const handleEquals = () => {
    if (previousValue === null || operation === null || waitingForNewValue) return;

    const result = performCalculation();
    if (result === 'Error') {
      handleClear();
      setExpression('Error: Division by zero');
      setDisplay('Error');
      return;
    }
    
    setExpression(previousValue + ' ' + operation + ' ' + display + ' = ' + result);
    setDisplay(String(result));
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
    if (waitingForNewValue) return;
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const tutorials = {
    title: 'Basic Calculator Guide',
    sections: [
      {
        title: 'Quick Start Guide',
        content: [
          'Learn to use the basic calculator with these essential tips and shortcuts.',
          '',
          '**Keyboard Shortcuts:**',
          '  - **Numbers:** 0-9 keys for quick input',
          '  - **Operations:** +, -, *, / keys for calculations',
          '  - **Equals:** Press Enter or = key for results',
          '  - **Clear:** Use Escape or Delete to reset',
          '  - **Backspace:** Remove last digit easily',
          '',
          "Tip: Chain multiple operations like '2 + 3 * 4 =' for complex calculations (result: 14).",
        ],
      },
      {
        title: 'Advanced Features',
        content: [
          '**Expression Display:** See your entire calculation history in the faded text above the result.',
          '**Error Handling:** Get clear error messages for invalid operations like dividing by zero.',
          '',
          '**Example Workflow:**',
          "1. Type '25' then '+'",
          "2. Type '15' then '='",
          "3. See result: '40' instantly",
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Basic Calculator</h1>
        <p className="text-lg text-muted-foreground">
          A simple calculator for your everyday math needs
        </p>
      </div>

      <div className="p-6 rounded-xl border bg-card space-y-6">
        <div className="w-full max-w-sm mx-auto">
          {expression && (
            <div className="mb-2 p-2 text-right text-sm text-muted-foreground bg-muted/50 rounded h-8 overflow-x-auto overflow-y-hidden">
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

      {/* --- Tutorials Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Tutorials & Guides</h2>
        </div>

        <div className="bg-background border rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            {tutorials.title}
          </h3>
          
          <div className="space-y-6">
            {tutorials.sections.map((section: { title: string, content: string[] }, sectionIndex: number) => (
              <div key={sectionIndex} className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground border-b pb-2">
                  {section.title}
                </h4>
                
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
      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/scientific-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Scientific Calculator
          </a>
          <a href="/bmi-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            BMI Calculator
          </a>
          <a href="/gpa-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            GPA Calculator
          </a>
          <a href="/discount-calculator" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Discount Calculator
          </a>
        </div>
      </div>
    </div>
  );
}