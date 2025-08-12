import SEO from "@/components/seo/SEO";
import KpiCards from "@/components/charts/KpiCards";
import VarianceChart from "@/components/charts/VarianceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <SEO
        title="Dashboard – FinTrans"
        description="KPIs, variance insights, and project progress for finance transformation."
        canonical="/dashboard"
      />
      <h1 className="sr-only">FinTrans Dashboard</h1>
      <KpiCards />
      <VarianceChart />
      <Card>
        <CardHeader>
          <CardTitle>Open Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <li>ERP Upgrade – Phase 2</li>
            <li>Close Acceleration</li>
            <li>AP Automation</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
