import { defineConfig } from 'vite'; // ✅ Use vite instead of vitest/config
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Optional: Uncomment if you want to set a custom dev server port
  // server: {
  //   port: 6666
  // }
});
