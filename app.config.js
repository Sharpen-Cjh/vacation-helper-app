import 'dotenv/config';

export default {
  expo: {
    name: 'vacation-helper-app',
    slug: 'vacation-helper-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/icon.png',
        backgroundColor: '#ffffff'
      }
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png'
    },
    plugins: ['expo-router', 'expo-secure-store'],
    experiments: {
      typedRoutes: true
    },
    extra: {
      API_URL: process.env.API_URL, // 환경 변수 예시
      API_KEY: process.env.API_KEY // 환경 변수 예시
    }
  }
};
