import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div className="p-4">
      <Button>Hello</Button>
      <ModeToggle />
    </div>
  );
}
