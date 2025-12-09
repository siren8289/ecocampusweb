import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { RSSIDataPoint } from '../../../utils/mockData';

interface RSSIGraphProps {
  data: RSSIDataPoint[];
  threshold: number;
}

export function RSSIGraph({ data, threshold }: RSSIGraphProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="time" 
          tick={{ fontSize: 12 }}
          interval="preserveStartEnd"
        />
        <YAxis 
          label={{ value: 'RSSI (dBm)', angle: -90, position: 'insideLeft' }}
          domain={[-100, -40]}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' }}
          formatter={(value: any) => `${value.toFixed(1)} dBm`}
        />
        <Legend />
        <ReferenceLine 
          y={threshold} 
          stroke="#ef4444" 
          strokeDasharray="5 5" 
          label={{ value: '임계값', position: 'right', fill: '#ef4444' }}
        />
        <Line 
          type="monotone" 
          dataKey="beacon1" 
          stroke="#81D18A" 
          name="Beacon 1"
          dot={false}
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="beacon2" 
          stroke="#6BBF76" 
          name="Beacon 2"
          dot={false}
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="beacon3" 
          stroke="#FFE48A" 
          name="Beacon 3"
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}