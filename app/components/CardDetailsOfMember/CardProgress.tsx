import React from 'react';

interface CardProgressProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  total: number;
  color: string; // tailwind color e.g. 'purple', 'green', 'yellow', 'red'
}

const CardProgress: React.FC<CardProgressProps> = ({ title, icon, value, total, color }) => {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className={`bg-${color}-50 p-6 rounded-xl flex flex-col gap-3 shadow-sm`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-${color}-600 text-xl`}>{icon}</span>
        <span className={`font-semibold text-lg text-${color}-900`}>{title}</span>
      </div>
      <div className={`w-full bg-${color}-100 rounded-full h-3`}>
        <div
          className={`bg-gradient-to-r from-${color}-400 to-${color}-600 h-3 rounded-full transition-all duration-300`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className={`flex justify-between text-sm text-${color}-700`}>
        <span>{value} / {total}</span>
        <span>{percent}%</span>
      </div>
    </div>
  );
};

export default CardProgress;