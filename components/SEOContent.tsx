import React from 'react';

interface SEOContentProps {
    children: React.ReactNode;
}

export function SEOContentSection({ children }: SEOContentProps) {
    return (
        <article className="mt-16 border-t pt-12 space-y-12 max-w-4xl mx-auto" itemScope itemType="https://schema.org/Article">
            {children}
        </article>
    );
}

interface SEOHeadingProps {
    level: 2 | 3 | 4;
    children: React.ReactNode;
    id?: string;
}

export function SEOHeading({ level, children, id }: SEOHeadingProps) {
    const classes = {
        2: 'text-3xl font-bold tracking-tight text-foreground mb-4',
        3: 'text-2xl font-semibold text-foreground mb-3',
        4: 'text-xl font-semibold text-foreground mb-2',
    };
    const cn = classes[level];
    if (level === 2) return <h2 className={cn} id={id}>{children}</h2>;
    if (level === 3) return <h3 className={cn} id={id}>{children}</h3>;
    return <h4 className={cn} id={id}>{children}</h4>;
}

export function SEOParagraph({ children }: { children: React.ReactNode }) {
    return <p className="text-base leading-relaxed text-muted-foreground mb-4">{children}</p>;
}

interface SEOTableProps {
    headers: string[];
    rows: string[][];
    caption?: string;
}

export function SEOTable({ headers, rows, caption }: SEOTableProps) {
    return (
        <div className="overflow-x-auto my-6 rounded-xl border">
            <table className="w-full text-sm">
                {caption && <caption className="text-sm text-muted-foreground mb-2 text-left px-4 pt-3 font-medium">{caption}</caption>}
                <thead>
                    <tr className="bg-muted/50">
                        {headers.map((h, i) => (
                            <th key={i} className="px-4 py-3 text-left font-semibold text-foreground border-b">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                            {row.map((cell, j) => (
                                <td key={j} className="px-4 py-3 text-muted-foreground">{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function SEOBulletList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-2 my-4 ml-1">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-base leading-relaxed">{item}</span>
                </li>
            ))}
        </ul>
    );
}

export function SEONumberedList({ items }: { items: string[] }) {
    return (
        <ol className="space-y-3 my-4 ml-1">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary text-sm font-bold mt-0.5">{i + 1}</span>
                    <span className="text-base leading-relaxed">{item}</span>
                </li>
            ))}
        </ol>
    );
}

interface FAQItem {
    question: string;
    answer: string;
}

export function SEOFAQ({ items }: { items: FAQItem[] }) {
    return (
        <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
            {items.map((faq, i) => (
                <details
                    key={i}
                    className="group border rounded-xl p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                >
                    <summary className="font-medium flex items-center justify-between text-foreground" itemProp="name">
                        {faq.question}
                        <span className="group-open:rotate-180 transition-transform text-muted-foreground ml-2">▼</span>
                    </summary>
                    <div className="mt-4 text-muted-foreground leading-relaxed" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                        <p itemProp="text">{faq.answer}</p>
                    </div>
                </details>
            ))}
        </div>
    );
}

export function SEOCallout({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'tip' | 'warning' }) {
    const styles = {
        info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
        tip: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
        warning: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300',
    };
    const icons = { info: '💡', tip: '✅', warning: '⚠️' };
    return (
        <div className={`p-4 rounded-xl border-2 my-6 ${styles[type]}`}>
            <div className="flex items-start gap-3">
                <span className="text-xl">{icons[type]}</span>
                <div className="text-sm leading-relaxed">{children}</div>
            </div>
        </div>
    );
}

export function SEOInternalLinks({ links }: { links: { href: string; title: string; description: string }[] }) {
    return (
        <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 my-8">
            <h3 className="text-xl font-bold mb-4 text-center text-foreground">Related Free Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {links.map((link, i) => (
                    <a key={i} href={link.href} className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
                        <div className="font-medium text-foreground">{link.title}</div>
                        <div className="text-xs text-muted-foreground">{link.description}</div>
                    </a>
                ))}
            </div>
        </div>
    );
}
