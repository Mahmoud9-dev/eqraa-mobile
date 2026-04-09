import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BottomTabBar } from "./BottomTabBar";
import { MoreMenu } from "./MoreMenu";

export function MobileLayout() {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-background">
      <main className="mobile-content">
        <Outlet />
      </main>
      <BottomTabBar onMorePress={() => setMoreOpen(true)} />
      <MoreMenu open={moreOpen} onOpenChange={setMoreOpen} />
    </div>
  );
}
