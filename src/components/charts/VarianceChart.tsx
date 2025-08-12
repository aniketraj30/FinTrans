import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "Jan", revenue: 180, budget: 170 },
  { month: "Feb", revenue: 195, budget: 180 },
  { month: "Mar", revenue: 210, budget: 205 },
  { month: "Apr", revenue: 205, budget: 215 },
  { month: "May", revenue: 220, budget: 225 },
  { month: "Jun", revenue: 235, budget: 230 },
];

export default function VarianceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue vs Budget</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="budget" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
