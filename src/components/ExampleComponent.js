import React, { useCallback, useSyncExternalStore } from 'react';

// Definizione di uno store semplice per l'esempio
const store = {
  state: 0,
  listeners: new Set(),
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
  getState() {
    return this.state;
  },
  setState(newState) {
    this.state = newState;
    this.listeners.forEach(listener => listener());
  }
};

// Selettore per ottenere lo stato
const selector = state => state;

// Hook personalizzato per usare lo store
const useStore = () => {
  return useSyncExternalStore(
    store.subscribe.bind(store),
    useCallback(() => selector(store.getState()), [])
  );
};

// Componente di esempio che mostra lo stato dello store
const ExampleComponent = () => {
  const state = useStore();
  return <div>Store State: {state}</div>;
};

export default ExampleComponent;
