import { ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
}

export function MobileHeader({ title, showBack = true }: MobileHeaderProps) {
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <header
      className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-md"
      style={{ paddingTop: "var(--safe-area-top)" }}
    >
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-primary-foreground hover:bg-primary-foreground/10 -ms-2"
            >
              <BackArrow className="w-5 h-5" />
            </Button>
          )}
          <h1 className="text-lg font-bold truncate">{title}</h1>
        </div>
        <div className="flex items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
