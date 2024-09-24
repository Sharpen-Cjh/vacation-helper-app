import * as SecureStore from 'expo-secure-store';

const setEncryptStorage = async <T>(key: string, value: T) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting value for ${key}:`, error);
  }
};

const getEncryptStorage = async (key: string) => {
  try {
    const storedData = await SecureStore.getItemAsync(key);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error(`Error getting value for ${key}:`, error);
    return null;
  }
};

const removeEncryptStorage = async (key: string) => {
  try {
    const data = await getEncryptStorage(key);

    if (data) {
      await SecureStore.deleteItemAsync(key);
    }
  } catch (error) {
    console.error(`Error removing value for ${key}:`, error);
  }
};

export { setEncryptStorage, getEncryptStorage, removeEncryptStorage };
