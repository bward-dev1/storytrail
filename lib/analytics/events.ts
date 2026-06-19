"use client";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, unknown> }) => void;
  }
}

export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
}