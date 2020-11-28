module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/images-gallery/' : '/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/variables.scss";`,
      },
    },
  },
};
