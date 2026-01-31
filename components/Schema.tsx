import Script from 'next/script';

interface SchemaProps {
    name: string;
    description: string;
    url: string;
    category?: string;
    instructions?: string[];
}

export function Schema({ name, description, url, category = 'UtilityApplication', instructions }: SchemaProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: name,
        applicationCategory: category,
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: description,
        url: `https://worksyhub.online${url}`,
        featureList: 'Free online calculation, Instant results, Private client-side processing',
    };

    const howToLd = instructions ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to use ${name}`,
        step: instructions.map((text, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            text: text,
        })),
    } : null;

    return (
        <>
            <Script
                id={`schema-${name.replace(/\s+/g, '-').toLowerCase()}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {howToLd && (
                <Script
                    id={`schema-howto-${name.replace(/\s+/g, '-').toLowerCase()}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
                />
            )}
        </>
    );
}
