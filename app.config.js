import 'dotenv/config';

export default {
  expo: {
    name: 'Vacation Helper',
    slug: 'vacation-helper',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon2.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    ios: {
      buildNumber: '1.0.0',
      supportsTablet: true
    },
    android: {
      package: 'com.jaehyeok.vacationhelper',
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive.png',
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
      API_URL: process.env.API_URL,
      eas: {
        projectId: process.env.PROJECT_ID
      }
    }
  }
};
