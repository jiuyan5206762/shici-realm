/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F3ECE0',
          300: '#E7DDD0',
          400: '#D5C4AF',
          500: '#BC9F80',
        },
        ink: {
          50: '#F6F5F4',
          100: '#E7E5E4',
          200: '#D6D3D1',
          300: '#A8A29E',
          400: '#78716C',
          500: '#57534E',
          600: '#44403C',
          700: '#292524',
          800: '#1C1917',
          900: '#0C0A09',
          950: '#131316',
        },
        chinese: {
          cinnabar: '#BA3B46',      // 故宫朱砂红
          rouge: '#962D3E',         // 胭脂醉
          seal: '#A3333D',          // 篆刻印泥红
          celadon: '#4F7762',       // 龙泉青瓷
          bamboo: '#3D5A45',        // 潇湘竹青
          indigo: '#2A4365',        // 霁蓝藏青
          amber: '#B87D4B',         // 蜜蜡琥珀
          ochre: '#8C5E35',         // 远山赭石
          gold: '#C5A059',          // 古法泥金
          tea: '#947B62',           // 龙井茶褐
          cloud: '#EAE6E1',         // 云峰白
          night: '#131316',         // 玄夜黑
          nightCard: '#1C1C22',     // 玄夜卡片
          nightBorder: '#2E2E38',   // 玄夜描边
        }
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', 'SimSun', 'Songti SC', 'STSong', 'serif'],
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'],
        kaiti: ['"STKaiti"', '"Kaiti SC"', '"KaiTi"', '"Noto Serif SC"', 'serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'oriental': '0 4px 20px -2px rgba(41, 37, 36, 0.06), 0 2px 6px -1px rgba(41, 37, 36, 0.04)',
        'oriental-hover': '0 12px 32px -4px rgba(41, 37, 36, 0.12), 0 4px 12px -2px rgba(41, 37, 36, 0.06)',
        'oriental-dark': '0 6px 24px -2px rgba(0, 0, 0, 0.45), 0 2px 8px -1px rgba(0, 0, 0, 0.3)',
        'seal': 'inset 0 0 0 1.5px #BA3B46, 0 2px 8px rgba(186, 59, 70, 0.25)',
        'seal-gold': 'inset 0 0 0 1.5px #C5A059, 0 2px 8px rgba(197, 160, 89, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'ink-spread': 'inkSpread 1.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        inkSpread: {
          '0%': { transform: 'scale(0.92)', opacity: '0' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
