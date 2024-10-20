import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { setCustomText } from 'react-native-global-props';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Gmarket-Sans-Medium': require('@/assets/fonts/Gmarket-Sans-Medium.otf')
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
    if (loaded) {
      const customTextProps = {
        style: {
          fontFamily: 'Gmarket-Sans-Medium'
        }
      };
      setCustomText(customTextProps);
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  );
}
