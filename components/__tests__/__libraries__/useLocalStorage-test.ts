import { getLocalStorage, subscribe } from "@/libraries/localStorage";

describe("Testing subscribing to local storage events", () => {
  let numberOfCallbacks = 0;

  const storage = getLocalStorage();
  storage.set("key", 1);
  
  test("Changing the value 'test' from the keystore should invoke callback", () => {
    subscribe(() => numberOfCallbacks++);
    storage.set("key", 2)
    
    expect(numberOfCallbacks).toBeGreaterThan(0);
    expect(numberOfCallbacks).toBe(1);
  });

  test("Changing the value 'test' another time should invoke callback", () => {
    storage.set("key", 2)
    expect(numberOfCallbacks).toBe(2);
  });

});

describe("Testing unsubscribing from local storage events", () => {
  let numberOfCallbacks = 0;

  const storage = getLocalStorage();
  storage.set("key", 1);
  
  test("Changing the value 'test' after unsub should not increase callback count", () => {
    const unsub = subscribe(() => numberOfCallbacks++);
    storage.set("key", 2)
    
    expect(numberOfCallbacks).toBe(1);

    unsub()
    storage.set("key", 1)
    expect(storage.getNumber("key")).toBe(1)
    expect(numberOfCallbacks).toBe(1)
  });
});
