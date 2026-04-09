import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

export function usePlatform() {
  const isMobile = useIsMobile();

  const isTauriMobile = React.useMemo(() => {
    try {
      const internals = (window as unknown as Record<string, unknown>).__TAURI_INTERNALS__ as
        | { metadata?: { currentDevice?: { deviceType?: string } } }
        | undefined;
      const deviceType = internals?.metadata?.currentDevice?.deviceType;
      return deviceType === "mobile";
    } catch {
      return false;
    }
  }, []);

  const isAndroid = React.useMemo(() => {
    return /android/i.test(navigator.userAgent);
  }, []);

  return { isMobile: isMobile || isTauriMobile, isTauriMobile, isAndroid };
}
