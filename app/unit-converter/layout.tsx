import { Metadata } from 'next';
import {
    SEOContentSection, SEOHeading, SEOParagraph, SEOTable, SEOBulletList,
    SEONumberedList, SEOFAQ, SEOCallout, SEOInternalLinks
} from '@/components/SEOContent';

export const metadata: Metadata = {
    title: 'Unit Converter - Free Online Unit Conversion Calculator | Length, Weight, Temperature, Volume',
    description:
        'Free unit converter - Convert between length, weight, temperature, area, volume & speed instantly! Meters to feet, kg to lbs, Celsius to Fahrenheit and 100+ conversions. No signup!',
    keywords: [
        'unit converter',
        'free unit converter',
        'length converter',
        'weight converter',
        'temperature converter',
        'meters to feet',
        'kg to lbs',
        'celsius to fahrenheit',
        'inches to cm',
        'miles to km',
        'convert units online',
        'metric converter',
        'imperial converter',
        'unit conversion calculator',
        'online conversion tool',
    ],
    alternates: {
        canonical: 'https://worksyhub.online/unit-converter',
    },
    openGraph: {
        title: 'Free Unit Converter - Convert Length, Weight, Temperature Online',
        description: 'Convert any unit instantly! Length, weight, temperature, area, volume & more. 100% free, no signup.',
        url: 'https://worksyhub.online/unit-converter',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Unit Converter Online',
        description: 'Convert length, weight, temperature & more instantly. Free, no signup!',
    },
};

