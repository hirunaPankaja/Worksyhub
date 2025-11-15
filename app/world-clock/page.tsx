// src/app/world-clock/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Clock, BookOpen, Globe, MapPin, Settings, Zap, Eye, EyeOff, Plus, Trash2, Search, Download, Share2, Moon, Sun, Filter, Grid, List, Star, StarOff } from 'lucide-react';

const worldTimeZones = [
  // --- North America ---
  { label: 'New York (EST/EDT)', value: 'America/New_York', country: 'USA', region: 'North America' },
  { label: 'Los Angeles (PST/PDT)', value: 'America/Los_Angeles', country: 'USA', region: 'North America' },
  { label: 'Chicago (CST/CDT)', value: 'America/Chicago', country: 'USA', region: 'North America' },
  { label: 'Denver (MST/MDT)', value: 'America/Denver', country: 'USA', region: 'North America' },
  { label: 'Phoenix (MST)', value: 'America/Phoenix', country: 'USA', region: 'North America' },
  { label: 'Anchorage (AKST/AKDT)', value: 'America/Anchorage', country: 'USA', region: 'North America' },
  { label: 'Honolulu (HST)', value: 'Pacific/Honolulu', country: 'USA', region: 'North America' },
  { label: 'Toronto (EST/EDT)', value: 'America/Toronto', country: 'Canada', region: 'North America' },
  { label: 'Vancouver (PST/PDT)', value: 'America/Vancouver', country: 'Canada', region: 'North America' },
  { label: 'Montreal (EST/EDT)', value: 'America/Montreal', country: 'Canada', region: 'North America' },
  { label: 'Winnipeg (CST/CDT)', value: 'America/Winnipeg', country: 'Canada', region: 'North America' },
  { label: 'Mexico City (CST/CDT)', value: 'America/Mexico_City', country: 'Mexico', region: 'North America' },
  { label: 'Guadalajara (CST)', value: 'America/Mexico_City', country: 'Mexico', region: 'North America' },
  { label: 'Panama City (EST)', value: 'America/Panama', country: 'Panama', region: 'North America' },
  { label: 'Guatemala City (CST)', value: 'America/Guatemala', country: 'Guatemala', region: 'North America' },

  // --- Central America & Caribbean ---
  { label: 'Havana (CST/CDT)', value: 'America/Havana', country: 'Cuba', region: 'Caribbean' },
  { label: 'Kingston (EST)', value: 'America/Jamaica', country: 'Jamaica', region: 'Caribbean' },
  { label: 'Port-au-Prince (EST/EDT)', value: 'America/Port-au-Prince', country: 'Haiti', region: 'Caribbean' },
  { label: 'Santo Domingo (AST)', value: 'America/Santo_Domingo', country: 'Dominican Republic', region: 'Caribbean' },
  { label: 'San Juan (AST)', value: 'America/Puerto_Rico', country: 'Puerto Rico', region: 'Caribbean' },
  { label: 'Nassau (EST/EDT)', value: 'America/Nassau', country: 'Bahamas', region: 'Caribbean' },

  // --- South America ---
  { label: 'São Paulo (BRT)', value: 'America/Sao_Paulo', country: 'Brazil', region: 'South America' },
  { label: 'Rio de Janeiro (BRT)', value: 'America/Sao_Paulo', country: 'Brazil', region: 'South America' },
  { label: 'Brasília (BRT)', value: 'America/Sao_Paulo', country: 'Brazil', region: 'South America' },
  { label: 'Buenos Aires (ART)', value: 'America/Argentina/Buenos_Aires', country: 'Argentina', region: 'South America' },
  { label: 'Santiago (CLT/CLST)', value: 'America/Santiago', country: 'Chile', region: 'South America' },
  { label: 'Lima (PET)', value: 'America/Lima', country: 'Peru', region: 'South America' },
  { label: 'Bogotá (COT)', value: 'America/Bogota', country: 'Colombia', region: 'South America' },
  { label: 'Caracas (VET)', value: 'America/Caracas', country: 'Venezuela', region: 'South America' },
  { label: 'Quito (ECT)', value: 'America/Guayaquil', country: 'Ecuador', region: 'South America' },
  { label: 'La Paz (BOT)', value: 'America/La_Paz', country: 'Bolivia', region: 'South America' },
  { label: 'Asunción (PYT/PYST)', value: 'America/Asuncion', country: 'Paraguay', region: 'South America' },
  { label: 'Montevideo (UYT/UYST)', value: 'America/Montevideo', country: 'Uruguay', region: 'South America' },
  { label: 'Georgetown (GYT)', value: 'America/Guyana', country: 'Guyana', region: 'South America' },
  { label: 'Paramaribo (SRT)', value: 'America/Paramaribo', country: 'Suriname', region: 'South America' },
  { label: 'Cayenne (GFT)', value: 'America/Cayenne', country: 'French Guiana', region: 'South America' },

  // --- Europe ---
  { label: 'London (GMT/BST)', value: 'Europe/London', country: 'UK', region: 'Europe' },
  { label: 'Dublin (GMT/IST)', value: 'Europe/Dublin', country: 'Ireland', region: 'Europe' },
  { label: 'Paris (CET/CEST)', value: 'Europe/Paris', country: 'France', region: 'Europe' },
  { label: 'Berlin (CET/CEST)', value: 'Europe/Berlin', country: 'Germany', region: 'Europe' },
  { label: 'Madrid (CET/CEST)', value: 'Europe/Madrid', country: 'Spain', region: 'Europe' },
  { label: 'Barcelona (CET/CEST)', value: 'Europe/Madrid', country: 'Spain', region: 'Europe' },
  { label: 'Rome (CET/CEST)', value: 'Europe/Rome', country: 'Italy', region: 'Europe' },
  { label: 'Milan (CET/CEST)', value: 'Europe/Rome', country: 'Italy', region: 'Europe' },
  { label: 'Amsterdam (CET/CEST)', value: 'Europe/Amsterdam', country: 'Netherlands', region: 'Europe' },
  { label: 'Brussels (CET/CEST)', value: 'Europe/Brussels', country: 'Belgium', region: 'Europe' },
  { label: 'Vienna (CET/CEST)', value: 'Europe/Vienna', country: 'Austria', region: 'Europe' },
  { label: 'Zurich (CET/CEST)', value: 'Europe/Zurich', country: 'Switzerland', region: 'Europe' },
  { label: 'Stockholm (CET/CEST)', value: 'Europe/Stockholm', country: 'Sweden', region: 'Europe' },
  { label: 'Oslo (CET/CEST)', value: 'Europe/Oslo', country: 'Norway', region: 'Europe' },
  { label: 'Copenhagen (CET/CEST)', value: 'Europe/Copenhagen', country: 'Denmark', region: 'Europe' },
  { label: 'Helsinki (EET/EEST)', value: 'Europe/Helsinki', country: 'Finland', region: 'Europe' },
  { label: 'Warsaw (CET/CEST)', value: 'Europe/Warsaw', country: 'Poland', region: 'Europe' },
  { label: 'Prague (CET/CEST)', value: 'Europe/Prague', country: 'Czech Republic', region: 'Europe' },
  { label: 'Budapest (CET/CEST)', value: 'Europe/Budapest', country: 'Hungary', region: 'Europe' },
  { label: 'Lisbon (WET/WEST)', value: 'Europe/Lisbon', country: 'Portugal', region: 'Europe' },
  { label: 'Athens (EET/EEST)', value: 'Europe/Athens', country: 'Greece', region: 'Europe' },
  { label: 'Istanbul (TRT)', value: 'Europe/Istanbul', country: 'Türkiye', region: 'Europe' },
  { label: 'Moscow (MSK)', value: 'Europe/Moscow', country: 'Russia', region: 'Europe' },
  { label: 'Kyiv (EET/EEST)', value: 'Europe/Kyiv', country: 'Ukraine', region: 'Europe' },
  { label: 'Bucharest (EET/EEST)', value: 'Europe/Bucharest', country: 'Romania', region: 'Europe' },
  { label: 'Sofia (EET/EEST)', value: 'Europe/Sofia', country: 'Bulgaria', region: 'Europe' },
  { label: 'Belgrade (CET/CEST)', value: 'Europe/Belgrade', country: 'Serbia', region: 'Europe' },
  { label: 'Zagreb (CET/CEST)', value: 'Europe/Zagreb', country: 'Croatia', region: 'Europe' },

  // --- Middle East ---
  { label: 'Dubai (GST)', value: 'Asia/Dubai', country: 'UAE', region: 'Middle East' },
  { label: 'Abu Dhabi (GST)', value: 'Asia/Dubai', country: 'UAE', region: 'Middle East' },
  { label: 'Riyadh (AST)', value: 'Asia/Riyadh', country: 'Saudi Arabia', region: 'Middle East' },
  { label: 'Jeddah (AST)', value: 'Asia/Riyadh', country: 'Saudi Arabia', region: 'Middle East' },
  { label: 'Doha (AST)', value: 'Asia/Qatar', country: 'Qatar', region: 'Middle East' },
  { label: 'Manama (AST)', value: 'Asia/Bahrain', country: 'Bahrain', region: 'Middle East' },
  { label: 'Kuwait City (AST)', value: 'Asia/Kuwait', country: 'Kuwait', region: 'Middle East' },
  { label: 'Muscat (GST)', value: 'Asia/Muscat', country: 'Oman', region: 'Middle East' },
  { label: 'Sana\'a (AST)', value: 'Asia/Aden', country: 'Yemen', region: 'Middle East' },
  { label: 'Amman (EET/EEST)', value: 'Asia/Amman', country: 'Jordan', region: 'Middle East' },
  { label: 'Beirut (EET/EEST)', value: 'Asia/Beirut', country: 'Lebanon', region: 'Middle East' },
  { label: 'Damascus (EET/EEST)', value: 'Asia/Damascus', country: 'Syria', region: 'Middle East' },
  { label: 'Jerusalem (IST/IDT)', value: 'Asia/Jerusalem', country: 'Israel', region: 'Middle East' },
  { label: 'Tel Aviv (IST/IDT)', value: 'Asia/Jerusalem', country: 'Israel', region: 'Middle East' },
  { label: 'Baghdad (AST)', value: 'Asia/Baghdad', country: 'Iraq', region: 'Middle East' },
  { label: 'Tehran (IRST/IRDT)', value: 'Asia/Tehran', country: 'Iran', region: 'Middle East' },

  // --- South Asia ---
  { label: 'New Delhi (IST)', value: 'Asia/Kolkata', country: 'India', region: 'South Asia' },
  { label: 'Mumbai (IST)', value: 'Asia/Kolkata', country: 'India', region: 'South Asia' },
  { label: 'Bangalore (IST)', value: 'Asia/Kolkata', country: 'India', region: 'South Asia' },
  { label: 'Chennai (IST)', value: 'Asia/Kolkata', country: 'India', region: 'South Asia' },
  { label: 'Kolkata (IST)', value: 'Asia/Kolkata', country: 'India', region: 'South Asia' },
  { label: 'Karachi (PKT)', value: 'Asia/Karachi', country: 'Pakistan', region: 'South Asia' },
  { label: 'Lahore (PKT)', value: 'Asia/Karachi', country: 'Pakistan', region: 'South Asia' },
  { label: 'Dhaka (BST)', value: 'Asia/Dhaka', country: 'Bangladesh', region: 'South Asia' },
  { label: 'Colombo (SLST)', value: 'Asia/Colombo', country: 'Sri Lanka', region: 'South Asia' },
  { label: 'Kathmandu (NPT)', value: 'Asia/Kathmandu', country: 'Nepal', region: 'South Asia' },
  { label: 'Thimphu (BTT)', value: 'Asia/Thimphu', country: 'Bhutan', region: 'South Asia' },
  { label: 'Malé (MVT)', value: 'Indian/Maldives', country: 'Maldives', region: 'South Asia' },
  { label: 'Kabul (AFT)', value: 'Asia/Kabul', country: 'Afghanistan', region: 'South Asia' },

  // --- East Asia ---
  { label: 'Beijing (CST)', value: 'Asia/Shanghai', country: 'China', region: 'East Asia' },
  { label: 'Shanghai (CST)', value: 'Asia/Shanghai', country: 'China', region: 'East Asia' },
  { label: 'Hong Kong (HKT)', value: 'Asia/Hong_Kong', country: 'China (HK)', region: 'East Asia' },
  { label: 'Macau (CST)', value: 'Asia/Macau', country: 'China (Macau)', region: 'East Asia' },
  { label: 'Tokyo (JST)', value: 'Asia/Tokyo', country: 'Japan', region: 'East Asia' },
  { label: 'Osaka (JST)', value: 'Asia/Tokyo', country: 'Japan', region: 'East Asia' },
  { label: 'Seoul (KST)', value: 'Asia/Seoul', country: 'South Korea', region: 'East Asia' },
  { label: 'Pyongyang (KST)', value: 'Asia/Pyongyang', country: 'North Korea', region: 'East Asia' },
  { label: 'Taipei (CST)', value: 'Asia/Taipei', country: 'Taiwan', region: 'East Asia' },
  { label: 'Ulaanbaatar (ULAT/ULAST)', value: 'Asia/Ulaanbaatar', country: 'Mongolia', region: 'East Asia' },

  // --- Southeast Asia ---
  { label: 'Singapore (SGT)', value: 'Asia/Singapore', country: 'Singapore', region: 'Southeast Asia' },
  { label: 'Bangkok (ICT)', value: 'Asia/Bangkok', country: 'Thailand', region: 'Southeast Asia' },
  { label: 'Jakarta (WIB)', value: 'Asia/Jakarta', country: 'Indonesia', region: 'Southeast Asia' },
  { label: 'Bali (WITA)', value: 'Asia/Makassar', country: 'Indonesia', region: 'Southeast Asia' },
  { label: 'Manila (PST)', value: 'Asia/Manila', country: 'Philippines', region: 'Southeast Asia' },
  { label: 'Kuala Lumpur (MYT)', value: 'Asia/Kuala_Lumpur', country: 'Malaysia', region: 'Southeast Asia' },
  { label: 'Ho Chi Minh City (ICT)', value: 'Asia/Ho_Chi_Minh', country: 'Vietnam', region: 'Southeast Asia' },
  { label: 'Hanoi (ICT)', value: 'Asia/Ho_Chi_Minh', country: 'Vietnam', region: 'Southeast Asia' },
  { label: 'Yangon (MMT)', value: 'Asia/Yangon', country: 'Myanmar', region: 'Southeast Asia' },
  { label: 'Phnom Penh (ICT)', value: 'Asia/Phnom_Penh', country: 'Cambodia', region: 'Southeast Asia' },
  { label: 'Vientiane (ICT)', value: 'Asia/Vientiane', country: 'Laos', region: 'Southeast Asia' },
  { label: 'Bandar Seri Begawan (BNT)', value: 'Asia/Brunei', country: 'Brunei', region: 'Southeast Asia' },
  { label: 'Dili (TLT)', value: 'Asia/Dili', country: 'Timor-Leste', region: 'Southeast Asia' },

  // --- Oceania / Australia ---
  { label: 'Sydney (AEST/AEDT)', value: 'Australia/Sydney', country: 'Australia', region: 'Oceania' },
  { label: 'Melbourne (AEST/AEDT)', value: 'Australia/Melbourne', country: 'Australia', region: 'Oceania' },
  { label: 'Brisbane (AEST)', value: 'Australia/Brisbane', country: 'Australia', region: 'Oceania' },
  { label: 'Perth (AWST)', value: 'Australia/Perth', country: 'Australia', region: 'Oceania' },
  { label: 'Adelaide (ACST/ACDT)', value: 'Australia/Adelaide', country: 'Australia', region: 'Oceania' },
  { label: 'Darwin (ACST)', value: 'Australia/Darwin', country: 'Australia', region: 'Oceania' },
  { label: 'Hobart (AEST/AEDT)', value: 'Australia/Hobart', country: 'Australia', region: 'Oceania' },
  { label: 'Auckland (NZST/NZDT)', value: 'Pacific/Auckland', country: 'New Zealand', region: 'Oceania' },
  { label: 'Wellington (NZST/NZDT)', value: 'Pacific/Auckland', country: 'New Zealand', region: 'Oceania' },
  { label: 'Christchurch (NZST/NZDT)', value: 'Pacific/Auckland', country: 'New Zealand', region: 'Oceania' },
  { label: 'Suva (FJT/FJST)', value: 'Pacific/Fiji', country: 'Fiji', region: 'Oceania' },
  { label: 'Port Moresby (PGT)', value: 'Pacific/Port_Moresby', country: 'Papua New Guinea', region: 'Oceania' },
  { label: 'Nouméa (NCT)', value: 'Pacific/Noumea', country: 'New Caledonia', region: 'Oceania' },
  { label: 'Honolulu (HST)', value: 'Pacific/Honolulu', country: 'USA', region: 'Oceania' },

  // --- Africa ---
  { label: 'Cairo (EET/EEST)', value: 'Africa/Cairo', country: 'Egypt', region: 'Africa' },
  { label: 'Alexandria (EET/EEST)', value: 'Africa/Cairo', country: 'Egypt', region: 'Africa' },
  { label: 'Nairobi (EAT)', value: 'Africa/Nairobi', country: 'Kenya', region: 'Africa' },
  { label: 'Johannesburg (SAST)', value: 'Africa/Johannesburg', country: 'South Africa', region: 'Africa' },
  { label: 'Cape Town (SAST)', value: 'Africa/Johannesburg', country: 'South Africa', region: 'Africa' },
  { label: 'Lagos (WAT)', value: 'Africa/Lagos', country: 'Nigeria', region: 'Africa' },
  { label: 'Abuja (WAT)', value: 'Africa/Lagos', country: 'Nigeria', region: 'Africa' },
  { label: 'Accra (GMT)', value: 'Africa/Accra', country: 'Ghana', region: 'Africa' },
  { label: 'Casablanca (WET/WEST)', value: 'Africa/Casablanca', country: 'Morocco', region: 'Africa' },
  { label: 'Rabat (WET/WEST)', value: 'Africa/Casablanca', country: 'Morocco', region: 'Africa' },
  { label: 'Tunis (CET)', value: 'Africa/Tunis', country: 'Tunisia', region: 'Africa' },
  { label: 'Algiers (CET)', value: 'Africa/Algiers', country: 'Algeria', region: 'Africa' },
  { label: 'Addis Ababa (EAT)', value: 'Africa/Addis_Ababa', country: 'Ethiopia', region: 'Africa' },
  { label: 'Kampala (EAT)', value: 'Africa/Kampala', country: 'Uganda', region: 'Africa' },
  { label: 'Dar es Salaam (EAT)', value: 'Africa/Dar_es_Salaam', country: 'Tanzania', region: 'Africa' },
  { label: 'Lusaka (CAT)', value: 'Africa/Lusaka', country: 'Zambia', region: 'Africa' },
  { label: 'Harare (CAT)', value: 'Africa/Harare', country: 'Zimbabwe', region: 'Africa' },
  { label: 'Luanda (WAT)', value: 'Africa/Luanda', country: 'Angola', region: 'Africa' },
  { label: 'Maputo (CAT)', value: 'Africa/Maputo', country: 'Mozambique', region: 'Africa' },
  { label: 'Antananarivo (EAT)', value: 'Indian/Antananarivo', country: 'Madagascar', region: 'Africa' },
  { label: 'Dakar (GMT)', value: 'Africa/Dakar', country: 'Senegal', region: 'Africa' },
  { label: 'Abidjan (GMT)', value: 'Africa/Abidjan', country: 'Ivory Coast', region: 'Africa' },

  // --- Pacific Islands ---
  { label: 'Honolulu (HST)', value: 'Pacific/Honolulu', country: 'USA', region: 'Pacific' },
  { label: 'Papeete (TAHT)', value: 'Pacific/Tahiti', country: 'French Polynesia', region: 'Pacific' },
  { label: 'Nuku\'alofa (TOT)', value: 'Pacific/Tongatapu', country: 'Tonga', region: 'Pacific' },
  { label: 'Apia (WSST/WSDT)', value: 'Pacific/Apia', country: 'Samoa', region: 'Pacific' },
  { label: 'Majuro (MHT)', value: 'Pacific/Majuro', country: 'Marshall Islands', region: 'Pacific' },
  { label: 'Tarawa (GILT)', value: 'Pacific/Tarawa', country: 'Kiribati', region: 'Pacific' },
  { label: 'Port Vila (VUT)', value: 'Pacific/Efate', country: 'Vanuatu', region: 'Pacific' },
  { label: 'Honiara (SBT)', value: 'Pacific/Guadalcanal', country: 'Solomon Islands', region: 'Pacific' },
  { label: 'Palikir (PONT)', value: 'Pacific/Pohnpei', country: 'Micronesia', region: 'Pacific' },

  // --- Atlantic Islands ---
  { label: 'Reykjavik (GMT)', value: 'Atlantic/Reykjavik', country: 'Iceland', region: 'Atlantic' },
  { label: 'Saint Helena (GMT)', value: 'Atlantic/St_Helena', country: 'Saint Helena', region: 'Atlantic' },
  { label: 'South Georgia (GST)', value: 'Atlantic/South_Georgia', country: 'South Georgia', region: 'Atlantic' },
  { label: 'Cape Verde (CVT)', value: 'Atlantic/Cape_Verde', country: 'Cape Verde', region: 'Atlantic' },
  { label: 'Azores (AZOT/AZOST)', value: 'Atlantic/Azores', country: 'Portugal', region: 'Atlantic' },
  { label: 'Bermuda (AST/ADT)', value: 'Atlantic/Bermuda', country: 'Bermuda', region: 'Atlantic' },
  { label: 'Faroe Islands (WET/WEST)', value: 'Atlantic/Faroe', country: 'Faroe Islands', region: 'Atlantic' },
  { label: 'Madeira (WET/WEST)', value: 'Atlantic/Madeira', country: 'Portugal', region: 'Atlantic' },
  { label: 'Canary Islands (WET/WEST)', value: 'Atlantic/Canary', country: 'Spain', region: 'Atlantic' },

  // --- Indian Ocean ---
  { label: 'Mauritius (MUT)', value: 'Indian/Mauritius', country: 'Mauritius', region: 'Indian Ocean' },
  { label: 'Réunion (RET)', value: 'Indian/Reunion', country: 'Réunion', region: 'Indian Ocean' },
  { label: 'Seychelles (SCT)', value: 'Indian/Mahe', country: 'Seychelles', region: 'Indian Ocean' },
  { label: 'Comoros (EAT)', value: 'Indian/Comoro', country: 'Comoros', region: 'Indian Ocean' },
  { label: 'Mayotte (EAT)', value: 'Indian/Mayotte', country: 'Mayotte', region: 'Indian Ocean' },
  { label: 'Maldives (MVT)', value: 'Indian/Maldives', country: 'Maldives', region: 'Indian Ocean' },
  { label: 'Chagos (IOT)', value: 'Indian/Chagos', country: 'British Indian Ocean', region: 'Indian Ocean' },
  { label: 'Christmas Island (CXT)', value: 'Indian/Christmas', country: 'Christmas Island', region: 'Indian Ocean' },
  { label: 'Cocos Islands (CCT)', value: 'Indian/Cocos', country: 'Cocos Islands', region: 'Indian Ocean' },

  // --- Arctic & Antarctic ---
  { label: 'Longyearbyen (CET/CEST)', value: 'Arctic/Longyearbyen', country: 'Svalbard', region: 'Arctic' },
  { label: 'Troll Station (UTC)', value: 'Antarctica/Troll', country: 'Antarctica', region: 'Antarctic' },
  { label: 'McMurdo Station (NZST/NZDT)', value: 'Antarctica/McMurdo', country: 'Antarctica', region: 'Antarctic' },
  { label: 'Palmer Station (CLT/CLST)', value: 'Antarctica/Palmer', country: 'Antarctica', region: 'Antarctic' },
];

