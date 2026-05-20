"use client";

import { useState, useEffect } from "react";
import { intervalToDuration, type Duration } from "date-fns";

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [duration, setDuration] = useState<Duration | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (now >= targetDate) {
        clearInterval(timer);
        setDuration({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setDuration(intervalToDuration({ start: now, end: targetDate }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!duration) return <div className="h-10 w-full bg-muted animate-pulse rounded-sm" />;

  const items = [
    { label: "D", value: duration.days ?? 0 },
    { label: "H", value: duration.hours ?? 0 },
    { label: "M", value: duration.minutes ?? 0 },
    { label: "S", value: duration.seconds ?? 0 },
  ];

  return (
    <div className="flex gap-4">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="text-3xl font-black italic tracking-tighter tabular-nums">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-primary">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
