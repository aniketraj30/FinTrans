import { differenceInDays, parseISO } from "date-fns";

type Task = {
  id: string;
  name: string;
  start: string; // ISO date
  end: string;   // ISO date
  progress?: number; // 0-100
  owner?: string;
};

type Props = {
  tasks: Task[];
};

export default function GanttLite({ tasks }: Props) {
  if (!tasks.length) return null;
  const start = tasks.map((t) => parseISO(t.start)).sort((a, b) => a.getTime() - b.getTime())[0];
  const end = tasks.map((t) => parseISO(t.end)).sort((a, b) => b.getTime() - a.getTime())[0];
  const totalDays = Math.max(1, differenceInDays(end, start));

  return (
    <div className="w-full overflow-x-auto border rounded-lg">
      <div className="min-w-[720px]">
        <div className="grid" style={{ gridTemplateColumns: "240px 1fr" }}>
          <div className="border-b px-4 py-2 text-xs text-muted-foreground">Task</div>
          <div className="border-b px-4 py-2 text-xs text-muted-foreground">Timeline</div>
        </div>
        {tasks.map((t) => {
          const s = parseISO(t.start);
          const e = parseISO(t.end);
          const leftPct = (differenceInDays(s, start) / totalDays) * 100;
          const widthPct = (Math.max(1, differenceInDays(e, s)) / totalDays) * 100;
          return (
            <div key={t.id} className="grid items-center" style={{ gridTemplateColumns: "240px 1fr" }}>
              <div className="border-b px-4 py-3">
                <div className="text-sm font-medium">{t.name}</div>
                {t.owner && <div className="text-xs text-muted-foreground">{t.owner}</div>}
              </div>
              <div className="border-b px-4 py-3">
                <div className="relative h-8 bg-accent/50 rounded">
                  <div
                    className="absolute h-8 rounded bg-[var(--gradient-primary)] shadow-[var(--shadow-elevated)]"
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                    aria-label={`${t.name} ${t.start} to ${t.end}`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
