interface IListener {
  [key: string]: Function[];
}

export class EventEmitter {
  private listeners: IListener;

  constructor() {
    this.listeners = {};
  }

  register(eventType: string, handler: Function): void {
    this.listeners[eventType] = this.listeners[eventType] || [];

    for (const callback of this.listeners[eventType]) {
      // Early return if registration already exists
      if (callback === handler) return;
    }
    this.listeners[eventType].push(handler);
  }

  unregister(eventType: string, handler: Function): void {
    const currListeners = this.listeners[eventType] || [];
    this.listeners[eventType] = currListeners.filter(
      (callback: Function) => callback !== handler
    );
  }

  unregisterAll(eventType: string): void {
    delete this.listeners[eventType];
  }

  emit(eventType: string, payload: Object): void {
    const callbacks = this.listeners[eventType] || [];
    callbacks.map((callback) => callback(payload));
  }
}
