import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MobileCardAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline" | "destructive" | "ghost";
}

interface MobileCardProps {
  /** Primary name / title displayed in bold */
  name: string;
  /** Secondary line (e.g. grade, specialization) */
  subtitle?: string;
  /** Optional badge text */
  badge?: string;
  /** Optional badge colour class override */
  badgeClassName?: string;
  /** Optional status badge (active / inactive) */
  statusBadge?: React.ReactNode;
  /** Avatar initials fallback (first letters of name words) */
  initials?: string;
  /** Action buttons rendered in a row at the bottom */
  actions?: MobileCardAction[];
  /** Extra content rendered below the name/subtitle row */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Touch-friendly card used in mobile list views in place of data tables.
 * Min touch-target height ensured by py-4 padding + min-h-[44px] on action buttons.
 */
export function MobileCard({
  name,
  subtitle,
  badge,
  badgeClassName,
  statusBadge,
  initials,
  actions,
  children,
  className,
}: MobileCardProps) {
  const avatarLetters =
    initials ??
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card px-4 py-4 shadow-sm",
        className
      )}
    >
      {/* Top row: avatar + name/subtitle + badges */}
      <div className="flex items-start gap-3">
        {/* Avatar circle */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold"
          aria-hidden="true"
        >
          {avatarLetters}
        </div>

        {/* Name / subtitle */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {name}
          </p>
          {subtitle && (
            <p className="truncate text-xs text-muted-foreground mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right-side badges */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          {badge && (
            <Badge
              variant="outline"
              className={cn("text-xs", badgeClassName)}
            >
              {badge}
            </Badge>
          )}
          {statusBadge}
        </div>
      </div>

      {/* Optional extra content slot */}
      {children && <div className="mt-3">{children}</div>}

      {/* Action buttons */}
      {actions && actions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant ?? "outline"}
              size="sm"
              onClick={action.onClick}
              className="min-h-[44px] flex-1 text-xs"
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
