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
          100: '#F8F5EF',
          200: '#F0EAE1',
          300: '#E4DACD',
          400: '#D2C3B1',
          500: '#B8A48D',
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
        },
        chinese: {
          cinnabar: '#BA3B46',      // 朱砂红
          rouge: '#A3333D',         // 胭脂
          seal: '#962D3E',          // 印章朱红
          celadon: '#4F7762',       // 龙泉青瓷
          bamboo: '#3D5A45',        // 竹青
          indigo: '#2A4365',        // 藏青
          amber: '#B87D4B',         // 琥珀
          ochre: '#8C5E35',         // 赭石
          gold: '#C5A059',          // 泥金
          tea: '#947B62',           // 远山茶色
          cloud: '#EAE6E1',         // 云峰白
          night: '#161618',         // 玄青黑
          nightCard: '#222226',     // 玄夜卡片
          nightBorder: '#303036',   // 玄夜描边
        }
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', 'SimSun', 'Songti SC', 'STSong', 'serif'],
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'],
        kaiti: ['"STKaiti"', '"Kaiti SC"', '"KaiTi"', '"Noto Serif SC"', 'serif'],
      },
      boxShadow: {
        'oriental': '0 4px 20px -2px rgba(41, 37, 36, 0.05), 0 2px 6px -1px rgba(41, 37, 36, 0.03)',
        'oriental-hover': '0 10px 30px -4px rgba(41, 37, 36, 0.1), 0 4px 12px -2px rgba(41, 37, 36, 0.05)',
        'oriental-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
