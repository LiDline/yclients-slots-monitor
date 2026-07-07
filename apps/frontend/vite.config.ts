import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { CLIENTS_BOOKING_URL } from '../../src/CONST.js';

export default defineConfig({
  define: {
    __CLIENTS_BOOKING_URL__: JSON.stringify(CLIENTS_BOOKING_URL),
  },
  plugins: [react(), tailwindcss()],
});
