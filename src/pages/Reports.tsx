import { useRef } from "react";
import SEO from "@/components/seo/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export default function Reports() {
  const reportRef = useRef<HTMLDivElement>(null);

  const sample = [
    { metric: "Revenue", value: 2400000 },
    { metric: "Net Profit", value: 355000 },
    { metric: "NPM", value: 0.148 },
    { metric: "ROA", value: 0.094 },
  ];

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sample);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, "fintrans-report.xlsx");
  };

  const exportPDF = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 80;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.text("FinTrans Report", 40, 40);
    pdf.addImage(imgData, "PNG", 40, 60, imgWidth, Math.min(imgHeight, pageHeight - 100));
    pdf.save("fintrans-report.pdf");
  };

  return (
    <div className="space-y-6">
      <SEO title="Reports – FinTrans" description="Download Excel or PDF reports for executives and teams." canonical="/reports" />
      <h1 className="sr-only">Reports</h1>

      <Card>
        <CardHeader>
          <CardTitle>Export</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant="hero" onClick={exportExcel}>Download Excel</Button>
          <Button variant="outline" onClick={exportPDF}>Download PDF</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={reportRef} className="space-y-2">
            <div className="text-lg font-semibold">FinTrans Executive Summary</div>
            <ul className="text-sm list-disc pl-5">
              {sample.map((s) => (
                <li key={s.metric}>
                  {s.metric}: {typeof s.value === "number" ? s.value.toLocaleString() : String(s.value)}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
