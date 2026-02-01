"use client";

import { useEffect } from "react";

/**
 * Guards against "InvalidStateError: Failed to execute 'showPopover' on 'HTMLElement':
 * Invalid on disconnected popover elements" which can be thrown by React DevTools
 * (or other code) when calling showPopover() on an element that is no longer in the DOM.
 * Only runs in development.
 */
export default function PopoverGuard() {
  useEffect(() => {
    if (typeof window === "undefined" || process.env.NODE_ENV !== "development") {
      return;
    }
    const proto = HTMLElement.prototype as HTMLElement & { showPopover?: () => void };
    if (typeof proto.showPopover !== "function") {
      return;
    }
    const original = proto.showPopover;
    proto.showPopover = function (this: HTMLElement) {
      if (!this.isConnected) return;
      original.call(this);
    };
    return () => {
      proto.showPopover = original;
    };
  }, []);
  return null;
}
