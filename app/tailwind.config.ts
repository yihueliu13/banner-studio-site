import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // ─── Breakpoint 三段式(完整覆寫,desktop-first 用 max-*) ───
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1100px",
      "2xl": "1366px",
      "max-sm": { max: "479px" },
      "max-md": { max: "767px" },
      "max-lg": { max: "1099px" },
    },
    extend: {
      // ─── Colors(對齊 demo 完整色階) ───
      colors: {
        brand: {
          DEFAULT: "#FF963B",
          hover: "#EA7A1F",
          50: "#FFF7ED",
          100: "#FFEDD5",
          500: "#FF963B",
          600: "#EA7A1F",
        },
        neutral: {
          0: "#FFFFFF",
          50: "#FAFAF9",
          100: "#F5F5F4",
          200: "#E7E5E4",
          300: "#D6D3D1",
          400: "#A8A29E",
          600: "#57534E",
          700: "#44403C",
          800: "#292524",
          900: "#1C1917",
        },
        text: {
          primary: "#1C1917",
          secondary: "#57534E",
          muted: "#A8A29E",
        },
        bg: {
          page: "#FAFAF9",
          card: "#FFFFFF",
          "story-card": "#EEEDE8",
        },
        "border-subtle": "#E7E5E4",
        accent: {
          blue: "#3B5FD6",
        },
        "form-input-bg": "#33343B",
      },
      // ─── Spacing 14 階 ───
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        20: "80px",
        24: "96px",
        32: "128px",
        40: "160px",
      },
      // ─── Border Radius 8 階 ───
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "28px",
        "4xl": "32px",
        full: "9999px",
      },
      // ─── Shadow 7 階(含 brand + cta) ───
      boxShadow: {
        xs: "0 1px 2px rgba(0,0,0,0.04)",
        sm: "0 4px 8px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)",
        md: "0 12px 28px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.03)",
        lg: "0 20px 40px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.04)",
        xl: "0 30px 60px rgba(0,0,0,0.12), 0 12px 24px rgba(0,0,0,0.06)",
        brand: "0 12px 28px rgba(255,150,59,0.35)",
        cta: "0 32px 64px rgba(255,150,59,0.20), 0 8px 24px rgba(0,0,0,0.08)",
      },
      // ─── Z-Index 10 階 ───
      zIndex: {
        base: "1",
        sticky: "10",
        fixed: "50",
        nav: "100",
        overlay: "200",
        "modal-backdrop": "300",
        modal: "400",
        popover: "500",
        toast: "600",
        debug: "9999",
      },
      // ─── Animation Duration 6 階 ───
      transitionDuration: {
        instant: "100ms",
        fast: "200ms",
        base: "400ms",
        slow: "600ms",
        slower: "800ms",
        slowest: "1200ms",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      // ─── Font Family(吃 globals.css :root 的 var) ───
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};
export default config;
