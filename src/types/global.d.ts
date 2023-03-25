declare global {
  interface Window {
    bubbly: (args: any) => any;
  }
}
// global does not work without this export
export {};
