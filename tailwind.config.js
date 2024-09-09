/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            lg: "992px",
            md: "768px",
            sm: "480px",
            xl: "1200px",
            xxl: "1400px",
            xxxl: "1800px",
        },
        fontFamily: {
            lexendDeco: ['Lexend Deca', 'cursive'],
        },
        animation: {
            'spin': 'spin 0.5s linear infinite',
        },
        keyframes: {
            spin: {
                from: {
                    transform: "rotate(0deg)",
                },
                to: {
                    transform: "rotate(360deg)",
                },
            }
        },
        extend: {
            colors: {
                gray: {
                    50: "#f8fafc",
                    100: "#f1f5f9",
                    200: "#e2e8f0",
                    300: "#cbd5e1",
                    400: "#94a3b8",
                    500: "#64748b",
                    600: "#475569",
                    700: "#334155",
                    800: "#1e293b",
                    900: "#0f172a",
                },
                textColor: {
                    1: "#7c7c7c",
                    2: "#212529",
                    3: "#444444",
                    4: "#212529",
                },
                primary1: "rgba(250,250,250,0)",
                primary2: "#f4f4f4",
                primary3: "#111111",
                primary4: "#fafafa",
                primary5: "rgba(221,221,221,0)",
                secondary1: "#ebebeb",
                accent1: "#ffd43b",
                accent2: "#ff6b6b",
                accent3: "#66d9e8",
                accent4: "#ebebeb",
                accent5: "#fffacd",
                input: "rgba(235,235,235,0)",
                success: "#28a745",
                info: "#17a2b8",
                warning: "#ffc107",
                danger: "#dc3545",

                defaultborder: "#ebebeb",
                border2: "#dddddd",
                muted: "rgb(var(--muted))"
            },
            boxShadow: {
                sm: "0 1px 3px 0 rgba(0, 0, 0, 0.07), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
                md: "0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                lg: "0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
                xl: "0 20px 25px -5px rgba(0, 0, 0, 0.07), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
            },
            backgroundImage: {
                "instagram":"linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            borderRadius: {
                default: "0.5rem",
            }
        },
    },
    plugins: [],
}

