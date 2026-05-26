import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeData(key: string, data: any): Promise<void> {
  try {
    if (!key || typeof data === 'undefined') throw new Error("erro ao tentar guardar dado");
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.log('opa');
    throw err
  }
}

export async function getStoreData<T>(key: string): Promise<T | null> {
  try {
    if (!key) return null;
    const item = await AsyncStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item) as T
  } catch (err) {
    throw err;
  }
}

export async function cleanStoredData(key: string): Promise<boolean> {
  if (!key) return false;
  await AsyncStorage.removeItem(key);
  return true;
}

export async function clearAllStoredData() {
  await AsyncStorage.clear();
}