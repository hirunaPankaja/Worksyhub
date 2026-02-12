import { Metadata } from 'next';
import {
  SEOContentSection, SEOHeading, SEOParagraph, SEOTable, SEOBulletList,
  SEONumberedList, SEOFAQ, SEOCallout, SEOInternalLinks
} from '@/components/SEOContent';

export const metadata: Metadata = {
  title: 'BMI Calculator - Free Body Mass Index Calculator Online | Check If You\'re Healthy Weight',
  description:
    'Free BMI Calculator - Calculate your Body Mass Index instantly! Enter height & weight to check if you\'re underweight, normal, overweight or obese. Accurate BMI chart & health tips included. No signup required!',
  keywords: [
    'bmi calculator',
    'body mass index calculator',
    'free bmi calculator',
    'bmi calculator online',
    'calculate bmi',
    'bmi check',
    'check my bmi',
    'what is my bmi',
    'bmi chart',
    'bmi scale',
    'bmi range',
    'am i overweight',
    'am i obese',
    'am i healthy weight',
    'how to calculate bmi',
    'what is a healthy bmi',
    'bmi calculator for adults',
    'bmi calculator metric',
    'bmi calculator kg cm',
    'healthy weight calculator',
    'ideal weight calculator',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/bmi-calculator',
  },
  openGraph: {
    title: 'Free BMI Calculator - Check Your Body Mass Index Instantly',
    description:
      'Calculate your BMI online free! Instant results with health categories. Check if you\'re underweight, normal, overweight or obese. No signup needed.',
    url: 'https://worksyhub.online/bmi-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free BMI Calculator - Check Your Health Now',
    description: 'Calculate your Body Mass Index instantly. Free, accurate, no signup required!',
  },
};

