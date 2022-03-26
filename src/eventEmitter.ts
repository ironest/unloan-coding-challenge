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
    this.listeners[eventType].push(handler);
  }

  emit(eventType: string, payload: Object): void {
    const callbacks = this.listeners[eventType] || [];
    callbacks.map((callback) => callback(payload));
  }
}
