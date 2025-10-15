'use client';

import React from 'react';

interface ScoreCardProps {
  title: string;
  score: number;
  grade: string;
  icon: React.ElementType;
  colorClass: string;
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-accent'; // Emerald
  if (score >= 80) return 'text-amber-400';
  if (score >= 60) return 'text-orange-400';
  return 'text-rose-400';
};

const getScoreBg = (score: number) => {
  if (score >= 90) return 'bg-emerald-400/20';
  if (score >= 80) return 'bg-amber-400/20';
  if (score >= 60) return 'bg-orange-400/20';
  return 'bg-rose-400/20';
};

const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, grade, icon: Icon, colorClass }) => (
  <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 flex flex-col items-center text-center shadow-2xl hover:border-primary/50 transition-all duration-300">
    <Icon className={`w-10 h-10 mb-3 ${colorClass}`} />
    <h3 className="text-xl font-bold text-gray-200 mb-4 font-headline">{title}</h3>
    <div className={`${getScoreBg(score)} rounded-xl p-5 w-full`}>
      <span className={`text-5xl font-extrabold ${getScoreColor(score)}`}>
        {score}<span className="text-4xl">%</span>
      </span>
      <p className="text-sm font-medium text-gray-400 mt-1">Grade: {grade}</p>
    </div>
  </div>
);

export default ScoreCard;
