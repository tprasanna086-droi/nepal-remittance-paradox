"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface YieldChartProps {
  district: string;
}

const mockData = [
  { year: 2015, yield: 3.2, remittance: 28 },
  { year: 2016, yield: 3.4, remittance: 30 },
  { year: 2017, yield: 3.1, remittance: 33 },
  { year: 2018, yield: 3.5, remittance: 31 },
  { year: 2019, yield: 3.3, remittance: 35 },
  { year: 2020, yield: 3.6, remittance: 38 },
  { year: 2021, yield: 3.4, remittance: 40 },
  { year: 2022, yield: 3.7, remittance: 42 },
];

export default function YieldChart({ district }: YieldChartProps) {
  const label = district.charAt(0).toUpperCase() + district.slice(1);

  return (
    <div className="w-full h-[400px]">
      <p className="text-slate-400 text-xs mb-2">
        Yield &amp; remittance trends — {label}
      </p>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="yield"
            stroke="#16a34a"
            name="Yield (t/ha)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="remittance"
            stroke="#d97706"
            name="Remittance (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
