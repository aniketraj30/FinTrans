import { useMemo, useState } from "react";
import SEO from "@/components/seo/SEO";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GanttLite from "@/components/projects/GanttLite";
import { format } from "date-fns";

let id = 0;
const genId = () => `${++id}`;

export default function Projects() {
  const [tasks, setTasks] = useState([
    { id: genId(), name: "Scoping & Design", start: "2025-08-01", end: "2025-09-15", owner: "PMO" },
    { id: genId(), name: "Build & Configure", start: "2025-09-16", end: "2025-11-30", owner: "Tech" },
    { id: genId(), name: "UAT & Training", start: "2025-12-01", end: "2026-01-20", owner: "Finance" },
  ]);

  const [newTask, setNewTask] = useState({ name: "", start: "", end: "", owner: "Finance" });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<{ text: string; at: string }[]>([]);

  const period = useMemo(() => {
    const s = tasks.map((t) => t.start).sort()[0];
    const e = tasks.map((t) => t.end).sort().slice(-1)[0];
    return `${format(new Date(s), "MMM d, yyyy")} – ${format(new Date(e), "MMM d, yyyy")}`;
  }, [tasks]);

  return (
    <div className="space-y-6">
      <SEO title="Projects – FinTrans" description="Plan milestones, assign tasks, track progress with a timeline." canonical="/projects" />
      <h1 className="sr-only">Projects</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create Task</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <Input placeholder="Task name" value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} />
          <Input type="date" value={newTask.start} onChange={(e) => setNewTask({ ...newTask, start: e.target.value })} />
          <Input type="date" value={newTask.end} onChange={(e) => setNewTask({ ...newTask, end: e.target.value })} />
          <Select value={newTask.owner} onValueChange={(v) => setNewTask({ ...newTask, owner: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Owner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="PMO">PMO</SelectItem>
              <SelectItem value="Tech">Tech</SelectItem>
            </SelectContent>
          </Select>
          <div className="md:col-span-4">
            <Button
              variant="hero"
              onClick={() => {
                if (!newTask.name || !newTask.start || !newTask.end) return;
                setTasks((t) => [...t, { id: genId(), ...newTask }]);
                setNewTask({ name: "", start: "", end: "", owner: "Finance" });
              }}
            >
              Add Task
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timeline <span className="text-sm text-muted-foreground">({period})</span></CardTitle>
        </CardHeader>
        <CardContent>
          <GanttLite tasks={tasks} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Textarea placeholder="Share an update…" value={comment} onChange={(e) => setComment(e.target.value)} />
          <div>
            <Button
              variant="outline"
              onClick={() => {
                if (!comment.trim()) return;
                setComments((c) => [{ text: comment, at: new Date().toISOString() }, ...c]);
                setComment("");
              }}
            >
              Post Comment
            </Button>
          </div>
          <ul className="grid gap-2">
            {comments.map((c, i) => (
              <li key={i} className="text-sm">
                <span className="text-muted-foreground">{format(new Date(c.at), "PPpp")}: </span>
                {c.text}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
