// src/app/scientific-calculator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

export default function ScientificCalculatorPage() {
  const [scientificDisplay, setScientificDisplay] = useState('0');
  const [scientificMemory, setScientificMemory] = useState(0);
  const [scientificExpression, setScientificExpression] = useState('');

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;

      if (/[0-9.]/.test(key)) {
        setScientificDisplay(
          scientificDisplay === '0' || scientificDisplay === 'Error'
            ? key
            : scientificDisplay + key
        );
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleScientificInput(key);
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleScientificEquals();
      } else if (key === 'Escape' || key === 'Delete') {
        setScientificDisplay('0');
        setScientificExpression('');
      } else if (key === 'Backspace') {
        if (scientificDisplay.length > 1) {
          setScientificDisplay(scientificDisplay.slice(0, -1));
        } else {
          setScientificDisplay('0');
        }
      } else if (key === 's' && event.altKey) {
        handleScientificOperation('sin');
      } else if (key === 'c' && event.altKey) {
        handleScientificOperation('cos');
      } else if (key === 't' && event.altKey) {
        handleScientificOperation('tan');
      } else if (key === 'l' && event.altKey) {
        handleScientificOperation('log');
      } else if (key === 'n' && event.altKey) {
        handleScientificOperation('ln');
      } else if (key === 'r' && event.altKey) {
        handleScientificOperation('sqrt');
      } else if (key === 'p' && event.altKey) {
        handleScientificOperation('pi');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [scientificDisplay, scientificExpression]); // Updated dependencies

  const handleScientificInput = (input: string) => {
    setScientificExpression(scientificExpression + scientificDisplay + ' ' + input + ' ');
    setScientificDisplay('0');
  };

  const handleScientificEquals = () => {
    try {
      const expression = scientificExpression + scientificDisplay;
      // Using eval is generally unsafe, but for a self-contained calculator it's a simple solution.
      // A safer method would be to parse the expression.
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
      case 'power': // Assuming x^2
        result = Math.pow(value, 2);
        displayText = `${value}^2 = ${result}`;
        break;
      case 'power3': // Assuming x^3
        result = Math.pow(value, 3);
        displayText = `${value}^3 = ${result}`;
        break;
      case 'sin':
        result = Math.sin((value * Math.PI) / 180);
        displayText = `sin(${value}°) = ${result.toFixed(8)}`;
        break;
      case 'cos':
        result = Math.cos((value * Math.PI) / 180);
        displayText = `cos(${value}°) = ${result.toFixed(8)}`;
        break;
      case 'tan':
        result = Math.tan((value * Math.PI) / 180);
        displayText = `tan(${value}°) = ${result.toFixed(8)}`;
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
        displayText = 'π = 3.1415926535...';
        break;
      case 'e':
        result = Math.E;
        displayText = 'e = 2.7182818284...';
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
    if (n > 21) return Infinity; // Prevent stack overflow/performance issues
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const tutorials = {
    title: 'Scientific Calculator Guide',
    sections: [
      {
        title: 'Advanced Functions',
        content: [
          'Unlock powerful mathematical capabilities with our scientific calculator.',
          '',
          '**Keyboard Shortcuts:**',
          '  - **Alt+S:** Sine function',
          '  - **Alt+C:** Cosine function',
          '  - **Alt+T:** Tangent function',
          '  - **Alt+L:** Logarithm (base 10)',
          '  - **Alt+N:** Natural logarithm',
          '  - **Alt+R:** Square root',
          '  - **Alt+P:** π constant',
          '',
          '**Available Functions:**',
          '  - Trigonometric (sin, cos, tan in degrees)',
          '  - Exponential and Logarithmic (log, ln, e^x)',
          '  - Power functions (x², x³)',
          '  - Constants (π, e)',
          '  - Factorial (x!)',
          '  - Memory (M+, MR, MC)',
        ],
      },
      {
        title: 'Real-world Applications',
        content: [
          '**Engineering Calculations:**',
          '  - Structural design with trigonometric functions',
          '  - Electrical engineering with exponential calculations',
          '',
          '**Scientific Research:**',
          '  - Statistical analysis with factorial',
          '  - Physics calculations with constants',
          '',
          '**Academic Use:**',
          '  - Advanced mathematics homework',
          '  - University-level calculations',
          '',
          'Example: Calculate sin(30) + cos(60) = 1.0',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Scientific Calculator
        </h1>
        <p className="text-lg text-muted-foreground">
          Perform advanced calculations with trig, logs, powers, and more.
        </p>
      </div>

      <div className="p-6 rounded-xl border bg-card space-y-6">
        <div className="w-full max-w-2xl mx-auto">
          {scientificExpression && (
            <div className="mb-2 p-2 text-right text-sm text-muted-foreground bg-muted/50 rounded h-8 overflow-x-auto overflow-y-hidden">
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
            <button onClick={() => { setScientificDisplay('0'); setScientificExpression(''); }} className="p-3 text-sm font-semibold bg-destructive text-destructive-foreground rounded-lg">
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
            <button onClick={() => handleScientificOperation('abs')} className="p-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
              |x|
            </button>
            <button onClick={() => handleScientificOperation('factorial')} className="p-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
              x!
            </button>
            <button onClick={() => handleScientificInput('/')} className="p-3 text-lg font-semibold bg-primary text-primary-foreground rounded-lg">
              ÷
            </button>

            {['7', '8', '9'].map((btn) => (
              <button
                key={btn}
                onClick={() => setScientificDisplay(scientificDisplay === '0' || scientificDisplay === 'Error' ? btn : scientificDisplay + btn)}
                className="p-3 text-lg font-semibold bg-muted hover:bg-muted/80 rounded-lg"
              >
                {btn}
              </button>
            ))}
            <button onClick={() => handleScientificInput('*')} className="p-3 text-lg font-semibold bg-primary text-primary-foreground rounded-lg">
              ×
            </button>

            {['4', '5', '6'].map((btn) => (
              <button
                key={btn}
                onClick={() => setScientificDisplay(scientificDisplay === '0' || scientificDisplay === 'Error' ? btn : scientificDisplay + btn)}
                className="p-3 text-lg font-semibold bg-muted hover:bg-muted/80 rounded-lg"
              >
                {btn}
              </button>
            ))}
            <button onClick={() => handleScientificInput('-')} className="p-3 text-lg font-semibold bg-primary text-primary-foreground rounded-lg">
              -
            </button>

            {['1', '2', '3'].map((btn) => (
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

            <button onClick={() => setScientificDisplay(scientificDisplay + '0')} className="p-3 text-lg font-semibold bg-muted hover:bg-muted/80 rounded-lg col-span-2">
              0
            </button>
            <button onClick={() => setScientificDisplay(scientificDisplay.includes('.') ? scientificDisplay : scientificDisplay + '.')} className="p-3 text-lg font-semibold bg-muted hover:bg-muted/80 rounded-lg">
              .
            </button>
            <button onClick={handleScientificEquals} className="p-3 text-lg font-semibold bg-primary text-primary-foreground rounded-lg">
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

        {/* What is a Scientific Calculator */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">What is a Scientific Calculator? Complete Guide</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="leading-relaxed">
              A <strong>scientific calculator</strong> is an advanced calculating device that can perform mathematical operations beyond basic arithmetic. Unlike simple calculators, scientific calculators include functions for trigonometry, logarithms, exponents, factorials, and mathematical constants like π (pi) and e (Euler's number).
            </p>
            <p className="leading-relaxed">
              Our <strong>free online scientific calculator</strong> provides all the functionality of physical scientific calculators without needing to purchase one. Whether you're a student working on algebra, a professional engineer, or anyone needing advanced math capabilities, this calculator works directly in your browser with no downloads required.
            </p>
          </div>
        </section>

        {/* Functions Explained */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Scientific Calculator Functions Explained</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border bg-blue-50/50 dark:bg-blue-900/20">
              <h3 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-300">Trigonometric Functions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>sin(x)</strong> – Calculates the sine of angle x in degrees</li>
                <li><strong>cos(x)</strong> – Calculates the cosine of angle x in degrees</li>
                <li><strong>tan(x)</strong> – Calculates the tangent of angle x in degrees</li>
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">Example: sin(30) = 0.5, cos(60) = 0.5</p>
            </div>
            <div className="p-5 rounded-xl border bg-green-50/50 dark:bg-green-900/20">
              <h3 className="font-bold text-lg mb-3 text-green-700 dark:text-green-300">Logarithmic Functions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>log(x)</strong> – Base-10 logarithm (common log)</li>
                <li><strong>ln(x)</strong> – Natural logarithm (base e)</li>
                <li><strong>e^x</strong> – Exponential function</li>
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">Example: log(100) = 2, ln(e) = 1</p>
            </div>
            <div className="p-5 rounded-xl border bg-purple-50/50 dark:bg-purple-900/20">
              <h3 className="font-bold text-lg mb-3 text-purple-700 dark:text-purple-300">Power & Root Functions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>x²</strong> – Square of a number</li>
                <li><strong>x³</strong> – Cube of a number</li>
                <li><strong>√x</strong> – Square root</li>
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">Example: 5² = 25, √16 = 4</p>
            </div>
            <div className="p-5 rounded-xl border bg-orange-50/50 dark:bg-orange-900/20">
              <h3 className="font-bold text-lg mb-3 text-orange-700 dark:text-orange-300">Special Functions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>x!</strong> – Factorial (x × (x-1) × ... × 1)</li>
                <li><strong>|x|</strong> – Absolute value</li>
                <li><strong>π, e</strong> – Mathematical constants</li>
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">Example: 5! = 120, π ≈ 3.14159</p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Who Uses Scientific Calculators?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="font-bold text-lg mb-2">Students</h3>
              <p className="text-sm text-muted-foreground">From algebra and geometry to calculus and physics, students use scientific calculators for homework, tests, and understanding mathematical concepts.</p>
            </div>
            <div className="p-5 rounded-xl border hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">⚙️</div>
              <h3 className="font-bold text-lg mb-2">Engineers</h3>
              <p className="text-sm text-muted-foreground">Mechanical, electrical, and civil engineers rely on trigonometric and logarithmic functions for design calculations, stress analysis, and signal processing.</p>
            </div>
            <div className="p-5 rounded-xl border hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">🔬</div>
              <h3 className="font-bold text-lg mb-2">Scientists</h3>
              <p className="text-sm text-muted-foreground">Researchers use scientific calculators for data analysis, statistical calculations, and complex mathematical models in physics, chemistry, and biology.</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                What's the difference between log and ln?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                <strong>log</strong> (common logarithm) uses base 10, while <strong>ln</strong> (natural logarithm) uses base e (approximately 2.718). Log is often used in engineering and science for orders of magnitude, while ln is common in calculus and growth/decay problems.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                Are the trigonometric functions in degrees or radians?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                Our calculator uses <strong>degrees</strong> for trigonometric functions (sin, cos, tan). This is the most common unit for everyday calculations. To convert radians to degrees, multiply by 180/π.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                What is factorial (x!) used for?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                Factorial is used in probability, combinatorics, and statistics. It calculates the number of ways to arrange items. For example, 5! = 5×4×3×2×1 = 120 represents the number of ways to arrange 5 different objects.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                How do I use the memory functions?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                <strong>M+</strong> adds the current value to memory, <strong>MR</strong> recalls the stored value, and <strong>MC</strong> clears the memory. Use these to store intermediate results in complex calculations.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                Can I use keyboard shortcuts?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                Yes! Use Alt+S for sine, Alt+C for cosine, Alt+T for tangent, Alt+L for log, Alt+N for natural log, Alt+R for square root, and Alt+P for π. Numbers and basic operators work directly from your keyboard.
              </p>
            </details>

            <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="font-medium flex items-center justify-between">
                Is this calculator accurate enough for professional use?
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-muted-foreground">
                Our calculator uses JavaScript's built-in Math functions which provide double-precision floating-point accuracy (about 15-17 significant digits). This is suitable for most educational and professional calculations.
              </p>
            </details>
          </div>
        </section>

        {/* Related Tools */}
        <section className="p-6 rounded-xl bg-primary/5 border border-primary/20">
          <h3 className="text-xl font-bold mb-4 text-center">Related Calculator Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <a href="/basic-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
              <div className="font-medium">Basic Calculator</div>
              <div className="text-xs text-muted-foreground">Simple math</div>
            </a>
            <a href="/percentage-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
              <div className="font-medium">Percentage Calculator</div>
              <div className="text-xs text-muted-foreground">Calculate %</div>
            </a>
            <a href="/bmi-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
              <div className="font-medium">BMI Calculator</div>
              <div className="text-xs text-muted-foreground">Health check</div>
            </a>
            <a href="/unit-converter" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
              <div className="font-medium">Unit Converter</div>
              <div className="text-xs text-muted-foreground">Convert units</div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}