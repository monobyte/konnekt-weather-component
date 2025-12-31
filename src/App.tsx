import React, { useState } from 'react';
import { WeatherForecast, WeatherDay } from './components/WeatherForecast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './shadcn/ui/select';

const MOCK_WEATHER_DATA: WeatherDay[] = [
  { date: '2024-05-20', high: 24, low: 18, condition: 'sunny', description: 'Sunny and bright', humidity: 45, windSpeed: 12 },
  { date: '2024-05-21', high: 22, low: 17, condition: 'cloudy', description: 'Partly cloudy', humidity: 55, windSpeed: 8 },
  { date: '2024-05-22', high: 19, low: 15, condition: 'rainy', description: 'Light showers', humidity: 85, windSpeed: 15 },
  { date: '2024-05-23', high: 21, low: 16, condition: 'stormy', description: 'Thunderstorms', humidity: 90, windSpeed: 25 },
  { date: '2024-05-24', high: 18, low: 14, condition: 'foggy', description: 'Foggy morning', humidity: 95, windSpeed: 5 },
  { date: '2024-05-25', high: 23, low: 17, condition: 'drizzle', description: 'Misting rain', humidity: 70, windSpeed: 10 },
  { date: '2024-05-26', high: 26, low: 19, condition: 'sunny', description: 'Clear sky', humidity: 40, windSpeed: 14 },
];

function App() {
  return (
    <div className="w-full h-full bg-slate-100 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-5xl h-full flex items-center justify-center">
        <WeatherForecast 
          location="San Francisco, CA" 
          data={MOCK_WEATHER_DATA}
          unit="C"
        />
      </div>
    </div>
  );
}

export default App;