export default function UnitConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Free Unit Converter Online',
        description: 'Convert between length, weight, temperature, area, volume and speed units instantly. Supports metric, imperial, and more.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        url: 'https://worksyhub.online/unit-converter',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        creator: { '@type': 'Organization', name: 'WorksyHub' }
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worksyhub.online' },
            { '@type': 'ListItem', position: 2, name: 'Unit Converter', item: 'https://worksyhub.online/unit-converter' },
        ],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'How do I convert meters to feet?', acceptedAnswer: { '@type': 'Answer', text: 'Multiply meters by 3.28084 to get feet. For example, 10 meters = 32.81 feet. Our converter does this instantly.' } },
            { '@type': 'Question', name: 'How do I convert kg to lbs?', acceptedAnswer: { '@type': 'Answer', text: 'Multiply kilograms by 2.20462 to get pounds. For example, 70 kg = 154.32 lbs.' } },
            { '@type': 'Question', name: 'How do I convert Celsius to Fahrenheit?', acceptedAnswer: { '@type': 'Answer', text: 'Use the formula: °F = (°C × 9/5) + 32. For example, 25°C = (25 × 9/5) + 32 = 77°F.' } },
            { '@type': 'Question', name: 'What is the difference between metric and imperial?', acceptedAnswer: { '@type': 'Answer', text: 'Metric uses base-10 units (meters, grams, liters) and is used in most countries. Imperial uses feet, pounds, gallons and is primarily used in the US, UK, and a few other countries.' } },
        ]
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            {children}

            <SEOContentSection>

                <section className="space-y-4">
                    <SEOHeading level={2} id="what-is-unit-conversion">What is Unit Conversion? Why It Matters Every Day</SEOHeading>
                    <SEOParagraph>
                        <strong>Unit conversion</strong> is the process of converting a quantity expressed in one unit of measurement to an equivalent value in another unit. We encounter unit conversions constantly in daily life — from cooking recipes that use different measurement systems, to understanding weather temperatures in Celsius or Fahrenheit, to calculating distances when traveling internationally.
                    </SEOParagraph>
                    <SEOParagraph>
                        Our <strong>free online unit converter</strong> handles all major conversion categories including length, weight/mass, temperature, area, volume, speed, time, and data storage. Simply select the category, enter a value, choose your source and target units, and get instant, accurate results. No signup required, no data collected.
                    </SEOParagraph>
                    <SEOParagraph>
                        The world primarily uses two measurement systems: the <strong>metric system</strong> (International System of Units / SI), used by approximately 95% of the world, and the <strong>imperial/US customary system</strong>, used mainly in the United States, Liberia, and Myanmar. Being able to convert between these systems is essential for international travel, business, cooking, science, engineering, and everyday communication.
                    </SEOParagraph>
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="length-conversions">Length Conversion Chart: Comprehensive Reference</SEOHeading>
                    <SEOTable
                        caption="Common Length Conversions"
                        headers={['From', 'To', 'Multiply By', 'Example']}
                        rows={[
                            ['Meters (m)', 'Feet (ft)', '3.28084', '10 m = 32.81 ft'],
                            ['Feet (ft)', 'Meters (m)', '0.3048', '100 ft = 30.48 m'],
                            ['Inches (in)', 'Centimeters (cm)', '2.54', '12 in = 30.48 cm'],
                            ['Centimeters (cm)', 'Inches (in)', '0.3937', '100 cm = 39.37 in'],
                            ['Kilometers (km)', 'Miles (mi)', '0.62137', '100 km = 62.14 mi'],
                            ['Miles (mi)', 'Kilometers (km)', '1.60934', '60 mph = 96.56 km/h'],
                            ['Yards (yd)', 'Meters (m)', '0.9144', '100 yd = 91.44 m'],
                            ['Meters (m)', 'Yards (yd)', '1.09361', '100 m = 109.36 yd'],
                            ['Millimeters (mm)', 'Inches (in)', '0.03937', '25.4 mm = 1 in'],
                            ['Nautical miles', 'Kilometers (km)', '1.852', '1 nmi = 1.852 km'],
                        ]}
                    />

                    <SEOHeading level={3}>Meters to Feet Quick Reference</SEOHeading>
                    <SEOTable
                        caption="Meters → Feet Conversion Table"
                        headers={['Meters', 'Feet', 'Feet & Inches', 'Meters', 'Feet', 'Feet & Inches']}
                        rows={[
                            ['1.50 m', '4.92 ft', '4\' 11"', '1.75 m', '5.74 ft', '5\' 9"'],
                            ['1.55 m', '5.09 ft', '5\' 1"', '1.80 m', '5.91 ft', '5\' 11"'],
                            ['1.60 m', '5.25 ft', '5\' 3"', '1.85 m', '6.07 ft', '6\' 1"'],
                            ['1.65 m', '5.41 ft', '5\' 5"', '1.90 m', '6.23 ft', '6\' 3"'],
                            ['1.70 m', '5.58 ft', '5\' 7"', '1.95 m', '6.40 ft', '6\' 5"'],
                        ]}
                    />
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="weight-conversions">Weight & Mass Conversion Chart</SEOHeading>
                    <SEOTable
                        caption="Common Weight/Mass Conversions"
                        headers={['From', 'To', 'Multiply By', 'Example']}
                        rows={[
                            ['Kilograms (kg)', 'Pounds (lbs)', '2.20462', '70 kg = 154.32 lbs'],
                            ['Pounds (lbs)', 'Kilograms (kg)', '0.45359', '150 lbs = 68.04 kg'],
                            ['Grams (g)', 'Ounces (oz)', '0.03527', '100 g = 3.53 oz'],
                            ['Ounces (oz)', 'Grams (g)', '28.3495', '16 oz = 453.6 g (1 lb)'],
                            ['Kilograms (kg)', 'Stones (st)', '0.15747', '80 kg = 12.6 st'],
                            ['Stones (st)', 'Kilograms (kg)', '6.35029', '10 st = 63.5 kg'],
                            ['Metric tons (t)', 'US tons', '1.10231', '1 t = 1.10 US tons'],
                            ['Milligrams (mg)', 'Grains (gr)', '0.01543', '500 mg = 7.72 gr'],
                        ]}
                    />

                    <SEOHeading level={3}>Kilograms to Pounds Quick Reference</SEOHeading>
                    <SEOTable
                        caption="Kg → Lbs Conversion Table"
                        headers={['Kg', 'Lbs', 'Kg', 'Lbs', 'Kg', 'Lbs']}
                        rows={[
                            ['40', '88.2', '65', '143.3', '90', '198.4'],
                            ['45', '99.2', '70', '154.3', '95', '209.4'],
                            ['50', '110.2', '75', '165.3', '100', '220.5'],
                            ['55', '121.3', '80', '176.4', '110', '242.5'],
                            ['60', '132.3', '85', '187.4', '120', '264.6'],
                        ]}
                    />
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="temperature-conversions">Temperature Conversion: Celsius, Fahrenheit, Kelvin</SEOHeading>
                    <SEOParagraph>
                        Temperature conversion is one of the most common conversions people need, especially when traveling between countries that use different scales. The three main temperature scales are Celsius (°C), Fahrenheit (°F), and Kelvin (K).
                    </SEOParagraph>
                    <SEOTable
                        caption="Temperature Conversion Formulas"
                        headers={['Conversion', 'Formula', 'Example']}
                        rows={[
                            ['°C to °F', '°F = (°C × 9/5) + 32', '25°C = 77°F'],
                            ['°F to °C', '°C = (°F - 32) × 5/9', '72°F = 22.2°C'],
                            ['°C to K', 'K = °C + 273.15', '0°C = 273.15 K'],
                            ['K to °C', '°C = K - 273.15', '300 K = 26.85°C'],
                            ['°F to K', 'K = (°F - 32) × 5/9 + 273.15', '212°F = 373.15 K'],
                        ]}
                    />

                    <SEOTable
                        caption="Common Temperature Reference Points"
                        headers={['Description', 'Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)']}
                        rows={[
                            ['Absolute zero', '-273.15', '-459.67', '0'],
                            ['Water freezes', '0', '32', '273.15'],
                            ['Cold winter day', '-10', '14', '263.15'],
                            ['Cool day', '10', '50', '283.15'],
                            ['Room temperature', '20-22', '68-72', '293-295'],
                            ['Warm summer day', '30', '86', '303.15'],
                            ['Hot day', '40', '104', '313.15'],
                            ['Human body temp', '37', '98.6', '310.15'],
                            ['Water boils', '100', '212', '373.15'],
                            ['Oven baking', '180', '356', '453.15'],
                        ]}
                    />
                    <SEOCallout type="tip">
                        <strong>Quick mental estimate:</strong> To roughly convert °C to °F, double the Celsius value and add 30. For example, 20°C ≈ 2×20+30 = 70°F (actual: 68°F). This gives you a close enough approximation for everyday situations.
                    </SEOCallout>
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="area-volume">Area and Volume Conversion Tables</SEOHeading>

                    <SEOTable
                        caption="Common Area Conversions"
                        headers={['From', 'To', 'Multiply By', 'Example']}
                        rows={[
                            ['Square meters (m²)', 'Square feet (ft²)', '10.7639', '100 m² = 1,076.39 ft²'],
                            ['Square feet (ft²)', 'Square meters (m²)', '0.09290', '1,000 ft² = 92.90 m²'],
                            ['Acres', 'Hectares', '0.40469', '1 acre = 0.40 ha'],
                            ['Hectares', 'Acres', '2.47105', '1 ha = 2.47 acres'],
                            ['Square km', 'Square miles', '0.38610', '100 km² = 38.61 mi²'],
                            ['Square meters', 'Square yards', '1.19599', '1 m² = 1.20 yd²'],
                        ]}
                    />

                    <SEOTable
                        caption="Common Volume Conversions"
                        headers={['From', 'To', 'Multiply By', 'Example']}
                        rows={[
                            ['Liters (L)', 'US Gallons', '0.26417', '4 L = 1.06 gal'],
                            ['US Gallons', 'Liters (L)', '3.78541', '1 gal = 3.79 L'],
                            ['Milliliters (mL)', 'Fluid ounces (fl oz)', '0.03381', '250 mL = 8.45 fl oz'],
                            ['Cups (US)', 'Milliliters (mL)', '236.588', '1 cup = 236.6 mL'],
                            ['Tablespoons', 'Milliliters (mL)', '14.787', '1 tbsp = 14.79 mL'],
                            ['Teaspoons', 'Milliliters (mL)', '4.929', '1 tsp = 4.93 mL'],
                            ['Liters (L)', 'Cubic inches', '61.0237', '1 L = 61.02 in³'],
                            ['UK Gallons', 'US Gallons', '1.20095', '1 UK gal = 1.20 US gal'],
                        ]}
                    />
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="metric-imperial">Metric vs Imperial: Which Countries Use What?</SEOHeading>
                    <SEOParagraph>
                        The vast majority of the world uses the metric system (International System of Units or SI). Only three countries have not officially adopted the metric system: the <strong>United States</strong>, <strong>Liberia</strong>, and <strong>Myanmar</strong>. Several other countries, including the UK and Canada, use a mix of both systems in daily life.
                    </SEOParagraph>
                    <SEOTable
                        caption="Measurement Systems by Country/Region"
                        headers={['Country/Region', 'Primary System', 'Notes']}
                        rows={[
                            ['United States', 'US Customary (Imperial-based)', 'Science uses metric, daily life uses imperial'],
                            ['United Kingdom', 'Mixed', 'Metric officially, but miles, pints, stones used daily'],
                            ['Canada', 'Metric', 'Uses imperial for real estate (sq ft) and casual height/weight'],
                            ['Australia', 'Metric', 'Adopted in 1966-1988, fully metric today'],
                            ['European Union', 'Metric', 'SI units required by law'],
                            ['India', 'Metric', 'Metric official, but local units still used regionally'],
                            ['Japan', 'Metric', 'Metric since 1924'],
                            ['China', 'Metric', 'Metric since 1959, with traditional units informally used'],
                            ['Rest of World', 'Metric', 'Most countries adopted metric in the 19th-20th centuries'],
                        ]}
                    />
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="cooking-conversions">Kitchen & Cooking Conversions</SEOHeading>
                    <SEOParagraph>
                        Cooking conversions are among the most frequently searched unit conversions. Whether you are following a recipe from another country or scaling a recipe up or down, these tables will help:
                    </SEOParagraph>
                    <SEOTable
                        caption="Cooking Volume Conversions"
                        headers={['US Measurement', 'Metric Equivalent', 'US Measurement', 'Metric Equivalent']}
                        rows={[
                            ['1/4 teaspoon', '1.25 mL', '1 cup', '237 mL'],
                            ['1/2 teaspoon', '2.5 mL', '2 cups (1 pint)', '473 mL'],
                            ['1 teaspoon', '5 mL', '4 cups (1 quart)', '946 mL'],
                            ['1 tablespoon', '15 mL', '1 gallon', '3.785 L'],
                            ['1/4 cup', '59 mL', '1 fluid ounce', '30 mL'],
                            ['1/3 cup', '79 mL', '1 stick butter', '113 g'],
                            ['1/2 cup', '118 mL', '1 cup flour', '125 g'],
                            ['3/4 cup', '177 mL', '1 cup sugar', '200 g'],
                        ]}
                    />
                    <SEOCallout type="info">
                        <strong>Cooking tip:</strong> For baking, it is always more accurate to weigh ingredients in grams rather than use volume measurements. A cup of flour can vary from 120g to 150g depending on how tightly it is packed. Professional bakers always use weight measurements for consistency.
                    </SEOCallout>
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="unit-faq">Frequently Asked Questions About Unit Conversion</SEOHeading>
                    <SEOFAQ items={[
                        { question: 'How do I convert meters to feet quickly?', answer: 'To convert meters to feet, multiply by 3.281. For a quick mental estimate, multiply by 3 and add 10%. For example: 10 meters × 3 = 30, plus 10% (3) = 33 feet. The exact answer is 32.81 feet. Close enough for everyday use!' },
                        { question: 'How many pounds are in a kilogram?', answer: 'One kilogram equals 2.20462 pounds. To quickly estimate, double the kg value and add 10%. For example: 80 kg × 2 = 160, plus 10% (16) = 176 lbs. The exact answer is 176.37 lbs.' },
                        { question: 'What is the easiest way to convert Celsius to Fahrenheit?', answer: 'The exact formula is °F = (°C × 9/5) + 32. For a quick mental estimate, double the Celsius value and add 30. This gives you a close approximation. Example: 25°C → 25×2+30 = 80°F (exact: 77°F). Some key reference points: 0°C = 32°F, 20°C = 68°F, 37°C = 98.6°F, 100°C = 212°F.' },
                        { question: 'Why does the UK use miles but Europe uses kilometers?', answer: 'The UK maintained imperial road signs when the rest of Europe adopted the metric system because changing all road signs, speed limits, and vehicle speedometers would be extremely costly. The UK officially uses metric for most purposes but retains miles for road distances, pints for beer and milk, and stones for body weight due to cultural tradition.' },
                        { question: 'What is the difference between a US gallon and a UK gallon?', answer: 'A US gallon is 3.785 liters while a UK (Imperial) gallon is 4.546 liters — about 20% larger. This difference dates back to 1824 when Britain standardized the Imperial gallon differently from the American measure. Fuel economy figures (MPG) are not comparable between US and UK without conversion.' },
                        { question: 'How do I convert between square meters and square feet?', answer: 'Multiply square meters by 10.764 to get square feet. For quick estimation, multiply by 11. For example: 100 m² × 11 = 1,100 sq ft (exact: 1,076 sq ft). This is commonly needed for real estate, where property sizes may be listed in either unit depending on the country.' },
                        { question: 'Is this unit converter free?', answer: 'Yes, this unit converter is 100% free with no limits. No signup, no ads, no data collection. All conversions are calculated instantly in your browser. Use it as many times as you need for any purpose.' },
                    ]} />
                </section>

                <SEOInternalLinks links={[
                    { href: '/bmi-calculator', title: 'BMI Calculator', description: 'Check your health' },
                    { href: '/percentage-calculator', title: 'Percentage Calculator', description: 'Calculate percentages' },
                    { href: '/scientific-calculator', title: 'Scientific Calculator', description: 'Advanced math' },
                    { href: '/emi-calculator', title: 'EMI Calculator', description: 'Loan payments' },
                ]} />

            </SEOContentSection>
        </>
    );
}
