import { Metadata } from 'next';
import {
  SEOContentSection, SEOHeading, SEOParagraph, SEOTable, SEOBulletList,
  SEONumberedList, SEOFAQ, SEOCallout, SEOInternalLinks
} from '@/components/SEOContent';

export const metadata: Metadata = {
  title: 'Password Generator - Free Strong Random Password Generator Online | Secure & Uncrackable',
  description:
    'Free password generator - Create strong, secure, random passwords instantly! Custom length, symbols, numbers. Works offline, 100% private. Generate uncrackable passwords now!',
  keywords: [
    'password generator',
    'free password generator',
    'strong password generator',
    'secure password generator',
    'random password generator',
    'password creator',
    'generate password',
    'strong password',
    'secure password',
    'random password',
    'how to create strong password',
    'what is a good password',
    'online password generator',
    'password generator no signup',
    'best password generator',
    'passphrase generator',
    'uncrackable password generator',
    'password strength checker',
  ],
  alternates: {
    canonical: 'https://worksyhub.online/password-generator',
  },
  openGraph: {
    title: 'Free Password Generator - Create Strong Secure Passwords Instantly',
    description: 'Generate strong, secure, random passwords instantly. Custom length, symbols, numbers. 100% private, no signup.',
    url: 'https://worksyhub.online/password-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Password Generator - Strong & Secure',
    description: 'Create uncrackable passwords instantly with our free password generator!',
  }
};

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free Secure Password Generator',
    description: 'Generate strong, random, secure passwords. Customizable length, symbols, numbers, case. 100% client-side for maximum privacy.',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Any',
    url: 'https://worksyhub.online/password-generator',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    creator: { '@type': 'Organization', name: 'WorksyHub' }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worksyhub.online' },
      { '@type': 'ListItem', position: 2, name: 'Password Generator', item: 'https://worksyhub.online/password-generator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What makes a password strong?', acceptedAnswer: { '@type': 'Answer', text: 'A strong password is at least 12-16 characters long, includes uppercase and lowercase letters, numbers, and special symbols. It should be random and not contain dictionary words or personal information.' } },
      { '@type': 'Question', name: 'Is this password generator secure?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Our password generator runs 100% in your browser using the Web Crypto API. No passwords are ever sent to servers or stored anywhere.' } },
      { '@type': 'Question', name: 'How long should my password be?', acceptedAnswer: { '@type': 'Answer', text: 'At least 12 characters for most accounts, 16+ for sensitive accounts like banking or email. Longer passwords are exponentially harder to crack.' } },
      { '@type': 'Question', name: 'What is a passphrase?', acceptedAnswer: { '@type': 'Answer', text: 'A passphrase is a sequence of random words used as a password, such as "correct-horse-battery-staple." Passphrases are long enough to be very secure while being easier to remember than random character strings.' } },
      { '@type': 'Question', name: 'How often should I change my passwords?', acceptedAnswer: { '@type': 'Answer', text: 'NIST recommends changing passwords only when there is evidence of compromise, rather than on a fixed schedule. However, use unique passwords for every account and enable two-factor authentication.' } },
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
          <SEOHeading level={2} id="what-is-password-generator">What is a Password Generator? Why You Need One</SEOHeading>
          <SEOParagraph>
            A <strong>password generator</strong> is a tool that creates random, complex passwords that are extremely difficult for hackers and automated programs to guess or crack. In an era where data breaches expose billions of passwords annually, using strong, unique passwords for every account is your most important defense against cybercriminals.
          </SEOParagraph>
          <SEOParagraph>
            Our <strong>free online password generator</strong> creates cryptographically secure passwords using your browser&apos;s built-in Web Crypto API — the same technology used by banks and government agencies. No passwords are transmitted over the internet or stored on any server. Everything happens locally on your device, ensuring maximum privacy and security.
          </SEOParagraph>
          <SEOParagraph>
            The human brain is notoriously bad at creating truly random passwords. Studies show that most people use predictable patterns — capitalizing the first letter, adding a number at the end, or substituting &quot;@&quot; for &quot;a.&quot; Hackers know these patterns and exploit them. A dedicated password generator eliminates all human predictability, creating passwords that can withstand even the most sophisticated attack methods.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="password-strength">Password Strength: How Long to Crack Different Passwords</SEOHeading>
          <SEOParagraph>
            The strength of a password depends primarily on its <strong>length</strong> and <strong>character variety</strong>. The following table shows approximately how long it would take a modern computer performing 100 billion guesses per second to brute-force crack different types of passwords:
          </SEOParagraph>
          <SEOTable
            caption="Password Cracking Time by Length and Complexity (2025)"
            headers={['Password Type', '6 chars', '8 chars', '10 chars', '12 chars', '16 chars']}
            rows={[
              ['Numbers only (0-9)', 'Instant', 'Instant', '< 1 second', '2 seconds', '5 hours'],
              ['Lowercase only (a-z)', 'Instant', '5 seconds', '59 minutes', '27 days', '2,000 years'],
              ['Mixed case (a-Z)', 'Instant', '22 minutes', '1 month', '300 years', '16 million years'],
              ['Mixed + Numbers (a-Z, 0-9)', 'Instant', '1 hour', '7 months', '2,000 years', '100 million years'],
              ['All characters (a-Z, 0-9, !@#$)', '5 seconds', '8 hours', '5 years', '34,000 years', '1 trillion years'],
            ]}
          />
          <SEOCallout type="warning">
            <strong>Important:</strong> These times assume brute-force attacks where every possible combination is tried. In practice, dictionary attacks and pattern-based attacks can crack weak passwords much faster. A password like &quot;Password123!&quot; would be cracked in seconds despite having mixed case, numbers, and symbols, because it follows a common pattern.
          </SEOCallout>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="create-strong-password">How to Create the Strongest Possible Password</SEOHeading>
          <SEONumberedList items={[
            'Use at least 16 characters: While 12 is the minimum recommendation, 16+ characters provide significantly stronger protection. Each additional character exponentially increases the number of possible combinations.',
            'Include all character types: Combine uppercase letters (A-Z), lowercase letters (a-z), numbers (0-9), and special symbols (!@#$%^&*). This maximizes the character set attackers must search through.',
            'Make it truly random: Avoid dictionary words, names, dates, keyboard patterns (qwerty, 123456), or any personal information. Use a password generator to eliminate human bias.',
            'Never reuse passwords: Every account should have a unique password. If one account is compromised, reused passwords give hackers immediate access to all your other accounts.',
            'Use a password manager: Tools like Bitwarden (free), 1Password, or KeePass securely store all your unique passwords so you only need to remember one master password.',
            'Enable two-factor authentication (2FA): Even the strongest password can be stolen in a data breach. 2FA adds a second layer requiring your phone or security key, making unauthorized access nearly impossible.',
          ]} />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="common-passwords">Most Common Passwords: Are You Using One?</SEOHeading>
          <SEOParagraph>
            Every year, security researchers analyze leaked password databases to identify the most commonly used passwords worldwide. If your password appears on this list, change it immediately — hackers test these first in every attack:
          </SEOParagraph>
          <SEOTable
            caption="Top 20 Most Common Passwords (Based on Data Breach Analysis)"
            headers={['Rank', 'Password', 'Time to Crack', 'Rank', 'Password', 'Time to Crack']}
            rows={[
              ['1', '123456', '< 1 second', '11', 'qwerty123', '< 1 second'],
              ['2', 'password', '< 1 second', '12', '1q2w3e4r', '< 1 second'],
              ['3', '123456789', '< 1 second', '13', 'abc123', '< 1 second'],
              ['4', '12345678', '< 1 second', '14', 'password1', '< 1 second'],
              ['5', '12345', '< 1 second', '15', '1234', '< 1 second'],
              ['6', 'qwerty', '< 1 second', '16', 'iloveyou', '< 1 second'],
              ['7', '1234567', '< 1 second', '17', 'monkey', '< 1 second'],
              ['8', '111111', '< 1 second', '18', 'dragon', '< 1 second'],
              ['9', '1234567890', '< 1 second', '19', 'master', '< 1 second'],
              ['10', '123123', '< 1 second', '20', 'letmein', '< 1 second'],
            ]}
          />
          <SEOCallout type="info">
            <strong>Shocking fact:</strong> These 20 passwords account for approximately 10% of all passwords exposed in data breaches. &quot;123456&quot; alone has appeared in over 23 million compromised accounts. A randomly generated 16-character password would never appear on any such list.
          </SEOCallout>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="password-attacks">How Hackers Crack Passwords: Attack Methods Explained</SEOHeading>
          <SEOParagraph>
            Understanding how passwords get cracked helps you appreciate why using a password generator is essential. Here are the main methods hackers use:
          </SEOParagraph>

          <SEOHeading level={3}>1. Brute Force Attack</SEOHeading>
          <SEOParagraph>
            A brute force attack systematically tries every possible combination of characters until the correct password is found. While this always works given enough time, it becomes impractical for long, complex passwords. A 16-character password using all character types would take trillions of years to brute-force with current technology.
          </SEOParagraph>

          <SEOHeading level={3}>2. Dictionary Attack</SEOHeading>
          <SEOParagraph>
            Dictionary attacks test passwords against databases of common words, phrases, and previously leaked passwords. They include common substitutions like &quot;p@ssw0rd&quot; for &quot;password.&quot; This is why using real words — even with character substitutions — is dangerous.
          </SEOParagraph>

          <SEOHeading level={3}>3. Credential Stuffing</SEOHeading>
          <SEOParagraph>
            When a data breach exposes username/password pairs, hackers automatically test those same credentials on thousands of other websites. If you reuse passwords, one breach can compromise all your accounts. This is the #1 reason to never reuse passwords.
          </SEOParagraph>

          <SEOHeading level={3}>4. Phishing</SEOHeading>
          <SEOParagraph>
            Phishing tricks you into entering your password on a fake website that looks like a legitimate one. No password is strong enough to protect against phishing — which is why 2FA is essential. Even if an attacker captures your password through phishing, they cannot access your account without the second factor.
          </SEOParagraph>

          <SEOHeading level={3}>5. Rainbow Table Attack</SEOHeading>
          <SEOParagraph>
            Rainbow tables are precomputed databases of password hashes, allowing attackers to quickly look up a password hash and find the corresponding password. Modern websites protect against this by using &quot;salting&quot; (adding random data to passwords before hashing), but older or poorly-designed systems remain vulnerable.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="password-managers">Password Managers: Storing Your Generated Passwords</SEOHeading>
          <SEOParagraph>
            Once you generate strong, unique passwords for all your accounts, you need a secure way to store them. Password managers are encrypted vaults that store all your passwords and auto-fill them when you log in to websites.
          </SEOParagraph>
          <SEOTable
            caption="Popular Password Managers Comparison"
            headers={['Manager', 'Free Tier', 'Platforms', 'Key Features', 'Best For']}
            rows={[
              ['Bitwarden', 'Yes (full-featured)', 'All platforms', 'Open source, self-hostable, TOTP', 'Best free option'],
              ['1Password', 'No (14-day trial)', 'All platforms', 'Travel mode, Watchtower, families', 'Families & teams'],
              ['KeePass', 'Yes (completely free)', 'Windows, plugins for others', 'Offline, open source, plugins', 'Maximum control'],
              ['Dashlane', 'Limited free tier', 'All platforms', 'VPN included, dark web monitoring', 'All-in-one security'],
              ['LastPass', 'Limited free tier', 'All platforms', 'Auto-fill, sharing, emergency access', 'Ease of use'],
              ['Apple Keychain', 'Yes (Apple devices)', 'Apple ecosystem', 'Built-in, passkey support', 'Apple users'],
              ['Google Password Manager', 'Yes', 'Chrome, Android', 'Built into Chrome, auto-generate', 'Chrome users'],
            ]}
          />
          <SEOCallout type="tip">
            <strong>Pro tip:</strong> When using a password manager, your master password is the most important password you will ever create. Make it a long passphrase (4-6 random words) that you can memorize, like &quot;correct-amber-sunset-bicycle-piano.&quot; Never write down or reuse your master password.
          </SEOCallout>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="2fa-guide">Two-Factor Authentication (2FA): Your Second Line of Defense</SEOHeading>
          <SEOParagraph>
            Even the strongest password can be exposed in a data breach. <strong>Two-factor authentication (2FA)</strong> adds a second verification step, typically a code from your phone or a physical security key, that hackers cannot obtain remotely.
          </SEOParagraph>
          <SEOTable
            caption="2FA Methods Ranked by Security"
            headers={['Method', 'Security Level', 'How It Works', 'Pros', 'Cons']}
            rows={[
              ['Hardware Security Key', '★★★★★', 'Physical USB/NFC key', 'Most secure, phishing-proof', 'Costs $25-70, can be lost'],
              ['Authenticator App', '★★★★☆', 'Time-based codes (TOTP)', 'Free, works offline', 'Phone required, setup per site'],
              ['Push Notification', '★★★☆☆', 'Approve on phone app', 'Convenient, one-tap', 'Requires internet on phone'],
              ['SMS Code', '★★☆☆☆', 'Text message with code', 'Works on any phone', 'Vulnerable to SIM swapping'],
              ['Email Code', '★★☆☆☆', 'Code sent via email', 'No extra app needed', 'Email could be compromised too'],
            ]}
          />
          <SEOParagraph>
            We strongly recommend enabling 2FA on all important accounts, especially email, banking, social media, and cloud storage. Start with your email account — since password resets go through email, compromising your email can cascade to all other accounts.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="password-guidelines">NIST Password Guidelines (2025 Updated)</SEOHeading>
          <SEOParagraph>
            The <strong>National Institute of Standards and Technology (NIST)</strong> regularly updates its password recommendations for organizations and individuals. Their latest guidelines have significantly changed how we think about password security:
          </SEOParagraph>
          <SEOBulletList items={[
            'Minimum length: NIST recommends a minimum of 8 characters, but strongly encourages 15+ characters. Length is more important than complexity.',
            'No periodic password changes: Forced regular password changes (e.g., every 90 days) actually reduce security because users choose weaker, more predictable passwords. Change passwords only when there is evidence of compromise.',
            'Allow all characters: Systems should accept all printable ASCII characters, Unicode, and spaces in passwords. Users should not be restricted in what characters they can use.',
            'No composition rules: NIST advises against mandatory complexity requirements like "must include uppercase, number, and symbol." While these increase theoretical strength, they lead to predictable patterns.',
            'Check against breach databases: New passwords should be checked against known compromised password lists (like Have I Been Pwned) to prevent use of previously leaked passwords.',
            'No password hints: Password hints and knowledge-based security questions (like "mother\'s maiden name") are easily guessable and should not be used.',
            'Enable 2FA: Multi-factor authentication should be available and encouraged for all accounts, especially those containing sensitive information.',
          ]} />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="password-faq">Frequently Asked Questions About Password Security</SEOHeading>
          <SEOFAQ items={[
            { question: 'What is the best password length?', answer: 'The best password length is 16 characters or more. While 12 characters is considered the minimum for security, each additional character exponentially increases the time needed to crack the password. A 16-character password with all character types would take trillions of years to brute-force. For highly sensitive accounts (banking, email, work), consider using 20+ characters.' },
            { question: 'Is this password generator really secure?', answer: 'Yes, our password generator is extremely secure. All passwords are generated locally in your browser using the Web Crypto API, which provides cryptographically secure random number generation. No passwords are ever transmitted to any server, stored in any database, or logged in any way. The tool works completely offline once the page is loaded.' },
            { question: 'What makes a password "strong"?', answer: 'A strong password has three key properties: (1) Length — at least 12-16 characters, (2) Randomness — no dictionary words, patterns, or personal information, (3) Uniqueness — not used for any other account. A password like "T#k9!mZ$2wPx&4Lv" is strong because it is long, random, and uses all character types. A password like "Summer2024!" is weak despite having mixed characters because it uses a dictionary word and predictable pattern.' },
            { question: 'How many passwords does the average person need?', answer: 'The average person has 70-100 online accounts, meaning you need 70-100 unique passwords. This is humanly impossible to manage without a password manager. Use our generator to create a unique, strong password for each account, and store them all in a password manager like Bitwarden (free) or 1Password.' },
            { question: 'Should I write my passwords down?', answer: 'Writing passwords on paper is generally safer than reusing the same password across multiple accounts, but it is not ideal. Paper can be lost, stolen, or damaged. A much better approach is using a password manager — an encrypted digital vault that securely stores all your passwords and auto-fills them when needed. If you must write passwords down, keep the paper in a locked safe and never label what each password is for.' },
            { question: 'What is a passphrase and is it more secure?', answer: 'A passphrase is a password made up of multiple random words, such as "correct-horse-battery-staple." Passphrases can be very secure because they are long (often 20-30+ characters) while being easier to remember than random character strings. A 5-word passphrase from a dictionary of 7,776 words has about 64 bits of entropy — comparable to a random 10-character password. For maximum security, use passphrases of 6+ random words.' },
            { question: 'How do I know if my password has been leaked?', answer: 'Visit haveibeenpwned.com and enter your email address to check if your accounts have been part of any known data breaches. You can also check specific passwords (safely, using a hash-based method) to see if they appear in any breach database. If any of your accounts have been compromised, immediately change those passwords and any other accounts where you used the same password.' },
            { question: 'What is the difference between encryption and hashing?', answer: 'Encryption is a two-way process — encrypted data can be decrypted back to its original form with the correct key. Hashing is a one-way process — a password is transformed into a fixed-length string that cannot be reversed. Websites should store password hashes, not encrypted passwords. When you log in, the site hashes your input and compares it to the stored hash. Properly hashed passwords cannot be recovered even if the database is stolen.' },
          ]} />
        </section>

        <SEOInternalLinks links={[
          { href: '/qr-code-generator', title: 'QR Code Generator', description: 'Create QR codes' },
          { href: '/word-counter', title: 'Word Counter', description: 'Count words & chars' },
          { href: '/bmi-calculator', title: 'BMI Calculator', description: 'Check your health' },
          { href: '/unit-converter', title: 'Unit Converter', description: 'Convert units' },
        ]} />

      </SEOContentSection>
    </>
  );
}