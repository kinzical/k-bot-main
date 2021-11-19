  // tailwind.config.js
module.exports = {
  // mode: 'jit',
  important: true,
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'ping-new': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;'
      },
      colors: {
        'whitesolid': '#F2F5FA',
        'wolverine': '#94989D',
        'coconutwhite': '#E6EBF5',
        'international': '#3467A7',
        'wintersday': '#DBF9FF',
        'turquoisesea': '#6DDAEF',
        'blueraspberry': '#07BEE2'
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      minWidth: {
        '1/6':'16%',
        '1/5':'20%',
        '1/4': '25%',  
      }, 
      minHeight: {
        '12': '3rem',
        '20': '5rem'
      },
      fontSize: {
        tiny: '0.5rem',
        verytiny: '0.25rem'
      }
    },
  },
  variants: {},
  plugins: [],
}