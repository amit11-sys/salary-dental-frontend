import { BarChart, Bar, ResponsiveContainer, LabelList } from 'recharts';

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f7f'];

export default function MiniBarChart({ data }: { data: { name: string, value: number }[] }) {
  return (
    <div style={{ width: '100%', height: 120 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, bottom: 20 }}
          barCategoryGap={30}
        >
          {data.map((entry, index) => (
            <Bar
              key={index}
              dataKey="value"
              data={[entry]}
              fill={colors[index % colors.length]}
              barSize={40}
              xAxisId="0"
            >
              <LabelList
                dataKey="value"
                position="top"
                style={{ fill: '#000', fontSize: 12 }}
              />
              <LabelList
                dataKey="name"
                position="bottom"
                style={{ fill: '#000', fontSize: 12 }}
              />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
