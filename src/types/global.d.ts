// Global type declarations for Microsoft Teams chat integration
declare global {
  interface Window {
    mscc?: {
      WidgetElement?: {
        open?: () => void;
        close?: () => void;
      };
      open?: () => void;
      show?: () => void;
      close?: () => void;
      hide?: () => void;
    };
    openChat?: () => void;
    showChat?: () => void;
    startChat?: () => void;
    toggleChat?: () => void;
  }
}

export {};
