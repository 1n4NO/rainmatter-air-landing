import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#070e1c",
        panel: "#0b1325",
        accent: "#6b9eff",
        tx: "#e6efff",
        tx2: "#7b93bc",
      },
    },
  },
  plugins: [],
};

export default config;
