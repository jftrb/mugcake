import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

export function getLocalStorage() {
  return storage;
}

export function subscribe(callback: (changedKey: string) => void) {
  console.log(`Adding 1 listener to MMKV storage.`)
  const listener = storage.addOnValueChangedListener(callback);
  return () => {
    console.log(`Removing 1 listener from MMKV storage.`)
    listener.remove()
  };
}

export function subscribe2(callback: (changedKey: string) => void) {
  console.log(`Adding 1 listener to MMKV storage.`)
  const listener = storage.addOnValueChangedListener(callback);
  return () => {
    console.log(`Removing 1 listener from MMKV storage.`)
    listener.remove()
  };
}
