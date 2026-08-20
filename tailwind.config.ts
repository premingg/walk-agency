import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				display: ['Archivo', 'system-ui', 'sans-serif'],
				sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					2: 'hsl(var(--surface-2))'
				},
				brand: {
					red: 'hsl(var(--brand-red))',
					blue: 'hsl(var(--brand-blue))',
					teal: 'hsl(var(--brand-teal))',
					gold: 'hsl(var(--brand-gold))',
					charcoal: 'hsl(var(--brand-charcoal))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'walk-gradient': 'var(--gradient-walk)',
				'walk-wash': 'var(--gradient-wash)',
			},
			boxShadow: {
				cinema: 'var(--shadow-cinema)',
				glass: 'var(--shadow-glass)',
			},
			fontSize: {
				'hero': ['clamp(2.5rem, 7.5vw, 7rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
				'section': ['clamp(1.9rem, 4.2vw, 3.6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				marquee: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				},
				'marquee-rev': {
					'0%': { transform: 'translateX(-50%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'marquee-y': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-50%)' }
				},
				'marquee-y-rev': {
					'0%': { transform: 'translateY(-50%)' },
					'100%': { transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				marquee: 'marquee 40s linear infinite',
				'marquee-rev': 'marquee-rev 40s linear infinite',
				'marquee-y': 'marquee-y 26s linear infinite',
				'marquee-y-rev': 'marquee-y-rev 26s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
