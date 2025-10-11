import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          autoplay?: boolean;
          loop?: boolean;
          speed?: number;
          style?: React.CSSProperties;
        },
        HTMLElement
      >;
    }
  }
}

export {};
