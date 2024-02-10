import React, { useEffect, useState } from 'react';

export default function ProgressBar({ 
  value = 0, 
  bgColor = "bg-blue-50", 
  progressColor = 'bg-blue-500',
  className ="",
  showParcentage = true
}) {
  const [parcent, setParcent] = useState(value);
  useEffect(() => {
    setParcent(Math.min(100, Math.max(0, value)))
  }, [value]);
  return (
    <div className={`w-full  rounded-md text-center h-4 ${bgColor} relative ${className}`}>
      {
        showParcentage && (
            <span className="absolute text-sm top-1/2 transform -translate-y-1/2">
              {parcent} %
            </span>
        )
      }
      <div
        className={`${progressColor}  h-full rounded-md`}
        style={{ width: `${parcent}%` }}
      ></div>
    </div>
  );
}
