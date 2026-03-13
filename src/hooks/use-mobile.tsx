// Mobile-only app: always treat the environment as mobile.
// The media-query breakpoint logic from the desktop app is not needed here.
export function useIsMobile(): boolean {
  return true;
}