export default function WorldClockPage() {
  const [localTime, setLocalTime] = useState(new Date());
  const [clockType, setClockType] = useState('digital');
  const [hourHand, setHourHand] = useState(0);
  const [minuteHand, setMinuteHand] = useState(0);
  const [secondHand, setSecondHand] = useState(0);
  const [selectedTimeZones, setSelectedTimeZones] = useState(worldTimeZones.slice(0, 8));
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('light');
  const [showSeconds, setShowSeconds] = useState(true);
  const [timeFormat, setTimeFormat] = useState('24');
  const [viewMode, setViewMode] = useState('grid');
  const [filterRegion, setFilterRegion] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Effect for local clock and analog hands
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setLocalTime(now);

      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      setSecondHand(seconds * 6);
      setMinuteHand(minutes * 6 + seconds * 0.1);
      setHourHand((hours % 12) * 30 + minutes * 0.5);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, timeZone: string) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: showSeconds ? '2-digit' : undefined,
      hour12: timeFormat === '12',
    });
  };

  const formatDate = (date: Date, timeZone: string) => {
    return date.toLocaleDateString('en-US', {
      timeZone: timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTimezoneOffset = (timeZone: string) => {
    const date = new Date();
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));
    return (tzDate.getTime() - utcDate.getTime()) / (1000 * 60);
  };

  const formatOffset = (offset: number) => {
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset >= 0 ? '+' : '-';
    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const addTimezone = (timezone: any) => {
    if (!selectedTimeZones.find(tz => tz.value === timezone.value)) {
      setSelectedTimeZones(prev => [...prev, timezone]);
    }
  };

  const removeTimezone = (timezoneValue: string) => {
    setSelectedTimeZones(prev => prev.filter(tz => tz.value !== timezoneValue));
  };

  const toggleFavorite = (timezoneValue: string) => {
    setFavorites(prev => 
      prev.includes(timezoneValue) 
        ? prev.filter(tz => tz !== timezoneValue)
        : [...prev, timezoneValue]
    );
  };

  const regions = ['all', ...Array.from(new Set(worldTimeZones.map(tz => tz.region)))];
  
  const filteredTimeZones = worldTimeZones.filter(tz =>
    (tz.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tz.country.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filterRegion === 'all' || tz.region === filterRegion)
  ).sort((a, b) => {
    if (sortBy === 'name') return a.label.localeCompare(b.label);
    if (sortBy === 'offset') return getTimezoneOffset(a.value) - getTimezoneOffset(b.value);
    if (sortBy === 'region') return a.region.localeCompare(b.region);
    return 0;
  });

  const tutorials = {
    title: 'How to Use the World Clock',
    sections: [
      {
        title: 'Mastering Global Time Management',
        content: [
          'Our professional world clock tool provides comprehensive time tracking across global time zones, perfect for international business, remote teams, and travel planning.',
          '**Local Clock Features:**',
          'Toggle between elegant analog and precise digital displays. Customize time format (12/24 hour), show/hide seconds, and adjust visual themes for optimal viewing.',
          '',
          '**Global Time Zone Management:**',
          'Add and remove time zones from major international cities. Search through our extensive database of worldwide locations. Track multiple time zones simultaneously for efficient global coordination.',
          '',
          '**Advanced Business Features:**',
          'Calculate time differences between locations, view UTC offsets, and manage custom time zone lists for recurring international meetings and collaborations.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* --- World Clock Tool - MOVED TO TOP --- */}
      <div className="p-8 rounded-2xl border bg-card space-y-8 shadow-lg">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-foreground">
            World Clock
          </h1>
          <p className="text-2xl font-semibold text-muted-foreground">
            Real-Time Global Time Zone Tracker - 200+ Locations Worldwide
          </p>
        </div>

        {/* Enhanced Controls */}
        <div className="flex flex-wrap gap-4 justify-center p-4 bg-muted rounded-lg">
          <button
            onClick={() => setClockType('digital')}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
              clockType === 'digital'
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-foreground'
            }`}
          >
            <Zap className="h-4 w-4" />
            Digital
          </button>
          <button
            onClick={() => setClockType('analog')}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
              clockType === 'analog'
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-foreground'
            }`}
          >
            <Clock className="h-4 w-4" />
            Analog
          </button>
          <button
            onClick={() => setTimeFormat(timeFormat === '12' ? '24' : '12')}
            className="px-4 py-2 rounded-md text-sm font-medium bg-background text-foreground flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            {timeFormat}-Hour
          </button>
          <button
            onClick={() => setShowSeconds(!showSeconds)}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
              showSeconds ? 'bg-green-500 text-white' : 'bg-background text-foreground'
            }`}
          >
            {showSeconds ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            Seconds
          </button>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="px-4 py-2 rounded-md text-sm font-medium bg-background text-foreground flex items-center gap-2"
          >
            {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            Theme
          </button>
        </div>

        {/* Local Clock Section */}
        <div className="p-8 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 flex flex-col items-center space-y-6">
          {clockType === 'digital' ? (
            <div className="text-center">
              <p className="text-7xl font-bold font-mono text-foreground">
                {localTime.toLocaleTimeString('en-US', { 
                  hour12: timeFormat === '12',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: showSeconds ? '2-digit' : undefined
                })}
              </p>
              <p className="text-xl text-muted-foreground mt-4">
                {localTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          ) : (
            <div className="w-80 h-80 bg-background rounded-full border-8 border-foreground relative flex items-center justify-center shadow-2xl">
              {/* Clock face numbers */}
              {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, index) => (
                <span 
                  key={num}
                  className="absolute text-xl font-bold"
                  style={{
                    transform: `rotate(${index * 30}deg) translate(135px) rotate(-${index * 30}deg)`
                  }}
                >
                  {num}
                </span>
              ))}
              {/* Minute markers */}
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className={`absolute bottom-1/2 left-1/2 -ml-0.5 ${
                    i % 5 === 0 ? 'h-4 w-1 bg-foreground' : 'h-2 w-0.5 bg-muted-foreground'
                  }`}
                  style={{ transform: `rotate(${i * 6}deg) translateY(-150px)` }}
                />
              ))}
              {/* Center dot */}
              <div className="w-4 h-4 bg-foreground rounded-full z-20"></div>
              {/* Hour Hand */}
              <div
                className="w-3 h-20 bg-foreground absolute bottom-1/2 left-1/2 -ml-1.5 rounded-t-lg origin-bottom z-10"
                style={{ transform: `rotate(${hourHand}deg)` }}
              ></div>
              {/* Minute Hand */}
              <div
                className="w-2 h-32 bg-foreground absolute bottom-1/2 left-1/2 -ml-1 rounded-t-lg origin-bottom z-10"
                style={{ transform: `rotate(${minuteHand}deg)` }}
              ></div>
              {/* Second Hand */}
              <div
                className="w-1 h-36 bg-red-500 absolute bottom-1/2 left-1/2 -ml-0.5 rounded-t-full origin-bottom z-10"
                style={{ transform: `rotate(${secondHand}deg)` }}
              ></div>
            </div>
          )}
        </div>

        {/* Time Zone Management */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h3 className="text-2xl font-bold text-card-foreground">
              Global Time Zones ({worldTimeZones.length} Locations)
            </h3>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search 200+ time zones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border bg-background text-foreground w-64"
                />
              </div>
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="px-3 py-2 rounded-lg border bg-background text-foreground"
              >
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border bg-background text-foreground"
              >
                <option value="name">Sort by Name</option>
                <option value="offset">Sort by UTC Offset</option>
                <option value="region">Sort by Region</option>
              </select>
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="px-3 py-2 rounded-lg border bg-background text-foreground flex items-center gap-2"
              >
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                {viewMode === 'grid' ? 'List' : 'Grid'}
              </button>
            </div>
          </div>

          {/* Selected Time Zones */}
          <div className={`gap-4 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-3'}`}>
            {selectedTimeZones.map((tz) => (
              <div
                key={tz.value}
                className={`p-4 rounded-lg bg-background border hover:shadow-lg transition-shadow relative group ${
                  viewMode === 'list' ? 'flex justify-between items-center' : ''
                }`}
              >
                <button
                  onClick={() => removeTimezone(tz.value)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
                <button
                  onClick={() => toggleFavorite(tz.value)}
                  className="absolute -top-2 -left-2 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {favorites.includes(tz.value) ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
                </button>
                <div className={viewMode === 'list' ? 'flex-1' : ''}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{tz.label}</p>
                      <p className="text-sm text-muted-foreground">{tz.country} • {tz.region}</p>
                    </div>
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      {formatOffset(getTimezoneOffset(tz.value))}
                    </span>
                  </div>
                  <p className={`font-mono font-bold text-foreground ${viewMode === 'list' ? 'text-2xl' : 'text-2xl'}`}>
                    {formatTime(localTime, tz.value)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDate(localTime, tz.value)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Available Time Zones */}
          {searchQuery && (
            <div className="mt-6 p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-3">Available Time Zones ({filteredTimeZones.length})</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {filteredTimeZones
                  .filter(tz => !selectedTimeZones.find(selected => selected.value === tz.value))
                  .map((tz) => (
                    <button
                      key={tz.value}
                      onClick={() => addTimezone(tz)}
                      className="p-3 rounded-lg bg-background hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors text-left"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-foreground">{tz.label}</p>
                          <p className="text-sm text-muted-foreground">{tz.country} • {tz.region}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-muted px-2 py-1 rounded">
                            {formatOffset(getTimezoneOffset(tz.value))}
                          </span>
                          <Plus className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

  
      {/* --- Massive SEO Content Section --- */}
      <div className="p-8 rounded-2xl bg-muted/50 space-y-12">
        
        {/* --- SEO Intro Section --- */}
        <div className="bg-background border rounded-2xl p-8">
          <div className="prose prose-lg max-w-none text-foreground space-y-6">
            <h2 className="text-3xl font-bold text-foreground mb-6">Global Time Management Made Simple</h2>
            <p className="text-lg leading-relaxed">
              Welcome to the most comprehensive <strong>free online world clock</strong> available today. Our advanced <strong>global time zone tracker</strong> provides real-time synchronization with atomic clocks, ensuring absolute accuracy for <strong>international business operations</strong>, remote team coordination, and global travel planning. Unlike basic <strong>world clock tools</strong>, our platform offers professional-grade features including <strong>multiple time zone displays</strong>, customizable analog and digital clocks, and an extensive database of worldwide locations.
            </p>
            <p className="text-lg leading-relaxed">
              Managing <strong>global business hours</strong> has never been easier. Our <strong>world clock application</strong> automatically adjusts for Daylight Saving Time (DST) changes across different regions, eliminating the confusion of manual calculations. Whether you're scheduling <strong>international conference calls</strong>, coordinating with <strong>remote team members</strong> across continents, or planning overseas travel, our <strong>comprehensive time zone converter</strong> provides the precision and reliability that professionals demand. The intuitive interface allows you to track <strong>multiple global locations</strong> simultaneously while maintaining a clear overview of <strong>time differences between cities</strong>.
            </p>
            <p className="text-lg leading-relaxed">
              Experience the power of <strong>enterprise-level time management</strong> with our free tool that combines <strong>accurate world time synchronization</strong> with user-friendly design. From <strong>real-time global clock displays</strong> to detailed <strong>time zone offset calculations</strong>, every feature is designed to streamline your <strong>international scheduling workflow</strong> and enhance your <strong>global business communications</strong>.
            </p>
          </div>
        </div>

        {/* --- Blog Section --- */}
        <div className="bg-background border rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-foreground flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            World Clock Resources & Best Practices
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Optimizing Global Team Collaboration</h3>
              <div className="prose prose-lg max-w-none text-foreground space-y-4">
                <p>Effective <strong>international team management</strong> requires precise <strong>time zone coordination</strong>. Our world clock tool helps remote teams establish <strong>optimal meeting times</strong> that respect everyone's <strong>local business hours</strong>. By visualizing <strong>multiple time zones simultaneously</strong>, teams can identify <strong>overlapping working hours</strong> and schedule meetings during <strong>mutually convenient time slots</strong>.</p>
                
                <p>For businesses operating across <strong>different global regions</strong>, understanding <strong>time zone differences</strong> is crucial for <strong>customer service operations</strong> and <strong>international client communications</strong>. Our tool provides <strong>accurate time calculations</strong> that help maintain <strong>professional response times</strong> and manage <strong>global customer expectations</strong> effectively.</p>

                <p>The <strong>advanced world clock features</strong> including <strong>custom time zone lists</strong> and <strong>quick search functionality</strong> make it easy to manage <strong>recurring international meetings</strong> and maintain <strong>consistent global operations</strong> across multiple time zones.</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Time Zone Management Strategies</h3>
              <div className="prose prose-lg max-w-none text-foreground space-y-4">
                <p>Mastering <strong>global time zone management</strong> involves more than just knowing the current time in different locations. It requires understanding <strong>time zone boundaries</strong>, <strong>daylight saving transitions</strong>, and <strong>regional time conventions</strong>. Our world clock provides <strong>comprehensive time zone data</strong> that includes <strong>DST adjustment awareness</strong> and <strong>UTC offset displays</strong>.</p>

                <p>For <strong>international business travelers</strong>, our tool offers <strong>essential time planning capabilities</strong> that help avoid <strong>scheduling conflicts</strong> and ensure <strong>timely communications</strong> with home offices. The ability to track <strong>multiple destination times</strong> simultaneously makes <strong>international trip planning</strong> more efficient and less stressful.</p>

                <p>Large organizations benefit from using our <strong>professional world clock</strong> for <strong>enterprise-wide time coordination</strong>. From <strong>manufacturing plants</strong> operating in different regions to <strong>global customer support centers</strong>, maintaining <strong>synchronized operations</strong> across time zones is essential for <strong>business continuity</strong> and <strong>operational efficiency</strong>.</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- FAQ Section --- */}
        <div className="bg-background border rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-foreground flex items-center gap-3">
            <Globe className="h-8 w-8 text-primary" />
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold mb-3">How accurate is the world clock?</h3>
              <p className="text-foreground">Our <strong>world clock synchronization</strong> is extremely accurate, updating in real-time and accounting for <strong>daylight saving changes</strong> automatically. The time displayed is synchronized with reliable time servers to ensure <strong>precise global time tracking</strong> for all your <strong>international business needs</strong>.</p>
            </div>

            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold mb-3">Can I add custom time zones?</h3>
              <p className="text-foreground">Yes, our <strong>comprehensive world clock</strong> allows you to add and manage custom time zones from our extensive database. You can search for specific cities or countries and add them to your <strong>personalized time zone list</strong> for easy <strong>global time management</strong>.</p>
            </div>

            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold mb-3">Does the clock adjust for Daylight Saving Time?</h3>
              <p className="text-foreground">Absolutely. Our <strong>advanced world clock system</strong> automatically adjusts for <strong>Daylight Saving Time changes</strong> in all supported regions. This ensures you always see the correct <strong>local time worldwide</strong> without manual adjustments for <strong>seasonal time changes</strong>.</p>
            </div>

            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold mb-3">How many time zones can I track simultaneously?</h3>
              <p className="text-foreground">You can track unlimited time zones with our <strong>professional world clock tool</strong>. The interface is designed to handle <strong>multiple global locations</strong> efficiently, making it perfect for businesses with <strong>international operations</strong> or individuals managing <strong>global communications</strong>.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Is this world clock free to use?</h3>
              <p className="text-foreground">Yes, our <strong>comprehensive world clock service</strong> is completely free with no registration required. You get access to all features including <strong>multiple time zone tracking</strong>, <strong>customizable displays</strong>, and <strong>advanced search functionality</strong> without any limitations.</p>
            </div>
          </div>
        </div>

        {/* --- Industry Applications --- */}
        <div className="bg-background border rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Professional Applications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg">
              <Globe className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg mb-2">International Business</h3>
              <p className="text-sm text-foreground">Coordinate global teams, schedule international meetings, and manage worldwide operations with precise time zone tracking.</p>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg">
              <MapPin className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-lg mb-2">Travel & Tourism</h3>
              <p className="text-sm text-foreground">Plan international trips, coordinate flight schedules, and manage hotel bookings across different time zones.</p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-lg">
              <Clock className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-lg mb-2">Remote Teams</h3>
              <p className="text-sm text-foreground">Manage distributed teams across continents with synchronized scheduling and coordinated working hours.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Tools Grid --- */}
      <div className="p-8 rounded-2xl bg-primary/10 border border-primary/20">
        <h3 className="text-2xl font-semibold mb-6 text-center">Explore More Time Management Tools</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
          <a href="/time-zone-converter" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors">
            Time Zone Converter
          </a>
          <a href="/meeting-planner" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors">
            Meeting Planner
          </a>
          <a href="/countdown-timer" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors">
            Countdown Timer
          </a>
          <a href="/stopwatch" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors">
            Stopwatch
          </a>
          <a href="/age-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors">
            Age Calculator
          </a>
          <a href="/date-calculator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors">
            Date Calculator
          </a>
        </div>
      </div>
    </div>
  );
}