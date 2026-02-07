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
                className={`p-4 text-lg font-semibold rounded-lg ${btn === '*' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                  }`}
              >
                {btn}
              </button>
            ))}

            {['4', '5', '6', '-'].map((btn) => (
              <button
                key={btn}
                onClick={() => btn === '-' ? handleOperationClick('-') : handleNumberClick(btn)}
                className={`p-4 text-lg font-semibold rounded-lg ${btn === '-' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                  }`}
              >
                {btn}
              </button>
            ))}

            {['1', '2', '3', '+'].map((btn) => (
              <button
                key={btn}
                onClick={() => btn === '+' ? handleOperationClick('+') : handleNumberClick(btn)}
                className={`p-4 text-lg font-semibold rounded-lg ${btn === '+' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
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

      {/* Comprehensive SEO Content */}
      <div className="space-y-10 border-t pt-8 mt-8">

        {/* What is a Basic Calculator */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Free Online Calculator for Quick Math</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="leading-relaxed">
              A <strong>basic calculator</strong> is an essential tool for performing everyday arithmetic operations including addition, subtraction, multiplication, and division. Our <strong>free online calculator</strong> works instantly in your browser, making it perfect for quick calculations at home, work, or school.
            </p>
            <p className="leading-relaxed">
              Whether you're balancing a budget, calculating tips, checking homework, or doing quick math at work, this calculator provides instant, accurate results without any downloads or installations. All calculations happen directly in your browser for complete privacy.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Calculator Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">⌨️</span>
              </div>
              <div>
                <h3 className="font-semibold">Keyboard Support</h3>
                <p className="text-sm text-muted-foreground">Use your keyboard for faster input. Numbers, operators (+, -, *, /), Enter for equals, and Escape to clear all work seamlessly.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📝</span>
              </div>
              <div>
                <h3 className="font-semibold">Expression History</h3>
                <p className="text-sm text-muted-foreground">See your entire calculation displayed above the result, making it easy to verify your work and catch errors.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">⚠️</span>
              </div>
              <div>
                <h3 className="font-semibold">Error Handling</h3>
                <p className="text-sm text-muted-foreground">Clear error messages for invalid operations like division by zero help you understand what went wrong.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🔢</span>
              </div>
              <div>
                <h3 className="font-semibold">Decimal Support</h3>
                <p className="text-sm text-muted-foreground">Perform calculations with decimal numbers for precise results. The calculator handles both whole numbers and decimals.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Everyday Uses for a Calculator</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">🛒</div>
              <h3 className="font-bold text-lg mb-2">Shopping</h3>
              <p className="text-sm text-muted-foreground">Add up prices, calculate totals, split bills, and determine if you're staying within budget while shopping online or in stores.</p>
            </div>
            <div className="p-5 rounded-xl border hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="font-bold text-lg mb-2">Work</h3>
              <p className="text-sm text-muted-foreground">Quick calculations for invoices, expense reports, time tracking, and everyday business math without opening a spreadsheet.</p>
            </div>
            <div className="p-5 rounded-xl border hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-bold text-lg mb-2">Homework</h3>
              <p className="text-sm text-muted-foreground">Check your math homework answers, practice arithmetic, and verify calculations for school assignments quickly.</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                Can I use my keyboard with this calculator?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                Yes! The calculator fully supports keyboard input. Use number keys (0-9) for digits, +, -, *, / for operations, Enter or = for equals, Escape or Delete to clear, and Backspace to delete the last digit.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                What happens if I divide by zero?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                Division by zero is mathematically undefined. Our calculator will display "Error" and clear the calculation, allowing you to start fresh with a valid operation.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                How do I chain multiple operations?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                Simply keep entering operations after each number. For example: 5 + 3 * 2 - 4 =. The calculator processes operations from left to right as you enter them, so intermediate results are shown after each operation.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                Is this calculator free to use?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                Yes, our online calculator is 100% free with no hidden costs, subscriptions, or advertisements. Use it as many times as you need without any limitations.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                Does the calculator store my calculations?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                No, all calculations happen entirely in your browser. Nothing is sent to our servers or stored anywhere. Your privacy is completely protected.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                What's the maximum number this calculator can handle?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                The calculator uses JavaScript's number system which can accurately handle numbers up to about 9 quadrillion (9,007,199,254,740,992). For most everyday calculations, this is more than sufficient.
              </p>
            </details>
          </div>
        </section>

        {/* Related Tools */}
        <section className="p-6 rounded-xl bg-primary/5 border border-primary/20">
          <h3 className="text-xl font-bold mb-4 text-center">More Calculator Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <a href="/scientific-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
              <div className="font-medium">Scientific Calculator</div>
              <div className="text-xs text-muted-foreground">Advanced math</div>
            </a>
            <a href="/percentage-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
              <div className="font-medium">Percentage Calculator</div>
              <div className="text-xs text-muted-foreground">Calculate %</div>
            </a>
            <a href="/discount-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
              <div className="font-medium">Discount Calculator</div>
              <div className="text-xs text-muted-foreground">Find savings</div>
            </a>
            <a href="/emi-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
              <div className="font-medium">EMI Calculator</div>
              <div className="text-xs text-muted-foreground">Loan payments</div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}