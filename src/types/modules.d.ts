declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}

// declare module 'virtual:*' {
//   const result: any;
//   export default result;
// }

declare type Recordable<T = any> = Record<string, T>;

// interface Document {
//   startViewTransition?: (callback: () => void) => void;
// }

interface Window {
  toast: (
    type: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast',
    summary: string,
    message: string
  ) => void;
}
