import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const kpis = [
  { label: "Revenue", value: "₹2.4Cr", delta: "+8.2% MoM" },
  { label: "Net Profit Margin", value: "14.8%", delta: "+1.1pp" },
  { label: "ROA", value: "9.4%", delta: "+0.6pp" },
  { label: "Variance (Actual vs Budget)", value: "-3.1%", delta: "Within threshold" },
];

export default function KpiCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((k) => (
        <Card key={k.label} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">{k.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{k.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{k.delta}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
