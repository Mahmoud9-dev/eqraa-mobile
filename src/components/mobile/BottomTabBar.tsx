import { Home, Users, BookOpen, BarChart3, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface TabItem {
  path: string;
  icon: typeof Home;
  labelKey: "home" | "students" | "quran" | "attendance" | "more";
}

const TABS: TabItem[] = [
  { path: "/", icon: Home, labelKey: "home" },
  { path: "/students", icon: Users, labelKey: "students" },
  { path: "/quran", icon: BookOpen, labelKey: "quran" },
  { path: "/attendance", icon: BarChart3, labelKey: "attendance" },
  { path: "/__more__", icon: Menu, labelKey: "more" },
];

interface BottomTabBarProps {
  onMorePress: () => void;
}

export function BottomTabBar({ onMorePress }: BottomTabBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const moreLabel: Record<string, string> = {
    ar: "المزيد",
    en: "More",
  };

  const getLabel = (key: TabItem["labelKey"]) => {
    if (key === "more") return moreLabel[t.nav.home === "الرئيسية" ? "ar" : "en"];
    return t.nav[key];
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    if (path === "/__more__") return false;
    return location.pathname.startsWith(path);
  };

  const handlePress = (tab: TabItem) => {
    if (tab.path === "/__more__") {
      onMorePress();
      return;
    }
    navigate(tab.path);
  };

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 bg-card border-t border-border"
      style={{ paddingBottom: "var(--safe-area-bottom)" }}
    >
      <div className="flex items-center justify-around h-16">
        {TABS.map((tab) => {
          const active = isActive(tab.path);
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => handlePress(tab)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors",
                "active:bg-accent/50",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium leading-tight">
                {getLabel(tab.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
