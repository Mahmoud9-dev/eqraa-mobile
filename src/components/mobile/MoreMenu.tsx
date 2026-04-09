import {
  Shield,
  GraduationCap,
  BookOpenCheck,
  FileText,
  Calendar,
  ClipboardList,
  Megaphone,
  BookMarked,
  Settings,
  Lightbulb,
  Users2,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface MoreMenuItem {
  path: string;
  icon: typeof Shield;
  labelKey: keyof typeof NAV_KEYS;
}

const NAV_KEYS = {
  admin: "admin",
  teachers: "teachers",
  quranCircles: "quranCircles",
  tajweed: "tajweed",
  educational: "educational",
  exams: "exams",
  subjects: "subjects",
  schedule: "schedule",
  meetings: "meetings",
  suggestions: "suggestions",
  announcements: "announcements",
  library: "library",
  tarbiwi: "tarbiwi",
  settings: "settings",
} as const;

const MENU_ITEMS: MoreMenuItem[] = [
  { path: "/admin", icon: Shield, labelKey: "admin" },
  { path: "/teachers", icon: GraduationCap, labelKey: "teachers" },
  { path: "/quran-circles", icon: Users2, labelKey: "quranCircles" },
  { path: "/tajweed", icon: BookOpenCheck, labelKey: "tajweed" },
  { path: "/educational", icon: BookOpen, labelKey: "educational" },
  { path: "/exams", icon: FileText, labelKey: "exams" },
  { path: "/subjects", icon: ClipboardList, labelKey: "subjects" },
  { path: "/schedule", icon: Calendar, labelKey: "schedule" },
  { path: "/meetings", icon: ClipboardList, labelKey: "meetings" },
  { path: "/suggestions", icon: Lightbulb, labelKey: "suggestions" },
  { path: "/announcements", icon: Megaphone, labelKey: "announcements" },
  { path: "/library", icon: BookMarked, labelKey: "library" },
  { path: "/tarbiwi", icon: BookOpen, labelKey: "tarbiwi" },
  { path: "/settings", icon: Settings, labelKey: "settings" },
];

interface MoreMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MoreMenu({ open, onOpenChange }: MoreMenuProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const moreTitle: Record<string, string> = {
    ar: "المزيد",
    en: "More",
  };

  const handleNavigate = (path: string) => {
    onOpenChange(false);
    navigate(path);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {moreTitle[t.nav.home === "الرئيسية" ? "ar" : "en"]}
          </DrawerTitle>
        </DrawerHeader>
        <div className="grid grid-cols-3 gap-2 px-4 pb-8 max-h-[60vh] overflow-y-auto">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-accent active:bg-accent/70 transition-colors"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-center leading-tight">
                  {t.nav[item.labelKey]}
                </span>
              </button>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
