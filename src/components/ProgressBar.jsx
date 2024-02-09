import React, { useEffect, useState } from 'react';

export default function ProgressBar({ value = 0 }) {
  const [parcent, setParcent] = useState(value);
  useEffect(() => {
    setParcent(Math.min(100, Math.max(0, value)))
  }, [value]);
  return (
    <div className="border border-gray rounded-md text-center h-5 bg-blue-50 relative">
      <span className="absolute text-sm top-1/2 transform -translate-y-1/2">
        {parcent} %
      </span>
      <div
        className={`bg-blue-500  h-full rounded-md`}
        style={{ width: `${parcent}%` }}
      ></div>
    </div>
  );
}
