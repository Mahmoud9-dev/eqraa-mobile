import { useLocation, useNavigate } from "react-router-dom";
import { Home, Users, BookOpen, Briefcase, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface TabItem {
  path: string;
  labelKey: keyof ReturnType<typeof useLanguage>["t"]["nav"];
  icon: React.FC<{ className?: string }>;
}

const TABS: TabItem[] = [
  { path: "/",         labelKey: "home",     icon: Home },
  { path: "/students", labelKey: "students", icon: Users },
  { path: "/quran",    labelKey: "quran",    icon: BookOpen },
  { path: "/meetings", labelKey: "meetings", icon: Briefcase },
  { path: "/settings", labelKey: "settings", icon: Settings },
];

interface MobileLayoutProps {
  children: React.ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Determine which tab is active — match root "/" exactly, others by prefix
  function isActive(path: string): boolean {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Scrollable content area — leaves room for the bottom tab bar */}
      <main className="flex-1 overflow-y-auto pb-[calc(4rem+var(--sab,0px))]">
        {children}
      </main>

      {/* Bottom tab bar — sits above the home indicator safe area */}
      <nav
        className="fixed bottom-0 inset-x-0 z-50 bg-card border-t border-border"
        style={{ paddingBottom: "var(--sab, 0px)" }}
        aria-label={t.nav.home}
      >
        <div className="flex items-stretch h-16">
          {TABS.map((tab) => {
            const active = isActive(tab.path);
            const Icon = tab.icon;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-0.5 min-w-0",
                  "transition-colors duration-150 touch-manipulation",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={t.nav[tab.labelKey] as string}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 shrink-0 transition-transform duration-150",
                    active && "scale-110"
                  )}
                />
                <span className="text-[10px] font-medium leading-none truncate max-w-full px-1">
                  {t.nav[tab.labelKey] as string}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
