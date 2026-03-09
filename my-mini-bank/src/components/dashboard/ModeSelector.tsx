import { Badge } from "@/components/ui/badge";

type Mode = "normal" | "super";

interface Props {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

const ModeSelector = ({ mode, onModeChange }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex rounded-lg border border-border bg-card p-1">
        <button
          onClick={() => onModeChange("normal")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
            mode === "normal"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Normal User
        </button>
        <button
          onClick={() => onModeChange("super")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
            mode === "super"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Super User
        </button>
      </div>
      <Badge variant={mode === "normal" ? "default" : "secondary"}>
        {mode === "normal" ? "UPI Data Mode" : "Bank Transaction Mode"}
      </Badge>
    </div>
  );
};

export default ModeSelector;
