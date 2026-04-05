import React from 'react';

export const UCBLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 500 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="250" cy="250" r="240" fill="#0A2647" />
    <path d="M250 100L100 180V320L250 400L400 320V180L250 100Z" fill="white" fillOpacity="0.1" />
    <path d="M250 120L130 185V315L250 380L370 315V185L250 120Z" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M250 160L180 200V280L250 320L320 280V200L250 160Z" fill="white" />
    <rect x="245" y="200" width="10" height="120" fill="#0A2647" />
    <path d="M180 240H320" stroke="#0A2647" strokeWidth="10" />
    <text x="250" y="440" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold" fontFamily="sans-serif">UCB</text>
  </svg>
);
