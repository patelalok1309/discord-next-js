import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
    		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))',
  				hover: 'hsl(var(--primary-hover))',
  				active: 'hsl(var(--primary-active))',
  				soft: 'hsl(var(--primary-soft))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))',
  				hover: 'hsl(var(--accent-hover))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				secondary: 'hsl(var(--secondary-sidebar))',
  				'secondary-foreground': 'hsl(var(--secondary-sidebar-foreground))'
  			},
  			channel: {
  				hover: 'hsl(var(--channel-hover))',
  				selected: 'hsl(var(--channel-selected))'
  			},
  			chat: {
  				bg: 'hsl(var(--chat-area))'
  			},
  			message: {
  				hover: 'hsl(var(--message-hover))',
  				own: 'hsl(var(--message-own))'
  			},
  			divider: {
  				DEFAULT: 'hsl(var(--divider))'
  			},
  			textCustom: {
  				primary: 'hsl(var(--text-primary))',
  				secondary: 'hsl(var(--text-secondary))',
  				muted: 'hsl(var(--text-muted))',
  				placeholder: 'hsl(var(--text-placeholder))',
  				disabled: 'hsl(var(--text-disabled))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			sm: '0 1px 3px rgba(0,0,0,0.12)',
  			md: '0 8px 24px rgba(0,0,0,0.18)',
  			lg: '0 16px 40px rgba(0,0,0,0.25)',
  			glow: '0 0 12px rgba(109,94,245,0.4)',
  			'glow-accent': '0 0 12px rgba(0,212,170,0.4)'
  		},
  		transitionDuration: {
  			custom: '200ms'
  		},
  		transitionTimingFunction: {
  			custom: 'cubic-bezier(0.4, 0, 0.2, 1)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
