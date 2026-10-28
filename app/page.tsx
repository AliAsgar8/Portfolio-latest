import { ThemeToggle } from "@/app/components/ThemeToggle";
import { getPortfolio } from "@/app/lib/getPortfolio";

export default function Home() {
  const data = getPortfolio();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
      <ThemeToggle />
      <h1 className="font-display text-4xl">{data.name}</h1>
      <p className="text-muted">{data.role}</p>
      <p className="rounded-lg border border-border bg-card px-4 py-2 text-sm">
        Theme + JSON working
      </p>
    </main>
  );
}
