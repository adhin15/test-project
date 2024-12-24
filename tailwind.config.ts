import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
  mode: 'jit',
  safelist: [
    'bg-[#ffc300]',
    'border-[#ffc300]',
    'text-[#ffc300]',
    'background-image:url(https://image.tmdb.org/t/p/original/ag66gJCiZ06q1GSJuQlhGLi3Udx.jpg)',
    ':after:background-image:url(https://image.tmdb.org/t/p/original/ag66gJCiZ06q1GSJuQlhGLi3Udx.jpg)',
    'after:background-image:url(https://image.tmdb.org/t/p/original/ag66gJCiZ06q1GSJuQlhGLi3Udx.jpg)'
  ]
} satisfies Config;
