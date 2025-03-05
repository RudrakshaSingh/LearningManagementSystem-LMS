/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    // eslint-disable-next-line no-undef
    plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
    // daisyui: { themes: ["dark"] },
};
