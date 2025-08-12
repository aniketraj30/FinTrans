import { useState } from "react";
import SEO from "@/components/seo/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface SopVersion { version: number; content: string; at: string }
interface Sop { id: string; title: string; versions: SopVersion[] }

export default function SOPs() {
  const [sops, setSops] = useState<Sop[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addSop = () => {
    if (!title.trim() || !content.trim()) return;
    const now = new Date().toISOString();
    const sop: Sop = { id: crypto.randomUUID(), title, versions: [{ version: 1, content, at: now }] };
    setSops((list) => [sop, ...list]);
    setTitle("");
    setContent("");
  };

  const download = (sop: Sop) => {
    const latest = sop.versions[0];
    const blob = new Blob([latest.content], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${sop.title.replace(/\s+/g, "-")}-v${latest.version}.md`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="space-y-6">
      <SEO title="SOPs – FinTrans" description="Create, edit, and version-control finance SOPs with quick downloads." canonical="/sops" />
      <h1 className="sr-only">SOP Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>New SOP</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea placeholder="Content (Markdown supported)" value={content} onChange={(e) => setContent(e.target.value)} />
          <div>
            <Button variant="hero" onClick={addSop}>Save SOP</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {sops.map((sop) => (
          <Card key={sop.id}>
            <CardHeader>
              <CardTitle>{sop.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">Versions: {sop.versions.length}</div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => download(sop)}>Download</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