export default function BMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free BMI Calculator - Body Mass Index Calculator Online',
    description:
      'Free online BMI calculator. Calculate your Body Mass Index instantly using height and weight. Includes BMI chart, health categories, and tips.',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    url: 'https://worksyhub.online/bmi-calculator',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'WorksyHub',
      url: 'https://worksyhub.online'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worksyhub.online' },
      { '@type': 'ListItem', position: 2, name: 'BMI Calculator', item: 'https://worksyhub.online/bmi-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How do I calculate my BMI?', acceptedAnswer: { '@type': 'Answer', text: 'BMI is calculated by dividing your weight in kilograms by your height in meters squared (kg/m²). Simply enter your weight and height in our calculator to get instant results.' } },
      { '@type': 'Question', name: 'What is a healthy BMI?', acceptedAnswer: { '@type': 'Answer', text: 'A healthy BMI is between 18.5 and 24.9. Below 18.5 is underweight, 25-29.9 is overweight, and 30 or above is classified as obese.' } },
      { '@type': 'Question', name: 'Is BMI accurate for athletes?', acceptedAnswer: { '@type': 'Answer', text: 'BMI may not be accurate for athletes or bodybuilders because it does not distinguish between muscle and fat mass. Athletes should consider additional metrics like body fat percentage.' } },
      { '@type': 'Question', name: 'Can BMI be used during pregnancy?', acceptedAnswer: { '@type': 'Answer', text: 'Standard BMI categories are not applicable during pregnancy. Healthcare providers use pre-pregnancy BMI to guide healthy weight gain recommendations.' } },
      { '@type': 'Question', name: 'What is the BMI formula?', acceptedAnswer: { '@type': 'Answer', text: 'The BMI formula is: BMI = Weight (kg) ÷ Height² (m²). For example, a person weighing 70 kg and standing 1.75 m tall has a BMI of 22.9.' } },
      { '@type': 'Question', name: 'How often should I check my BMI?', acceptedAnswer: { '@type': 'Answer', text: 'It is recommended to check your BMI once every 1-3 months if you are actively managing your weight. For general health monitoring, checking every 6-12 months is sufficient.' } },
      { '@type': 'Question', name: 'Does BMI differ by age and gender?', acceptedAnswer: { '@type': 'Answer', text: 'The standard BMI formula is the same for all adults regardless of age or gender. However, interpretation may vary. Older adults may have higher body fat at the same BMI, and women typically carry more body fat than men.' } },
      { '@type': 'Question', name: 'What BMI is considered obese?', acceptedAnswer: { '@type': 'Answer', text: 'A BMI of 30 or above is classified as obese according to the World Health Organization. Obesity is further divided into Class I (30-34.9), Class II (35-39.9), and Class III (40+) which is sometimes called morbid obesity.' } },
      { '@type': 'Question', name: 'Is this BMI calculator free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, this BMI calculator is 100% free to use. No signup, no registration, and no hidden fees. All calculations are performed locally in your browser for complete privacy.' } },
      { '@type': 'Question', name: 'What should I do if my BMI is too high?', acceptedAnswer: { '@type': 'Answer', text: 'If your BMI is above 25, consider consulting a healthcare provider. General recommendations include eating a balanced diet rich in fruits, vegetables and lean proteins, exercising for at least 150 minutes per week, and aiming for gradual weight loss of 1-2 pounds per week.' } },
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}

      {/* Server-rendered SEO content - fully crawlable by Google */}
      <SEOContentSection>

        <section className="space-y-4">
          <SEOHeading level={2} id="what-is-bmi">What is BMI? Complete Guide to Body Mass Index in 2025</SEOHeading>
          <SEOParagraph>
            <strong>Body Mass Index (BMI)</strong> is a numerical value derived from a person&apos;s weight and height. It is one of the most widely used screening tools in public health and clinical medicine to classify individuals into weight categories that may lead to health problems. Originally developed by Belgian mathematician Adolphe Quetelet between 1830 and 1850, the Quetelet Index — now called BMI — was designed as a simple way to measure the degree of obesity in the general population.
          </SEOParagraph>
          <SEOParagraph>
            Today, BMI is endorsed by the <strong>World Health Organization (WHO)</strong>, the <strong>National Institutes of Health (NIH)</strong>, and the <strong>Centers for Disease Control and Prevention (CDC)</strong> as a reliable population-level screening tool. While it is not a direct measure of body fat, research shows that BMI correlates moderately well with more direct measures of body fat obtained through skinfold thickness measurements, bioelectrical impedance, underwater weighing, and dual-energy X-ray absorptiometry (DEXA).
          </SEOParagraph>
          <SEOParagraph>
            Our <strong>free online BMI calculator</strong> at WorksyHub provides instant, accurate results based on the standard WHO formula. It requires no signup, stores no personal data, and performs all calculations directly in your browser. Whether you are starting a fitness journey, monitoring a health condition, or simply curious about where you stand, this tool gives you actionable health information in seconds.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="bmi-formula">How is BMI Calculated? The BMI Formula Explained Step by Step</SEOHeading>
          <SEOParagraph>
            The BMI calculation is straightforward and uses one of two formulas depending on whether you prefer metric or imperial units. Understanding how the formula works helps you appreciate what the resulting number means for your health.
          </SEOParagraph>
          <SEOHeading level={3}>Metric Formula (kg and meters)</SEOHeading>
          <SEOParagraph>
            <strong>BMI = Weight (kg) ÷ Height² (m²)</strong>. Divide your weight in kilograms by the square of your height in meters. For example, if you weigh 68 kg and stand 1.72 meters tall: BMI = 68 ÷ (1.72 × 1.72) = 68 ÷ 2.9584 = <strong>22.99</strong>, which falls in the normal weight range.
          </SEOParagraph>
          <SEOHeading level={3}>Imperial Formula (pounds and inches)</SEOHeading>
          <SEOParagraph>
            <strong>BMI = (Weight (lbs) × 703) ÷ Height² (in²)</strong>. Multiply your weight in pounds by 703, then divide by the square of your height in inches. For example, if you weigh 150 lbs and stand 5&apos;8&quot; (68 inches) tall: BMI = (150 × 703) ÷ (68 × 68) = 105,450 ÷ 4,624 = <strong>22.81</strong>.
          </SEOParagraph>

          <SEOTable
            caption="Quick BMI Calculation Examples"
            headers={['Weight', 'Height', 'BMI', 'Category']}
            rows={[
              ['50 kg', '160 cm (5\'3")', '19.5', 'Normal weight'],
              ['65 kg', '170 cm (5\'7")', '22.5', 'Normal weight'],
              ['75 kg', '175 cm (5\'9")', '24.5', 'Normal weight'],
              ['85 kg', '170 cm (5\'7")', '29.4', 'Overweight'],
              ['95 kg', '165 cm (5\'5")', '34.9', 'Obese (Class I)'],
              ['110 kg', '180 cm (5\'11")', '33.9', 'Obese (Class I)'],
              ['55 kg', '175 cm (5\'9")', '18.0', 'Underweight'],
              ['70 kg', '180 cm (5\'11")', '21.6', 'Normal weight'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="bmi-categories">BMI Categories and Ranges: Complete WHO Classification</SEOHeading>
          <SEOParagraph>
            The World Health Organization has established standardized BMI categories that are used internationally. These categories help healthcare providers quickly assess potential health risks associated with weight. Below is the complete classification table used by medical professionals worldwide.
          </SEOParagraph>

          <SEOTable
            caption="WHO BMI Classification for Adults (20+ years)"
            headers={['BMI Range', 'Category', 'Health Risk Level', 'Recommended Action']}
            rows={[
              ['Below 16.0', 'Severe Thinness', 'Very High', 'Seek immediate medical attention'],
              ['16.0 – 16.9', 'Moderate Thinness', 'High', 'Consult healthcare provider'],
              ['17.0 – 18.4', 'Mild Thinness', 'Moderate', 'Focus on nutritional intake'],
              ['18.5 – 24.9', 'Normal Weight', 'Low', 'Maintain current lifestyle'],
              ['25.0 – 29.9', 'Overweight (Pre-obese)', 'Increased', 'Lifestyle modifications recommended'],
              ['30.0 – 34.9', 'Obese Class I', 'High', 'Medical evaluation recommended'],
              ['35.0 – 39.9', 'Obese Class II', 'Very High', 'Medical management needed'],
              ['40.0 and above', 'Obese Class III', 'Extremely High', 'Comprehensive medical treatment'],
            ]}
          />

          <SEOCallout type="info">
            <strong>Important:</strong> These categories are designed for adults aged 20 and older. For children and adolescents (ages 2-19), BMI is interpreted using age-specific and gender-specific percentile charts because body composition varies significantly during growth and development.
          </SEOCallout>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="bmi-health-risks">Health Risks Associated with High and Low BMI</SEOHeading>
          <SEOParagraph>
            Your BMI can provide early warning signs about potential health conditions. Both high and low BMI values carry distinct health risks that are well-documented in medical literature. Understanding these risks empowers you to take proactive steps toward better health.
          </SEOParagraph>

          <SEOHeading level={3}>Risks of High BMI (Overweight and Obesity)</SEOHeading>
          <SEOBulletList items={[
            'Cardiovascular diseases including coronary heart disease, heart attack, and stroke — the leading cause of death worldwide. Excess weight forces the heart to work harder to pump blood throughout the body.',
            'Type 2 diabetes — obesity is the single most important risk factor for Type 2 diabetes. Excess body fat leads to insulin resistance, where cells in the body do not respond properly to insulin.',
            'High blood pressure (hypertension) — carrying extra weight requires more blood to supply oxygen and nutrients to tissues, increasing pressure on artery walls.',
            'Certain types of cancer including breast, colon, kidney, liver, pancreatic, thyroid, and endometrial cancers. The American Cancer Society estimates that excess body weight contributes to about 11% of cancers in women and 5% in men.',
            'Sleep apnea and breathing problems — fat deposits around the upper airway can obstruct breathing during sleep, leading to repeated awakenings and poor sleep quality.',
            'Osteoarthritis — excess weight puts additional stress on joints, particularly weight-bearing joints like the knees and hips, accelerating cartilage breakdown.',
            'Fatty liver disease (NAFLD) — excess fat accumulates in the liver, potentially leading to inflammation, scarring, and even liver failure.',
            'Mental health impacts including depression, anxiety, low self-esteem, and reduced quality of life.',
            'Gallbladder disease — obesity increases cholesterol in bile, raising the risk of gallstones.',
            'Kidney disease — obesity is associated with a higher risk of chronic kidney disease through mechanisms including diabetes and hypertension.',
          ]} />

          <SEOHeading level={3}>Risks of Low BMI (Underweight)</SEOHeading>
          <SEOBulletList items={[
            'Weakened immune system — insufficient nutrition impairs the body\'s ability to fight infections and heal from illness or injury.',
            'Osteoporosis and increased fracture risk — inadequate calcium and vitamin D intake, combined with low body weight, leads to decreased bone density.',
            'Anemia from nutritional deficiencies — lack of iron, folate, or vitamin B12 reduces the body\'s ability to produce healthy red blood cells.',
            'Fertility issues — being significantly underweight can disrupt hormonal balance, affecting menstruation in women and sperm production in men.',
            'Increased surgical complications — underweight patients face higher risks during and after surgical procedures.',
            'Sarcopenia (muscle wasting) — insufficient protein and caloric intake leads to progressive loss of muscle mass and strength.',
            'Hair loss and skin problems — nutritional deficiencies affect the health of hair, skin, and nails.',
            'Chronic fatigue and weakness — the body lacks adequate fuel to maintain normal energy levels throughout the day.',
          ]} />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="ideal-weight-chart">Ideal Weight Chart by Height: BMI-Based Healthy Weight Ranges</SEOHeading>
          <SEOParagraph>
            Use this comprehensive table to quickly find the healthy weight range for your height. These ranges are based on a BMI between 18.5 and 24.9, which the WHO classifies as normal weight. Remember that individual health depends on many factors beyond weight alone.
          </SEOParagraph>
          <SEOTable
            caption="Healthy Weight Ranges Based on BMI 18.5-24.9"
            headers={['Height (cm)', 'Height (ft/in)', 'Healthy Weight Range (kg)', 'Healthy Weight Range (lbs)']}
            rows={[
              ['150', '4\'11"', '41.6 – 56.0', '91.7 – 123.5'],
              ['155', '5\'1"', '44.4 – 59.9', '97.9 – 132.1'],
              ['160', '5\'3"', '47.4 – 63.7', '104.5 – 140.4'],
              ['165', '5\'5"', '50.4 – 67.8', '111.1 – 149.5'],
              ['170', '5\'7"', '53.5 – 72.0', '117.9 – 158.7'],
              ['175', '5\'9"', '56.7 – 76.3', '125.0 – 168.2'],
              ['180', '5\'11"', '59.9 – 80.7', '132.1 – 177.9'],
              ['185', '6\'1"', '63.3 – 85.3', '139.6 – 188.1'],
              ['190', '6\'3"', '66.8 – 89.9', '147.3 – 198.2'],
              ['195', '6\'5"', '70.3 – 94.7', '155.0 – 208.8'],
              ['200', '6\'7"', '74.0 – 99.6', '163.1 – 219.6'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="how-to-use">How to Use the WorksyHub BMI Calculator</SEOHeading>
          <SEOParagraph>
            Our BMI calculator is designed to be simple, fast, and accurate. Follow these steps to get your results in seconds:
          </SEOParagraph>
          <SEONumberedList items={[
            'Enter your weight in kilograms (kg) in the weight field. If you know your weight in pounds, divide by 2.205 to convert to kilograms. For example, 150 lbs = 68.0 kg.',
            'Enter your height in centimeters (cm) in the height field. If you know your height in feet and inches, multiply feet by 30.48 and add inches times 2.54. For example, 5\'8" = (5 × 30.48) + (8 × 2.54) = 172.7 cm.',
            'Click the "Calculate BMI" button to see your results instantly.',
            'View your BMI score, health category, and personalized health recommendations.',
            'Use the reset button to clear all fields and calculate again with different values.',
          ]} />
          <SEOCallout type="tip">
            <strong>Pro Tip:</strong> For the most accurate results, weigh yourself first thing in the morning after using the bathroom and before eating breakfast. Wear minimal clothing and use a reliable digital scale. Your weight can fluctuate 2-5 pounds (1-2 kg) throughout the day due to food, water intake, and physical activity.
          </SEOCallout>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="bmi-limitations">Limitations of BMI: What BMI Cannot Tell You</SEOHeading>
          <SEOParagraph>
            While BMI is a useful and convenient screening tool, it has well-documented limitations that every user should understand. Being aware of these limitations helps you use BMI as part of a broader health assessment rather than the sole indicator of health.
          </SEOParagraph>
          <SEOTable
            caption="BMI Limitations and Alternative Metrics"
            headers={['Limitation', 'Why It Matters', 'Better Alternative']}
            rows={[
              ['Cannot distinguish muscle from fat', 'Athletes may be classified as overweight despite being very fit', 'DEXA scan or body fat percentage'],
              ['Ignores fat distribution', 'Belly fat (visceral) is more dangerous than hip fat', 'Waist-to-hip ratio (WHR)'],
              ['Same for all ages', 'Older adults naturally have more fat and less muscle', 'Age-adjusted charts'],
              ['Does not account for ethnicity', 'Asian populations face higher risks at lower BMIs', 'Ethnicity-specific thresholds'],
              ['Same for both sexes', 'Women naturally carry more body fat than men', 'Sex-specific body fat ranges'],
              ['Ignores bone density', 'People with dense bones may weigh more', 'DEXA scan'],
              ['Not suitable for pregnant women', 'Expected weight gain confounds results', 'Pre-pregnancy BMI + gestational guidelines'],
              ['Cannot measure metabolic health', 'Some overweight people are metabolically healthy', 'Blood tests (glucose, lipids, blood pressure)'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="bmi-by-age">BMI Considerations by Age Group</SEOHeading>

          <SEOHeading level={3}>Children and Adolescents (Ages 2-19)</SEOHeading>
          <SEOParagraph>
            For children and teens, BMI is calculated using the same formula as adults, but the results are interpreted differently. Instead of fixed BMI ranges, children&apos;s BMI is plotted on age-specific and sex-specific growth charts to determine a <strong>BMI percentile</strong>. A child at the 85th percentile means they have a higher BMI than 85% of children of the same age and sex. The CDC defines the categories as: underweight (below 5th percentile), healthy weight (5th to 84th percentile), overweight (85th to 94th percentile), and obese (95th percentile and above).
          </SEOParagraph>

          <SEOHeading level={3}>Adults (Ages 20-65)</SEOHeading>
          <SEOParagraph>
            The standard WHO BMI categories apply to adults in this age range. This is the group for which BMI has been most extensively studied and validated. Most epidemiological research on BMI and health outcomes has been conducted on this population, making the standard categories most reliable for adults between 20 and 65 years of age.
          </SEOParagraph>

          <SEOHeading level={3}>Older Adults (Ages 65+)</SEOHeading>
          <SEOParagraph>
            For older adults, the relationship between BMI and health outcomes shifts. Research suggests that a slightly higher BMI (25-27) may actually be protective in older adults, as it provides energy reserves during illness and may help prevent osteoporosis. This phenomenon, sometimes called the &quot;obesity paradox,&quot; means that the optimal BMI for longevity may be slightly higher in seniors. Healthcare providers often use different thresholds when evaluating BMI in older patients.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="improve-bmi">How to Improve Your BMI: Evidence-Based Strategies</SEOHeading>

          <SEOHeading level={3}>If Your BMI is Too High (Above 25)</SEOHeading>
          <SEONumberedList items={[
            'Adopt a balanced diet: Focus on whole foods including vegetables, fruits, lean proteins (chicken, fish, legumes), whole grains, and healthy fats (olive oil, nuts, avocado). Reduce processed foods, sugary drinks, and refined carbohydrates.',
            'Practice portion control: Use smaller plates, measure portions, and eat mindfully. A food diary or calorie-tracking app can help you become aware of how much you are actually eating.',
            'Increase physical activity: Aim for at least 150 minutes of moderate-intensity exercise (brisk walking, swimming, cycling) or 75 minutes of vigorous exercise (running, HIIT) per week. Include strength training at least 2 days per week to maintain muscle mass.',
            'Get adequate sleep: Studies show that poor sleep (less than 7 hours per night) disrupts hormones that regulate appetite, leading to increased hunger and cravings for high-calorie foods.',
            'Manage stress: Chronic stress elevates cortisol levels, which promotes fat storage especially around the abdomen. Practice stress-reduction techniques like meditation, deep breathing, yoga, or spending time in nature.',
            'Stay hydrated: Drink at least 8 glasses of water daily. Sometimes thirst is confused with hunger. Drinking water before meals can reduce calorie intake.',
            'Seek professional guidance: A registered dietitian can create a personalized nutrition plan, and a certified personal trainer can design a safe exercise program tailored to your fitness level.',
            'Set realistic goals: Aim to lose 0.5-1 kg (1-2 lbs) per week. Rapid weight loss is unsustainable and can lead to muscle loss, nutritional deficiencies, and metabolic slowdown.',
          ]} />

          <SEOHeading level={3}>If Your BMI is Too Low (Below 18.5)</SEOHeading>
          <SEONumberedList items={[
            'Increase caloric intake gradually: Add 300-500 extra calories per day through nutrient-dense foods like nuts, dried fruits, cheese, whole grain bread, and smoothies with protein powder.',
            'Eat more frequently: Instead of three large meals, eat 5-6 smaller meals throughout the day to increase total caloric intake without feeling overwhelmed.',
            'Focus on protein: Include high-quality protein sources at every meal (eggs, dairy, lean meats, fish, beans, tofu) to support muscle growth and repair.',
            'Strength training: Weight-bearing exercises stimulate muscle growth and increase appetite. Focus on compound movements like squats, deadlifts, bench press, and rows.',
            'Rule out medical conditions: Unexplained weight loss or inability to gain weight can be symptoms of thyroid disorders, celiac disease, diabetes, cancer, or eating disorders. Consult a healthcare provider for proper evaluation.',
            'Add healthy calorie-dense foods: Include avocados, olive oil, nuts, seeds, and nut butters in your daily diet. These foods provide substantial calories without excessive volume.',
          ]} />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="bmi-around-world">BMI Standards Around the World</SEOHeading>
          <SEOParagraph>
            While the WHO provides universal BMI categories, different countries and populations have adopted modified thresholds based on local health data. This is because the relationship between BMI and health risks varies among ethnic groups due to differences in body composition, fat distribution, and genetic factors.
          </SEOParagraph>
          <SEOTable
            caption="BMI Thresholds by Region"
            headers={['Region / Population', 'Overweight Threshold', 'Obese Threshold', 'Reason for Difference']}
            rows={[
              ['WHO Standard', '≥ 25.0', '≥ 30.0', 'Global reference standard'],
              ['Asian (WHO Asian)', '≥ 23.0', '≥ 27.5', 'Higher risk at lower BMI'],
              ['Japan', '≥ 23.0', '≥ 25.0', 'Higher metabolic risk at lower weights'],
              ['China', '≥ 24.0', '≥ 28.0', 'National health survey data'],
              ['India', '≥ 23.0', '≥ 25.0', 'Higher visceral fat tendency'],
              ['Pacific Islander', '≥ 26.0', '≥ 32.0', 'Naturally larger body frames'],
              ['United States (CDC)', '≥ 25.0', '≥ 30.0', 'Follows WHO standard'],
              ['European Union', '≥ 25.0', '≥ 30.0', 'Follows WHO standard'],
            ]}
          />
          <SEOCallout type="warning">
            <strong>For Asian Populations:</strong> If you are of South Asian, East Asian, or Southeast Asian descent, be aware that health risks associated with excess weight begin at a lower BMI. The WHO recommends using 23.0 as the overweight threshold and 27.5 as the obesity threshold for Asian populations. Our calculator uses the standard WHO thresholds but you should consult these modified ranges if applicable.
          </SEOCallout>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="bmi-vs-alternatives">BMI vs. Other Body Composition Metrics</SEOHeading>
          <SEOParagraph>
            While BMI remains one of the most practical and widely used health metrics, several alternative measurements can provide a more complete picture of your body composition and health risks. Understanding when to use each metric helps you make more informed health decisions.
          </SEOParagraph>
          <SEOTable
            caption="Comparison of Body Composition Metrics"
            headers={['Metric', 'What It Measures', 'Pros', 'Cons', 'Best For']}
            rows={[
              ['BMI', 'Weight relative to height', 'Free, quick, easy', 'Does not measure fat directly', 'General screening'],
              ['Body Fat %', 'Percentage of body that is fat', 'More accurate than BMI', 'Requires special equipment', 'Fitness tracking'],
              ['Waist Circumference', 'Fat around the midsection', 'Predicts visceral fat risk', 'Doesn\'t distinguish fat types', 'Heart disease risk'],
              ['Waist-to-Hip Ratio', 'Fat distribution pattern', 'Assesses fat location', 'Requires two measurements', 'Metabolic risk assessment'],
              ['DEXA Scan', 'Bone, fat, and muscle mass', 'Most accurate method', 'Expensive, requires clinic visit', 'Medical diagnosis'],
              ['Skinfold Calipers', 'Subcutaneous fat thickness', 'Inexpensive, portable', 'Operator-dependent accuracy', 'Fitness professionals'],
              ['Bioelectrical Impedance', 'Body fat via electrical signal', 'Available on home scales', 'Affected by hydration level', 'Home monitoring'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="bmi-history">The History of BMI: From Quetelet to Modern Medicine</SEOHeading>
          <SEOParagraph>
            The story of BMI begins in the early 19th century with Lambert Adolphe Jacques Quetelet (1796-1874), a Belgian astronomer, mathematician, and statistician. While studying human growth patterns and the distribution of human traits across populations, Quetelet observed that adult weight was proportional to the square of height. He published this finding in 1832, calling it the &quot;Quetelet Index.&quot;
          </SEOParagraph>
          <SEOParagraph>
            For over a century, the Quetelet Index remained largely in academic obscurity. It was not until 1972 that the American physiologist Ancel Keys published a landmark study comparing the Quetelet Index with other measures of body fat. Keys renamed it the &quot;Body Mass Index&quot; and demonstrated that it was the best simple proxy for body fat percentage among the indices he tested, despite its known limitations.
          </SEOParagraph>
          <SEOParagraph>
            In 1995, the WHO formally adopted BMI as the standard metric for classifying overweight and obesity, establishing the category thresholds still used today. The NIH followed suit in 1998, using BMI to define clinical guidelines for the identification, evaluation, and treatment of overweight and obesity. Since then, BMI has become a fundamental tool in public health research, clinical medicine, and epidemiology — used in studies involving millions of participants worldwide.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="bmi-faq">Frequently Asked Questions About BMI</SEOHeading>
          <SEOFAQ items={[
            { question: 'What is a healthy BMI for adults?', answer: 'A healthy BMI for adults is between 18.5 and 24.9 according to the World Health Organization. This range is associated with the lowest risk of weight-related health problems including heart disease, type 2 diabetes, and certain cancers. However, optimal BMI can vary based on age, ethnicity, muscle mass, and overall health status.' },
            { question: 'Is BMI accurate for athletes and bodybuilders?', answer: 'BMI is often not accurate for athletes, bodybuilders, or highly muscular individuals because it cannot distinguish between muscle mass and fat mass. Since muscle is denser and heavier than fat, a muscular person may have a high BMI while actually having very low body fat. Athletes should use additional metrics like body fat percentage, DEXA scans, or skinfold measurements for a more accurate assessment.' },
            { question: 'Does BMI change with age?', answer: 'While the BMI formula remains constant regardless of age, the interpretation of BMI values may change as you age. Older adults tend to naturally lose muscle mass and gain body fat even if their weight remains stable. Research suggests that a slightly higher BMI (25-27) may be protective for adults over 65, providing energy reserves during illness. Children use age-specific BMI percentile charts.' },
            { question: 'What is the best time to weigh myself for an accurate BMI calculation?', answer: 'For the most consistent and accurate BMI calculation, weigh yourself first thing in the morning after using the bathroom and before eating or drinking anything. Wear minimal or no clothing and use the same reliable digital scale each time. Your weight can naturally fluctuate by 2-5 pounds (1-2.5 kg) throughout the day due to food, water intake, and physical activity.' },
            { question: 'Can BMI be used during pregnancy?', answer: 'Standard BMI categories should not be applied during pregnancy because expected weight gain makes the results meaningless for health assessment. However, pre-pregnancy BMI is important — healthcare providers use it to determine healthy weight gain goals during pregnancy. A woman with a normal pre-pregnancy BMI should gain 25-35 pounds during pregnancy, while those with higher BMI may be advised to gain less.' },
            { question: 'How accurate is this online BMI calculator compared to a doctor\'s assessment?', answer: 'This online BMI calculator uses the exact same WHO-approved mathematical formula that doctors and healthcare providers use: weight in kg divided by height in meters squared. The calculation itself is equally accurate. However, a doctor provides additional context through physical examination, blood tests, family history review, and consideration of other health metrics that a simple calculator cannot provide.' },
            { question: 'What are the limitations of using BMI as a health indicator?', answer: 'BMI has several important limitations: (1) It cannot distinguish between muscle and fat mass, (2) It does not account for fat distribution — belly fat is more dangerous than peripheral fat, (3) It uses the same thresholds for all ages despite changes in body composition with aging, (4) It may not be equally valid across all ethnic groups, (5) It does not measure metabolic health markers like blood sugar or cholesterol, and (6) It cannot be applied during pregnancy. BMI is best used as an initial screening tool alongside other health assessments.' },
            { question: 'How can I lower my BMI safely and effectively?', answer: 'To lower your BMI safely, focus on sustainable lifestyle changes: (1) Follow a balanced diet rich in vegetables, fruits, lean proteins, and whole grains while reducing processed foods and sugary drinks, (2) Exercise regularly — aim for 150 minutes of moderate activity per week plus strength training, (3) Get 7-9 hours of quality sleep, (4) Manage stress through meditation or relaxation techniques, (5) Stay hydrated with 8+ glasses of water daily, and (6) Aim for gradual weight loss of 1-2 pounds per week. Avoid crash diets as they lead to muscle loss and metabolic slowdown.' },
            { question: 'Is a BMI of 25 really overweight?', answer: 'A BMI of 25.0 is technically classified as the beginning of the overweight range according to WHO standards. However, being at exactly 25 does not automatically mean you are unhealthy. Many factors influence health beyond BMI, including fitness level, diet quality, waist circumference, blood pressure, cholesterol, and blood sugar levels. Some people at BMI 25-26 are metabolically healthy, while others at BMI 23 may not be. BMI should be considered alongside other health indicators.' },
            { question: 'What is the difference between BMI and body fat percentage?', answer: 'BMI is a simple ratio of weight to height that provides an indirect estimate of body fatness. Body fat percentage directly measures the proportion of your body that is composed of fat tissue. BMI is free and requires only a scale and measuring tape, while body fat percentage requires specialized equipment like calipers, bioelectrical impedance scales, or DEXA scans. Body fat percentage is more accurate but less accessible. Healthy body fat ranges are typically 10-20% for men and 18-28% for women.' },
          ]} />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="bmi-tips">Expert Tips for Maintaining a Healthy BMI</SEOHeading>
          <SEOBulletList items={[
            'Track your BMI monthly to identify trends early. Small, consistent changes in weight are easier to address than large fluctuations.',
            'Focus on body composition, not just the scale number. Combining BMI monitoring with waist circumference measurements gives a much better picture of health.',
            'Remember that a healthy BMI is just one piece of the health puzzle. Regular check-ups, blood tests, and cardiovascular fitness are equally important.',
            'Set process goals (e.g., "exercise 4 times per week") rather than just outcome goals (e.g., "reach BMI 22"). Process goals lead to sustainable habits that naturally bring your BMI into a healthy range.',
            'Do not compare your BMI with others. Factors like genetics, bone structure, muscle mass, and body type mean that the optimal BMI varies from person to person within the healthy range.',
            'If you are tracking BMI over time, always measure under the same conditions — same time of day, same clothing, same scale — to ensure meaningful comparisons.',
            'Consider the trend rather than any single measurement. A BMI that is gradually increasing over several months is more concerning than a single high reading.',
            'Combine BMI awareness with practical habits: meal planning, regular exercise, stress management, and adequate sleep form the foundation of long-term weight management.',
          ]} />
        </section>

        <SEOInternalLinks links={[
          { href: '/age-calculator', title: 'Age Calculator', description: 'Calculate exact age' },
          { href: '/percentage-calculator', title: 'Percentage Calculator', description: 'Calculate percentages' },
          { href: '/unit-converter', title: 'Unit Converter', description: 'Convert kg to lbs' },
          { href: '/emi-calculator', title: 'EMI Calculator', description: 'Plan your finances' },
        ]} />

      </SEOContentSection>
    </>
  );
}