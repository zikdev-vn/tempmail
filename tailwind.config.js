// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // điều chỉnh theo cấu trúc project bạn
  theme: {
    extend: {
      keyframes: {
        roll: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(20deg)' },
        },
        move: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        roll: 'roll 3s ease-in-out infinite',
        move: 'move 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
