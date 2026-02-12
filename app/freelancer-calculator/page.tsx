'use client';

import { useState, useMemo } from 'react';
import {
    DollarSign, Clock, Globe, Calculator, PieChart, Briefcase,
    ArrowRightLeft, TrendingUp, Minus, Plus, Info
} from 'lucide-react';

type Tab = 'hourly' | 'timezone' | 'project' | 'income';

export default function FreelancerCalculatorPage() {
    const [activeTab, setActiveTab] = useState<Tab>('hourly');

    const tabs = [
        { id: 'hourly' as Tab, label: 'Hourly Rate', icon: DollarSign, desc: 'Calculate your ideal hourly rate' },
        { id: 'project' as Tab, label: 'Project Pricing', icon: Briefcase, desc: 'Quote projects accurately' },
        { id: 'timezone' as Tab, label: 'Time Zone Check', icon: Globe, desc: 'Convert client meeting times' },
        { id: 'income' as Tab, label: 'Income Summary', icon: TrendingUp, desc: 'Track monthly earnings' },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <div className="p-3 rounded-xl bg-emerald-500/10">
                        <Calculator className="h-10 w-10 text-emerald-500" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-foreground">
                    Freelancer Calculator
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Calculate your hourly rate, price projects, check client time zones, and track your freelance income — all in one place.
                </p>
            </div>

            {/* Tab navigation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${activeTab === tab.id
                                ? 'border-emerald-500 bg-emerald-500/10 shadow-sm'
                                : 'border-border hover:border-emerald-300 hover:bg-muted/50'
                            }`}
                    >
                        <tab.icon className={`h-5 w-5 mb-2 ${activeTab === tab.id ? 'text-emerald-500' : 'text-muted-foreground'}`} />
                        <span className={`block font-semibold text-sm ${activeTab === tab.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'}`}>{tab.label}</span>
                        <span className="block text-xs text-muted-foreground mt-0.5">{tab.desc}</span>
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="rounded-2xl border bg-card p-6 md:p-8">
                {activeTab === 'hourly' && <HourlyRateCalculator />}
                {activeTab === 'project' && <ProjectPricing />}
                {activeTab === 'timezone' && <TimeZoneChecker />}
                {activeTab === 'income' && <IncomeSummary />}
            </div>
        </div>
    );
}

/* ─── Hourly Rate Calculator ───────────────────────────────── */
function HourlyRateCalculator() {
    const [annualIncome, setAnnualIncome] = useState(60000);
    const [monthlyExpenses, setMonthlyExpenses] = useState(2000);
    const [taxRate, setTaxRate] = useState(25);
    const [hoursPerWeek, setHoursPerWeek] = useState(40);
    const [billablePercent, setBillablePercent] = useState(65);
    const [vacationWeeks, setVacationWeeks] = useState(4);
    const [currency, setCurrency] = useState('$');

    const result = useMemo(() => {
        const workingWeeks = 52 - vacationWeeks;
        const totalHours = hoursPerWeek * workingWeeks;
        const billableHours = totalHours * (billablePercent / 100);
        const annualExpenses = monthlyExpenses * 12;
        const grossNeeded = (annualIncome + annualExpenses) / (1 - taxRate / 100);
        const hourlyRate = grossNeeded / billableHours;
        return {
            hourlyRate: Math.ceil(hourlyRate),
            billableHours: Math.round(billableHours),
            grossNeeded: Math.round(grossNeeded),
            dailyRate: Math.ceil(hourlyRate * 8),
            weeklyRate: Math.ceil(hourlyRate * hoursPerWeek * (billablePercent / 100)),
            monthlyGross: Math.round(grossNeeded / 12),
        };
    }, [annualIncome, monthlyExpenses, taxRate, hoursPerWeek, billablePercent, vacationWeeks]);

    const currencies = ['$', '€', '£', '₹', '¥', 'A$', 'C$'];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-emerald-500" /> Hourly Rate Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-5">
                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-sm font-medium text-foreground">Currency</label>
                        </div>
                        <select
                            value={currency}
                            onChange={e => setCurrency(e.target.value)}
                            className="w-full p-2 rounded-lg border"
                        >
                            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <NumberInput label="Desired Annual Income" value={annualIncome} onChange={setAnnualIncome} prefix={currency} step={5000} />
                    <NumberInput label="Monthly Business Expenses" value={monthlyExpenses} onChange={setMonthlyExpenses} prefix={currency} step={500} />
                    <NumberInput label="Estimated Tax Rate (%)" value={taxRate} onChange={setTaxRate} suffix="%" min={0} max={60} step={5} />
                    <NumberInput label="Hours / Week" value={hoursPerWeek} onChange={setHoursPerWeek} suffix="hrs" min={1} max={80} step={5} />
                    <NumberInput label="Billable Hours (%)" value={billablePercent} onChange={setBillablePercent} suffix="%" min={10} max={100} step={5} />
                    <NumberInput label="Vacation Weeks / Year" value={vacationWeeks} onChange={setVacationWeeks} suffix="wks" min={0} max={20} step={1} />
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-5">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Your Recommended Hourly Rate</p>
                        <p className="text-5xl font-bold text-emerald-600 dark:text-emerald-400">{currency}{result.hourlyRate}</p>
                        <p className="text-sm text-muted-foreground mt-1">per hour</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <ResultCard label="Daily Rate (8h)" value={`${currency}${result.dailyRate.toLocaleString()}`} />
                        <ResultCard label="Weekly Rate" value={`${currency}${result.weeklyRate.toLocaleString()}`} />
                        <ResultCard label="Monthly Gross" value={`${currency}${result.monthlyGross.toLocaleString()}`} />
                        <ResultCard label="Annual Gross Needed" value={`${currency}${result.grossNeeded.toLocaleString()}`} />
                        <ResultCard label="Billable Hours/Year" value={`${result.billableHours} hrs`} />
                        <ResultCard label="Working Weeks" value={`${52 - vacationWeeks} wks`} />
                    </div>
                    <p className="text-xs text-muted-foreground flex items-start gap-1">
                        <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                        Tip: Freelancers should aim for 50-65% billable time. The rest goes to admin, marketing, learning, and breaks.
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ─── Project Pricing ───────────────────────────────────────── */
function ProjectPricing() {
    const [hourlyRate, setHourlyRate] = useState(75);
    const [estimatedHours, setEstimatedHours] = useState(40);
    const [complexityBuffer, setComplexityBuffer] = useState(20);
    const [profitMargin, setProfitMargin] = useState(15);
    const [currency, setCurrency] = useState('$');

    const result = useMemo(() => {
        const hoursWithBuffer = estimatedHours * (1 + complexityBuffer / 100);
        const baseCost = hoursWithBuffer * hourlyRate;
        const withMargin = baseCost * (1 + profitMargin / 100);
        return {
            baseCost: Math.round(baseCost),
            totalHours: Math.round(hoursWithBuffer * 10) / 10,
            totalPrice: Math.round(withMargin),
            profit: Math.round(withMargin - baseCost),
        };
    }, [hourlyRate, estimatedHours, complexityBuffer, profitMargin]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-emerald-500" /> Project Pricing Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-foreground block mb-1">Currency</label>
                        <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full p-2 rounded-lg border">
                            {['$', '€', '£', '₹', '¥'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <NumberInput label="Your Hourly Rate" value={hourlyRate} onChange={setHourlyRate} prefix={currency} step={5} />
                    <NumberInput label="Estimated Hours" value={estimatedHours} onChange={setEstimatedHours} suffix="hrs" step={5} min={1} />
                    <NumberInput label="Complexity Buffer" value={complexityBuffer} onChange={setComplexityBuffer} suffix="%" step={5} min={0} max={100} />
                    <NumberInput label="Profit Margin" value={profitMargin} onChange={setProfitMargin} suffix="%" step={5} min={0} max={100} />
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 space-y-5">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Recommended Project Quote</p>
                        <p className="text-5xl font-bold text-blue-600 dark:text-blue-400">{currency}{result.totalPrice.toLocaleString()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <ResultCard label="Base Cost" value={`${currency}${result.baseCost.toLocaleString()}`} />
                        <ResultCard label="Profit" value={`${currency}${result.profit.toLocaleString()}`} />
                        <ResultCard label="Adjusted Hours" value={`${result.totalHours} hrs`} />
                        <ResultCard label="Effective Rate" value={`${currency}${Math.round(result.totalPrice / result.totalHours)}/hr`} />
                    </div>
                    <p className="text-xs text-muted-foreground flex items-start gap-1">
                        <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                        Always add a 15-25% complexity buffer for scope changes and unexpected work. Never quote just your raw hours.
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ─── Time Zone Checker ──────────────────────────────────────── */
const TIMEZONES = [
    { label: 'UTC (Coordinated Universal Time)', value: 'UTC' },
    { label: 'EST (New York) — UTC-5', value: 'America/New_York' },
    { label: 'CST (Chicago) — UTC-6', value: 'America/Chicago' },
    { label: 'MST (Denver) — UTC-7', value: 'America/Denver' },
    { label: 'PST (Los Angeles) — UTC-8', value: 'America/Los_Angeles' },
    { label: 'GMT (London) — UTC+0', value: 'Europe/London' },
    { label: 'CET (Paris/Berlin) — UTC+1', value: 'Europe/Paris' },
    { label: 'EET (Athens/Helsinki) — UTC+2', value: 'Europe/Athens' },
    { label: 'MSK (Moscow) — UTC+3', value: 'Europe/Moscow' },
    { label: 'GST (Dubai) — UTC+4', value: 'Asia/Dubai' },
    { label: 'IST (India) — UTC+5:30', value: 'Asia/Kolkata' },
    { label: 'ICT (Bangkok) — UTC+7', value: 'Asia/Bangkok' },
    { label: 'CST (China) — UTC+8', value: 'Asia/Shanghai' },
    { label: 'SGT (Singapore) — UTC+8', value: 'Asia/Singapore' },
    { label: 'JST (Tokyo) — UTC+9', value: 'Asia/Tokyo' },
    { label: 'KST (Seoul) — UTC+9', value: 'Asia/Seoul' },
    { label: 'AEST (Sydney) — UTC+10', value: 'Australia/Sydney' },
    { label: 'NZST (Auckland) — UTC+12', value: 'Pacific/Auckland' },
    { label: 'BRT (São Paulo) — UTC-3', value: 'America/Sao_Paulo' },
    { label: 'AST (Canada Atlantic) — UTC-4', value: 'America/Halifax' },
    { label: 'HST (Hawaii) — UTC-10', value: 'Pacific/Honolulu' },
    { label: 'AKST (Alaska) — UTC-9', value: 'America/Anchorage' },
];

function TimeZoneChecker() {
    const [clientTZ, setClientTZ] = useState('America/New_York');
    const [yourTZ, setYourTZ] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [meetingTime, setMeetingTime] = useState('10:00');
    const [meetingDate, setMeetingDate] = useState(() => new Date().toISOString().split('T')[0]);

    const convertedTime = useMemo(() => {
        try {
            const [hours, minutes] = meetingTime.split(':').map(Number);
            // Create a date in client's timezone
            const dateStr = `${meetingDate}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;

            // Get the offset by formatting in the client's timezone
            const clientFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: clientTZ,
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                hour12: false,
            });

            const yourFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: yourTZ,
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                hour12: false,
                weekday: 'short',
            });

            const yourFullFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: yourTZ,
                hour: '2-digit', minute: '2-digit',
                hour12: true,
                weekday: 'long',
                month: 'long', day: 'numeric',
            });

            // Create a reference date using UTC, adjusting by client TZ
            // Use a simpler approach: parse the date, set the time, convert
            const tempDate = new Date(`${meetingDate}T${meetingTime}:00`);

            // Get offsets
            const clientFormatted = clientFormatter.format(tempDate);
            const yourFormatted = yourFormatter.format(tempDate);
            const yourFull = yourFullFormatter.format(tempDate);

            // Calculate difference
            const clientParts = new Intl.DateTimeFormat('en-US', { timeZone: clientTZ, timeZoneName: 'shortOffset' }).formatToParts(tempDate);
            const yourParts = new Intl.DateTimeFormat('en-US', { timeZone: yourTZ, timeZoneName: 'shortOffset' }).formatToParts(tempDate);

            const clientOffset = clientParts.find(p => p.type === 'timeZoneName')?.value || '';
            const yourOffset = yourParts.find(p => p.type === 'timeZoneName')?.value || '';

            // Get hour in your timezone
            const yourHourParts = new Intl.DateTimeFormat('en-US', { timeZone: yourTZ, hour: 'numeric', hour12: false }).formatToParts(tempDate);
            const yourHour = parseInt(yourHourParts.find(p => p.type === 'hour')?.value || '12');

            let status = '🟢 Good time';
            if (yourHour < 8 || yourHour > 22) status = '🔴 Outside work hours';
            else if (yourHour < 9 || yourHour > 18) status = '🟡 Edge of work hours';

            return {
                yourTime: yourFull,
                clientOffset,
                yourOffset,
                status,
            };
        } catch {
            return null;
        }
    }, [clientTZ, yourTZ, meetingTime, meetingDate]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <Globe className="h-6 w-6 text-emerald-500" /> Client Time Zone Checker
            </h2>
            <p className="text-muted-foreground text-sm">
                Enter a meeting time in your client&apos;s timezone to see what time it is for you.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-foreground block mb-1">Client&apos;s Time Zone</label>
                        <select value={clientTZ} onChange={e => setClientTZ(e.target.value)} className="w-full p-2 rounded-lg border">
                            {TIMEZONES.map(tz => <option key={tz.value} value={tz.value}>{tz.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-foreground block mb-1">Your Time Zone</label>
                        <select value={yourTZ} onChange={e => setYourTZ(e.target.value)} className="w-full p-2 rounded-lg border">
                            {TIMEZONES.map(tz => <option key={tz.value} value={tz.value}>{tz.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-foreground block mb-1">Meeting Date</label>
                        <input type="date" value={meetingDate} onChange={e => setMeetingDate(e.target.value)} className="w-full p-2 rounded-lg border" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-foreground block mb-1">Meeting Time (in client&apos;s timezone)</label>
                        <input type="time" value={meetingTime} onChange={e => setMeetingTime(e.target.value)} className="w-full p-2 rounded-lg border" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-violet-200 dark:border-violet-800 space-y-4">
                    <div className="text-center space-y-3">
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            Client says &quot;{meetingTime}&quot;
                            <ArrowRightLeft className="h-4 w-4" />
                            Your time:
                        </div>
                        {convertedTime ? (
                            <>
                                <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                                    {convertedTime.yourTime}
                                </p>
                                <p className="text-lg font-medium">{convertedTime.status}</p>
                                <div className="grid grid-cols-2 gap-3 text-sm mt-4">
                                    <ResultCard label="Client Offset" value={convertedTime.clientOffset} />
                                    <ResultCard label="Your Offset" value={convertedTime.yourOffset} />
                                </div>
                            </>
                        ) : (
                            <p className="text-muted-foreground">Enter a valid time to convert</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Income Summary ──────────────────────────────────────────── */
function IncomeSummary() {
    const [projects, setProjects] = useState<Array<{ name: string; amount: number; hours: number; status: 'completed' | 'in-progress' | 'pending' }>>([
        { name: 'Website Redesign', amount: 3500, hours: 45, status: 'completed' },
        { name: 'Mobile App', amount: 5000, hours: 60, status: 'in-progress' },
    ]);
    const [newName, setNewName] = useState('');
    const [newAmount, setNewAmount] = useState(0);
    const [newHours, setNewHours] = useState(0);
    const [currency, setCurrency] = useState('$');

    const addProject = () => {
        if (!newName.trim() || newAmount <= 0) return;
        setProjects([...projects, { name: newName.trim(), amount: newAmount, hours: newHours, status: 'pending' }]);
        setNewName('');
        setNewAmount(0);
        setNewHours(0);
    };

    const removeProject = (index: number) => {
        setProjects(projects.filter((_, i) => i !== index));
    };

    const toggleStatus = (index: number) => {
        const order: Array<'pending' | 'in-progress' | 'completed'> = ['pending', 'in-progress', 'completed'];
        setProjects(projects.map((p, i) => {
            if (i !== index) return p;
            const next = order[(order.indexOf(p.status) + 1) % 3];
            return { ...p, status: next };
        }));
    };

    const stats = useMemo(() => {
        const total = projects.reduce((s, p) => s + p.amount, 0);
        const completed = projects.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
        const pending = projects.filter(p => p.status !== 'completed').reduce((s, p) => s + p.amount, 0);
        const totalHours = projects.reduce((s, p) => s + p.hours, 0);
        const avgRate = totalHours > 0 ? total / totalHours : 0;
        return { total, completed, pending, totalHours, avgRate };
    }, [projects]);

    const statusColors = {
        'completed': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        'pending': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-emerald-500" /> Income Summary
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl border bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-center">
                    <p className="text-xs text-muted-foreground">Total Earnings</p>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{currency}{stats.total.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl border bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-center">
                    <p className="text-xs text-muted-foreground">Received</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{currency}{stats.completed.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl border bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-center">
                    <p className="text-xs text-muted-foreground">Outstanding</p>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{currency}{stats.pending.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl border bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-center">
                    <p className="text-xs text-muted-foreground">Avg Rate</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currency}{Math.round(stats.avgRate)}/hr</p>
                </div>
            </div>

            {/* Project list */}
            <div className="space-y-2">
                {projects.map((project, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors">
                        <button onClick={() => toggleStatus(i)} className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                            {project.status}
                        </button>
                        <span className="flex-1 font-medium text-sm text-foreground">{project.name}</span>
                        <span className="text-sm text-muted-foreground">{project.hours}h</span>
                        <span className="text-sm font-semibold text-foreground">{currency}{project.amount.toLocaleString()}</span>
                        <button onClick={() => removeProject(i)} className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500 transition-colors">
                            <Minus className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Add project */}
            <div className="p-4 rounded-xl border-2 border-dashed border-border space-y-3">
                <p className="text-sm font-medium text-foreground">Add Project</p>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <input
                        type="text"
                        placeholder="Project name"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        className="p-2 rounded-lg border text-sm"
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={newAmount || ''}
                        onChange={e => setNewAmount(Number(e.target.value))}
                        className="p-2 rounded-lg border text-sm"
                        min={0}
                    />
                    <input
                        type="number"
                        placeholder="Hours"
                        value={newHours || ''}
                        onChange={e => setNewHours(Number(e.target.value))}
                        className="p-2 rounded-lg border text-sm"
                        min={0}
                    />
                    <button
                        onClick={addProject}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="h-4 w-4" /> Add
                    </button>
                </div>
            </div>

            <p className="text-xs text-muted-foreground flex items-start gap-1">
                <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                Your data is stored only in your browser session. Refresh the page and it resets. No data is sent to any server.
            </p>
        </div>
    );
}

/* ─── Shared Components ─────────────────────────────────────── */
function NumberInput({ label, value, onChange, prefix, suffix, min = 0, max, step = 1 }: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    prefix?: string;
    suffix?: string;
    min?: number;
    max?: number;
    step?: number;
}) {
    return (
        <div>
            <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-foreground">{label}</label>
                <span className="text-sm text-muted-foreground">{prefix}{value.toLocaleString()}{suffix}</span>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onChange(Math.max(min, value - step))}
                    className="p-1.5 rounded-lg border hover:bg-muted transition-colors"
                >
                    <Minus className="h-4 w-4" />
                </button>
                <input
                    type="range"
                    min={min}
                    max={max ?? value * 3}
                    step={step}
                    value={value}
                    onChange={e => onChange(Number(e.target.value))}
                    className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <button
                    onClick={() => onChange(max ? Math.min(max, value + step) : value + step)}
                    className="p-1.5 rounded-lg border hover:bg-muted transition-colors"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

function ResultCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20 border">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-sm font-bold text-foreground">{value}</p>
        </div>
    );
}
