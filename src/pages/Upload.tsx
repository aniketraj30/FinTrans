import { useMemo, useState } from "react";
import SEO from "@/components/seo/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as XLSX from "xlsx";

interface Row { [key: string]: string | number }

export default function Upload() {
  const [rows, setRows] = useState<Row[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const metrics = useMemo(() => {
    if (!rows.length) return null;
    // Try to infer common column names
    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");
    const first = rows[0];
    const keys = Object.keys(first);
    const get = (row: Row, names: string[]) => {
      const k = keys.find((k) => names.includes(normalize(k)));
      const v = k ? Number(row[k]) : NaN;
      return isFinite(v) ? v : NaN;
    };

    const revNames = ["revenue", "sales", "turnover"];
    const niNames = ["netincome", "profit", "earnings"];
    const assetsNames = ["totalassets", "assets"];
    const expNames = ["expenses", "opex", "costs"];

    const latest = rows[rows.length - 1];
    const prev = rows[rows.length - 2] ?? latest;

    const revenue = get(latest, revNames);
    const netIncome = get(latest, niNames);
    const assets = get(latest, assetsNames);
    const expenses = get(latest, expNames);
    const revenuePrev = get(prev, revNames);

    const netProfitMargin = isFinite(netIncome) && isFinite(revenue) && revenue !== 0 ? (netIncome / revenue) * 100 : NaN;
    const roa = isFinite(netIncome) && isFinite(assets) && assets !== 0 ? (netIncome / assets) * 100 : NaN;
    const revGrowth = isFinite(revenue) && isFinite(revenuePrev) && revenuePrev !== 0 ? ((revenue - revenuePrev) / revenuePrev) * 100 : NaN;
    const expenseRatio = isFinite(expenses) && isFinite(revenue) && revenue !== 0 ? (expenses / revenue) * 100 : NaN;

    // Variance simple template commentary
    const commentary: string[] = [];
    if (isFinite(revGrowth)) {
      commentary.push(`Revenue ${revGrowth >= 0 ? "increased" : "declined"} by ${Math.abs(revGrowth).toFixed(1)}% vs prior period.`);
    }
    if (isFinite(expenseRatio) && expenseRatio > 50) commentary.push("Operating expenses represent over 50% of revenue; monitor spend drivers.");
    if (isFinite(netProfitMargin)) commentary.push(`Net profit margin ${netProfitMargin >= 0 ? "at" : "is negative at"} ${netProfitMargin.toFixed(1)}%.`);

    return { revenue, netIncome, assets, expenses, netProfitMargin, roa, revGrowth, expenseRatio, commentary };
  }, [rows]);

  const onFile = async (file: File) => {
    setFileName(file.name);
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data, { type: "array" });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json<Row>(sheet);
    setRows(json);
  };

  return (
    <div className="space-y-6">
      <SEO title="Upload Financials – FinTrans" description="Parse Excel/CSV statements and compute KPIs automatically." canonical="/upload" />
      <h1 className="sr-only">Financial Statement Parser</h1>

      <Card>
        <CardHeader>
          <CardTitle>Upload Excel/CSV</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Input type="file" accept=".xlsx,.xls,.csv" onChange={(e) => e.target.files && onFile(e.target.files[0])} />
          {fileName && <div className="text-sm text-muted-foreground">Loaded: {fileName}</div>}
        </CardContent>
      </Card>

      {rows.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Metric label="Revenue" value={metrics?.revenue} isCurrency />
              <Metric label="Net Profit Margin" value={metrics?.netProfitMargin} suffix="%" />
              <Metric label="ROA" value={metrics?.roa} suffix="%" />
              <Metric label="Revenue Growth" value={metrics?.revGrowth} suffix="%" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Automated Commentary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-disc pl-5 text-sm">
                {metrics?.commentary.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
              <div className="text-xs text-muted-foreground">
                For AI-grade narratives (OpenAI/spaCy), connect Supabase and add your API key to an Edge Function.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parsed Table (first sheet)</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="min-w-[720px] w-full text-sm">
                <thead>
                  <tr>
                    {Object.keys(rows[0]).map((k) => (
                      <th key={k} className="text-left border-b py-2 pr-4 font-medium">{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="border-b last:border-0">
                      {Object.keys(rows[0]).map((k) => (
                        <td key={k} className="py-2 pr-4">{String(r[k] ?? "")}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function Metric({ label, value, suffix = "", isCurrency = false }: { label: string; value: number | undefined; suffix?: string; isCurrency?: boolean }) {
  const formatted = isCurrency && typeof value === "number"
    ? value.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    : typeof value === "number" && isFinite(value)
    ? `${value.toFixed(1)}${suffix}`
    : "—";
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-xl font-semibold">{formatted}</div>
    </div>
  );
}
