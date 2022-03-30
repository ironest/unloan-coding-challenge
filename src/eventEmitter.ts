import { EventType, AnyEventPayload } from "./types";

interface IListener {
  [key: string]: Function[];
}

export class EventEmitter {
  private listeners: IListener;

  constructor() {
    this.listeners = {};
  }

  register(
    eventType: EventType,
    handler: (param: AnyEventPayload) => void
  ): void {
    this.listeners[eventType] = this.listeners[eventType] || [];

    for (const callback of this.listeners[eventType]) {
      // Early return if registration already exists
      if (callback === handler) return;
    }
    this.listeners[eventType].push(handler);
  }

  unregister(
    eventType: EventType,
    handler: (a: AnyEventPayload) => void
  ): void {
    const currListeners = this.listeners[eventType] || [];
    this.listeners[eventType] = currListeners.filter(
      (callback: Function) => callback !== handler
    );

    // If no other eventTypes are left, removing the key
    if (!this.listeners[eventType].length) {
      delete this.listeners[eventType];
    }
  }

  unregisterAll(eventType: EventType): void {
    delete this.listeners[eventType];
  }

  emit(eventType: EventType, payload: AnyEventPayload): void {
    const callbacks = this.listeners[eventType] || [];
    callbacks.map((callback) => callback(payload));
  }

  getAllEventTypes(): EventType[] {
    return Object.keys(this.listeners) as EventType[];
  }

  getCallbacksByEventType(eventType: EventType): Function[] {
    return this.listeners[eventType] || [];
  }
}
