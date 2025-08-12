import { useNavigate } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import hero from "@/assets/fintrans-hero.jpg";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[calc(100svh-56px)] grid place-items-center">
      <SEO title="FinTrans – Finance Transformation Tracker" description="Plan, track, and analyze finance transformation projects with variance insights and reports." canonical="/" />
      <header className="max-w-5xl mx-auto grid gap-6 text-center">
        <img src={hero} alt="FinTrans finance analytics hero" className="w-full rounded-xl shadow-[var(--shadow-elevated)]" loading="lazy" />
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Finance Transformation Tracker & Analytics</h1>
        <p className="text-lg text-muted-foreground">
          Plan projects, parse financials, detect variance, manage SOPs, and export executive-ready reports — all in one place.
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="hero" onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
          <Button variant="outline" onClick={() => navigate("/upload")}>Upload Financials</Button>
        </div>
      </header>
    </div>
  );
};

export default Index;
