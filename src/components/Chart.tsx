"use client"

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
} from "recharts"
import { ChartConfig, ChartContainer } from "./ui/chart"

type Props = {
  percentiles: {
    p10: number
    p25: number
    p50: number
    p75: number
    p90: number
  } | null // or `undefined`
}

const chartConfig = {
  desktop: {
    label: "Salary",
    color: "#2563eb",
  },
} satisfies ChartConfig

export function ChartComponent({ percentiles }: Props) {
  console.log(percentiles);
  
    if (!percentiles) return <div>Loading chart...</div>;
  const chartData = [
    { month: "10th", desktop: percentiles.p10 },
    { month: "25th", desktop: percentiles.p25 },
    { month: "50th", desktop: percentiles.p50 },
    { month: "75th", desktop: percentiles.p75 },
    { month: "90th", desktop: percentiles.p90 },
  ]

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month">
          <Label value="Percentiles" offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label value="Salary ($)" angle={-90} position="insideLeft" />
        </YAxis>
        <Bar dataKey="desktop" fill="#2563eb" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
