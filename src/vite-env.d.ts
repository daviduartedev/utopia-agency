/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  /** Reservado para futuras integrações (OG está em index.html). */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "react-responsive-masonry" {
  import type { ComponentType, ReactNode, CSSProperties } from "react";

  export interface MasonryProps {
    columnsCount?: number;
    gutter?: string;
    containerTag?: keyof JSX.IntrinsicElements;
    itemTag?: keyof JSX.IntrinsicElements;
    itemStyle?: CSSProperties;
    sequential?: boolean;
    className?: string;
    children?: ReactNode;
  }

  export interface ResponsiveMasonryProps {
    columnsCountBreakPoints?: Record<number, number>;
    gutterBreakpoints?: Record<number, string>;
    className?: string;
    children?: ReactNode;
  }

  export const ResponsiveMasonry: ComponentType<ResponsiveMasonryProps>;
  const Masonry: ComponentType<MasonryProps>;
  export default Masonry;
}
