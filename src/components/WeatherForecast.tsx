import React from 'react';
import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, CloudDrizzle, Thermometer, Wind, Droplets } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for tailwind classes */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface WeatherDay {
  date: string;
  high: number;
  low: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'foggy' | 'stormy' | 'drizzle';
  description: string;
  humidity: number;
  windSpeed: number;
}

export interface WeatherForecastProps {
  location: string;
  data: WeatherDay[];
  unit?: 'C' | 'F';
  className?: string;
}

const WeatherIcon = ({ condition, className }: { condition: WeatherDay['condition']; className?: string }) => {
  switch (condition) {
    case 'sunny': return <Sun className={cn("text-yellow-400", className)} />;
    case 'cloudy': return <Cloud className={cn("text-gray-400", className)} />;
    case 'rainy': return <CloudRain className={cn("text-blue-400", className)} />;
    case 'snowy': return <CloudSnow className={cn("text-blue-100", className)} />;
    case 'foggy': return <CloudFog className={cn("text-gray-300", className)} />;
    case 'stormy': return <CloudLightning className={cn("text-purple-400", className)} />;
    case 'drizzle': return <CloudDrizzle className={cn("text-blue-300", className)} />;
    default: return <Sun className={cn("text-yellow-400", className)} />;
  }
};

export const WeatherForecast: React.FC<WeatherForecastProps> = ({
  location,
  data,
  unit = 'C',
  className
}) => {
  const [selectedDay, setSelectedDay] = React.useState<number>(0);
  const current = data[selectedDay];

  const formatDate = (dateStr: string, options: Intl.DateTimeFormatOptions) => {
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  return (
    <div className={cn("flex flex-col w-full h-full min-h-[500px] bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800", className)}>
      {/* Current Weather / Header */}
      <div className="flex-[2] bg-gradient-to-br from-blue-500 to-blue-700 p-8 text-white relative overflow-hidden flex flex-col justify-center items-center text-center">
        <div className="relative z-10 flex flex-col h-full justify-between items-center w-full max-w-2xl">
          <div className="space-y-1">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{location}</h2>
            <p className="text-blue-100 text-xl">{formatDate(current.date, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <WeatherIcon condition={current.condition} className="w-28 h-28" />
              <div className="flex items-baseline gap-2">
                <span className="text-8xl md:text-9xl font-bold leading-none">{current.high}°</span>
                <span className="text-blue-200 text-3xl">/ {current.low}°{unit}</span>
              </div>
            </div>
            <p className="text-3xl font-medium capitalize text-blue-50">{current.description}</p>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-8 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 w-full sm:w-fit">
            <div className="flex flex-col items-center text-center gap-2">
              <Droplets className="text-blue-200 w-6 h-6" />
              <div>
                <p className="text-[10px] text-blue-100 uppercase font-bold tracking-widest">Humidity</p>
                <p className="text-xl font-bold">{current.humidity}%</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Wind className="text-blue-200 w-6 h-6" />
              <div>
                <p className="text-[10px] text-blue-100 uppercase font-bold tracking-widest">Wind</p>
                <p className="text-xl font-bold">{current.windSpeed} km/h</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Thermometer className="text-blue-200 w-6 h-6" />
              <div>
                <p className="text-[10px] text-blue-100 uppercase font-bold tracking-widest">Feels Like</p>
                <p className="text-xl font-bold">{current.high - 2}°</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px]" />
      </div>

      {/* 7-Day List */}
      <div className="bg-slate-900 p-6 md:p-10 overflow-x-auto">
        <div className="flex gap-4 min-w-max md:min-w-0 md:grid md:grid-cols-7">
          {data.map((day, idx) => (
            <button
              key={day.date}
              onClick={() => setSelectedDay(idx)}
              className={cn(
                "flex flex-col items-center p-6 rounded-2xl transition-all duration-300 min-w-[120px] md:min-w-0 border border-transparent",
                selectedDay === idx 
                  ? "bg-slate-800/50 border-slate-700 shadow-lg scale-110 z-10" 
                  : "hover:bg-slate-800/30 text-slate-400 hover:text-slate-200"
              )}
            >
              <span className="text-sm font-bold uppercase tracking-wider mb-4">
                {formatDate(day.date, { weekday: 'short' })}
              </span>
              <WeatherIcon condition={day.condition} className="w-10 h-10 mb-4" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl font-bold text-white">{day.high}°</span>
                <span className="text-sm font-medium text-slate-500">{day.low}°</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
