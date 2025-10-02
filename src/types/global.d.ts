// Global type declarations for Microsoft Teams chat integration
declare global {
  interface Window {
    mscc?: {
      WidgetElement?: {
        open: () => void;
        close: () => void;
      };
    };
  }
}

export {};