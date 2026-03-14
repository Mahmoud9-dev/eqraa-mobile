
import {
  BookOpen,
  Target,
  GraduationCap,
  FileEdit,
  Library,
  Calendar,
  BarChart3,
  Brain,
  Building2,
  Megaphone,
  BookMarked,
  Handshake,
  Lightbulb,
  School,
  CheckCircle,
  CalendarDays,
  ChevronRight,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MobileHeader } from '@/layouts/MobileHeader';
import StatCard from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useHomeStats } from '@/hooks/useHomeStats';
import { useChartStats } from '@/hooks/useChartStats';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatNumber } from '@/lib/i18n';
import AttendanceTrendChart from '@/components/charts/AttendanceTrendChart';
import DepartmentPieChart from '@/components/charts/DepartmentPieChart';
import PerformanceBarChart from '@/components/charts/PerformanceBarChart';
import TeacherWorkloadChart from '@/components/charts/TeacherWorkloadChart';

/** Secondary sections shown as a compact list below the charts */
interface SecondarySection {
  to: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
}

const secondarySections: SecondarySection[] = [
  { to: '/attendance',   icon: BarChart3,     iconBgColor: 'bg-green-50 dark:bg-green-900/20',   iconColor: 'text-green-500' },
  { to: '/quran',        icon: BookOpen,      iconBgColor: 'bg-emerald-50 dark:bg-emerald-900/20', iconColor: 'text-emerald-500' },
  { to: '/tajweed',      icon: Target,        iconBgColor: 'bg-red-50 dark:bg-red-900/20',        iconColor: 'text-red-500' },
  { to: '/educational',  icon: GraduationCap, iconBgColor: 'bg-cyan-50 dark:bg-cyan-900/20',     iconColor: 'text-cyan-500' },
  { to: '/exams',        icon: FileEdit,      iconBgColor: 'bg-yellow-50 dark:bg-yellow-900/20',  iconColor: 'text-yellow-500' },
  { to: '/subjects',     icon: Library,       iconBgColor: 'bg-indigo-50 dark:bg-indigo-900/20',  iconColor: 'text-indigo-500' },
  { to: '/schedule',     icon: Calendar,      iconBgColor: 'bg-red-50 dark:bg-red-900/20',        iconColor: 'text-red-500' },
  { to: '/quran-circles', icon: Building2,   iconBgColor: 'bg-orange-50 dark:bg-orange-900/20',  iconColor: 'text-orange-500' },
  { to: '/teachers',     icon: Brain,         iconBgColor: 'bg-amber-50 dark:bg-amber-900/20',    iconColor: 'text-amber-600' },
  { to: '/announcements', icon: Megaphone,   iconBgColor: 'bg-rose-50 dark:bg-rose-900/20',      iconColor: 'text-rose-500' },
  { to: '/library',      icon: BookMarked,    iconBgColor: 'bg-teal-50 dark:bg-teal-900/20',      iconColor: 'text-teal-600' },
  { to: '/meetings',     icon: Handshake,     iconBgColor: 'bg-yellow-50 dark:bg-yellow-900/20',  iconColor: 'text-yellow-500' },
  { to: '/suggestions',  icon: Lightbulb,     iconBgColor: 'bg-yellow-50 dark:bg-yellow-900/20',  iconColor: 'text-yellow-500' },
];

const Index = () => {
  const { data: stats, isLoading: statsLoading } = useHomeStats();
  const { data: chartStats, isLoading: chartsLoading } = useChartStats();
  const { t, languageMeta } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="bg-background flex flex-col">
      <MobileHeader title={t.home.pageTitle} showBack={false} />

      <main className="flex-grow container mx-auto px-4 py-4 max-w-2xl">
        {/* Welcome */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-foreground mb-1">
            {t.home.welcome}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.home.subtitle}
          </p>
        </div>

        {/* Stats Grid — 2-column on mobile */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard
            icon={School}
            iconBgColor="bg-blue-100 dark:bg-blue-900/30"
            iconColor="text-blue-600 dark:text-blue-400"
            label={t.home.stats.totalStudents}
            value={formatNumber(stats?.totalStudents ?? 0, languageMeta.code)}
            loading={statsLoading}
          />
          <StatCard
            icon={CheckCircle}
            iconBgColor="bg-green-100 dark:bg-green-900/30"
            iconColor="text-green-600 dark:text-green-400"
            label={t.home.stats.attendanceToday}
            value={`${stats?.attendancePercentage || 0}%`}
            loading={statsLoading}
          />
          <StatCard
            icon={BookOpen}
            iconBgColor="bg-purple-100 dark:bg-purple-900/30"
            iconColor="text-purple-600 dark:text-purple-400"
            label={t.home.stats.activeCircles}
            value={formatNumber(stats?.activeCircles ?? 0, languageMeta.code)}
            loading={statsLoading}
          />
          <StatCard
            icon={CalendarDays}
            iconBgColor="bg-orange-100 dark:bg-orange-900/30"
            iconColor="text-orange-600 dark:text-orange-400"
            label={t.home.stats.upcomingExams}
            value={formatNumber(stats?.upcomingExams ?? 0, languageMeta.code)}
            loading={statsLoading}
          />
        </div>

        {/* Charts — stacked vertically on mobile */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-foreground mb-3">
            {t.charts.sectionTitle}
          </h3>
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t.charts.attendance.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{t.charts.attendance.last30Days}</p>
              </CardHeader>
              <CardContent>
                {chartsLoading ? (
                  <Skeleton className="h-[200px] w-full rounded-lg" />
                ) : (
                  <AttendanceTrendChart data={chartStats?.attendanceTrend ?? []} />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t.charts.departments.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {chartsLoading ? (
                  <Skeleton className="h-[200px] w-full rounded-lg" />
                ) : (
                  <DepartmentPieChart data={chartStats?.departmentDistribution ?? []} />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t.charts.performance.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {chartsLoading ? (
                  <Skeleton className="h-[200px] w-full rounded-lg" />
                ) : (
                  <PerformanceBarChart data={chartStats?.performanceDistribution ?? []} />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t.charts.workload.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {chartsLoading ? (
                  <Skeleton className="h-[200px] w-full rounded-lg" />
                ) : (
                  <TeacherWorkloadChart data={chartStats?.teacherWorkload ?? []} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Secondary sections list (bottom tabs cover Students/Quran/Meetings/Settings) */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-foreground mb-3">
            {t.home.moreLabel}
          </h3>
          <div className="divide-y divide-border rounded-xl border border-border overflow-hidden bg-card">
            {secondarySections.map((section) => {
              const Icon = section.icon;
              const label = t.home.sections[section.to] ?? section.to;
              return (
                <button
                  key={section.to}
                  onClick={() => navigate(section.to)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-start touch-manipulation hover:bg-muted/50 transition-colors min-h-[52px]"
                  aria-label={label}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${section.iconBgColor}`}>
                    <Icon className={`h-5 w-5 ${section.iconColor}`} />
                  </div>
                  <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 rtl:rotate-180" />
                </button>
              );
            })}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-3 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t.home.footer}
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Index;
