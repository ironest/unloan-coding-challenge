interface IListener {
  [key: string]: Function[];
}

export class EventEmitter {
  private listeners: IListener;

  constructor() {
    this.listeners = {};
  }

  register(eventType: string, handler: Function) {
    throw new Error("Method not implemented.");
  }

  emit(eventType: string, payload: Object) {
    throw new Error("Method not implemented.");
  }
}
