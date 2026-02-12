import { Metadata } from 'next';
import {
    SEOContentSection, SEOHeading, SEOParagraph, SEOTable, SEOBulletList,
    SEOFAQ, SEOCallout, SEOInternalLinks
} from '@/components/SEOContent';

export const metadata: Metadata = {
    title: 'Freelancer Calculator — Hourly Rate, Project Pricing, Time Zones | Free',
    description:
        'Free freelancer calculator: find your ideal hourly rate, price projects accurately, convert client meeting times across time zones, and track freelance income. Built for freelancers & digital nomads.',
    keywords: [
        'freelancer calculator', 'freelance hourly rate calculator', 'hourly rate calculator',
        'how much to charge freelance', 'freelance rate calculator',
        'project pricing calculator', 'freelance project quote',
        'freelance income calculator', 'freelancer tax calculator',
        'digital nomad calculator', 'freelance budget calculator',
        'time zone converter for freelancers', 'client time zone check',
        'freelance earnings tracker', 'freelance income tracker',
        'how to calculate freelance rate', 'freelance pricing guide',
        'remote worker calculator', 'contractor rate calculator',
        'self employed rate calculator', 'gig worker calculator',
        'billable hours calculator', 'freelance work hours',
        'project cost estimator', 'freelance quote calculator',
    ],
    alternates: { canonical: 'https://worksyhub.online/freelancer-calculator' },
    openGraph: {
        title: 'Free Freelancer Calculator — Hourly Rate, Project Pricing & Income',
        description: 'Calculate your ideal freelance hourly rate, price projects, check client time zones, and track income.',
        url: 'https://worksyhub.online/freelancer-calculator',
    },
};

export default function FreelancerCalculatorLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        '@context': 'https://schema.org', '@type': 'WebApplication',
        name: 'Freelancer Calculator',
        description: 'Calculate freelance hourly rates, project pricing, time zone conversions, and income tracking.',
        applicationCategory: 'BusinessApplication', operatingSystem: 'Any',
        url: 'https://worksyhub.online/freelancer-calculator',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    };
    const breadcrumbSchema = {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worksyhub.online' },
            { '@type': 'ListItem', position: 2, name: 'Freelancer Calculator', item: 'https://worksyhub.online/freelancer-calculator' },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {children}

            <SEOContentSection>
                <section className="space-y-4">
                    <SEOHeading level={2} id="about-freelancer-calculator">Free Freelancer Calculator — Your Complete Freelance Business Toolkit</SEOHeading>
                    <SEOParagraph>
                        Our <strong>freelancer calculator</strong> helps you answer the most critical questions every freelancer faces: <em>How much should I charge per hour? How do I price a project? What time is the client meeting in my timezone?</em> Whether you&apos;re a developer, designer, writer, or consultant, this tool gives you data-driven answers instead of guesswork.
                    </SEOParagraph>
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="hourly-rate-guide">How to Calculate Your Freelance Hourly Rate</SEOHeading>
                    <SEOParagraph>
                        Most freelancers undercharge because they base their rate on their previous salary. But as a freelancer, you need to cover taxes, health insurance, retirement savings, software, marketing, and unpaid time (admin, client calls, learning). Our calculator accounts for all of this.
                    </SEOParagraph>
                    <SEOTable
                        caption="Freelance Rate Factors"
                        headers={['Factor', 'Why It Matters', 'Typical Range']}
                        rows={[
                            ['Desired Annual Income', 'Your take-home pay goal', '$40K–$200K+'],
                            ['Business Expenses', 'Software, tools, coworking, insurance', '$500–$5,000/mo'],
                            ['Tax Rate', 'Self-employment tax is higher than W-2', '20–40%'],
                            ['Billable Hours %', 'Only 50-65% of your time is billable', '50–70%'],
                            ['Vacation / Sick Days', 'You need time off to avoid burnout', '2–6 weeks/year'],
                        ]}
                    />
                    <SEOCallout type="tip">
                        <strong>Pro Tip:</strong> Never bill for less than 65% of working hours. The rest is spent on admin, marketing, proposals, and professional development. Our calculator factors this in automatically.
                    </SEOCallout>
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="project-pricing-tips">How to Price Freelance Projects</SEOHeading>
                    <SEOParagraph>
                        Fixed-price projects are riskier but clients prefer them. Always add a <strong>15-25% complexity buffer</strong> for scope creep, revisions, and unexpected complications. Our Project Pricing Calculator helps you quote confidently by multiplying your hourly rate × estimated hours × buffer × profit margin.
                    </SEOParagraph>
                    <SEOBulletList items={[
                        'Break the project into deliverables and estimate hours for each',
                        'Add 20% buffer for scope creep and communication overhead',
                        'Include a profit margin on top of your costs (10-25%)',
                        'Never share your hourly rate when quoting fixed-price — quote the total',
                        'Define exactly what\'s included and what costs extra in your proposal',
                    ]} />
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="freelancer-faq">Frequently Asked Questions</SEOHeading>
                    <SEOFAQ items={[
                        { question: 'How much should a freelancer charge per hour?', answer: 'It depends on your skills, industry, location, and expenses. A web developer might charge $50–$150/hr, a graphic designer $40–$100/hr, and a consultant $75–$300/hr. Use our calculator to find your exact number based on your income goal and expenses.' },
                        { question: 'What percentage of time is billable?', answer: 'Most freelancers can only bill 50-65% of their total working hours. The remaining time goes to admin tasks (invoicing, emails), marketing, client meetings, proposals, learning, and breaks. Our calculator defaults to 65% which is an optimistic but achievable target.' },
                        { question: 'How do I handle different time zones with clients?', answer: 'Use our Time Zone Checker tab to instantly convert meeting times between your client\'s timezone and yours. It auto-detects your timezone and warns you if the meeting falls outside typical work hours.' },
                        { question: 'Is my data saved anywhere?', answer: 'No. All calculations run 100% in your browser. Nothing is sent to any server. Your income tracking data resets when you refresh the page — we recommend copying important numbers to your own records.' },
                    ]} />
                </section>

                <SEOInternalLinks links={[
                    { href: '/emi-calculator', title: 'EMI Calculator', description: 'Plan loan payments' },
                    { href: '/percentage-calculator', title: 'Percentage Calculator', description: 'Quick percentage math' },
                    { href: '/world-clock', title: 'World Clock', description: 'Check time zones' },
                    { href: '/discount-calculator', title: 'Discount Calculator', description: 'Calculate discounts' },
                ]} />
            </SEOContentSection>
        </>
    );
}
