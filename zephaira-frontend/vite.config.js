// vite.config.js
export default {
  server: {
    proxy: {
      '/submit': 'http://127.0.0.1:5000',
      '/history': 'http://127.0.0.1:5000',
    }
  }
};
