// tailwind.config.js
import typography from '@tailwindcss/typography'; // Correct import

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // IMPORTANT: Ensure these paths cover ALL files where you use Tailwind classes.
    // If your Prose component is in a different directory, add it here.
  ],
  theme: {
    extend: {
      // ...
    },
  },
  plugins: [
    typography, // Correct usage
  ],
};