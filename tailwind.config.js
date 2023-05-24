const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */





module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {


      aspectRatio: {
        '4/3': '4 / 3',
      },

    },
    fontFamily: {
      'mplus': ['M_PLUS_1', ],
      'manuale': ['Manuale', ],
      'jamrul': ['Jamrul', ],
      'sabon': ['Sabon', ],
    },


   



    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'dark': '#071619',
      'light': '#FAE8E8',
      'grey': '#F2F7F8',
      'pink': '#FFD7D7',
      'blue': '#B6DBFF',
      'lighterblue': '#C7E3FF',
      'green': '#B6FFCE',
      'lightgreen': '#194F59',
      'leafgreen': '#E4E5B1',
      'armygreen': '#3E470E',
      'darkgreen': '#071619',
    }
    ,

    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    

  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
