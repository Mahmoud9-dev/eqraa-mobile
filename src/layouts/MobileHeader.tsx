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
  const { isRTL, t } = useLanguage();
  const navigate = useNavigate();
  // In RTL: the back arrow visually points right (going back in reading direction)
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <header className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md">
      {/* Status bar safe area is handled globally via body padding in index.css */}
      <div className="flex items-center justify-between px-4 h-14">
        {/* Back button — shown on the trailing side in RTL (visual left for RTL) */}
        {showBack ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-primary-foreground hover:bg-primary-foreground/10 shrink-0 -ms-2"
            aria-label={t.header.home}
          >
            <BackArrow className="w-5 h-5" />
          </Button>
        ) : (
          <div className="w-9" aria-hidden="true" />
        )}

        {/* Page title — centred */}
        <h1 className="flex-1 text-center text-lg font-bold truncate px-2">
          {title}
        </h1>

        {/* Language + theme toggles */}
        <div className="flex items-center gap-1 shrink-0 -me-1">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
