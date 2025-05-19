"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Label } from "recharts"
import { ChartConfig, ChartContainer } from "./ui/chart"

const chartData = [
  { month: "10th", desktop: 186, mobile: 80 },
  { month: "25th", desktop: 305, mobile: 200 },
  { month: "50th", desktop: 237, mobile: 120 },
  { month: "75th", desktop: 73, mobile: 190 },
  { month: "90th", desktop: 209, mobile: 130 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function ChartComponent() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month">
          <Label value="Months" offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label value="Visits" angle={-90} position="insideLeft" />
        </YAxis>
        {/* <Tooltip />
        <Legend /> */}
        <Bar dataKey="desktop" fill="#2563eb" radius={4} />
        {/* <Bar dataKey="mobile" fill="#60a5fa" radius={4} /> */}
      </BarChart>
    </ChartContainer>
  )
}
