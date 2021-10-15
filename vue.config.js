module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/my-study-plan/' : '/',
  transpileDependencies: [
    'vuetify',
  ],
};
