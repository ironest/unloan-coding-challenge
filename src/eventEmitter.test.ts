import { EventEmitter } from "./eventEmitter";
import { EventType, AnyEventPayload } from "./types";

/**
 * Unloan Event Emitter Coding Challenge
 * -------------------------------------
 * You're going to build a simple basic event emitter. What is an event emitter? Put it simply,
 * it allows calling clients to register handlers for specific events (eg a mouse click) such that
 * when an event is emitted, each callback is invoked with the payload.
 *
 * INSTRUCTIONS:
 *   1. Complete eventEmitter.ts - use the tests below to guide you as to what to implement. Naturally,
 *      the tests should probably pass!
 *   2. Add any additional tests that you think might be relevant to ensure the implementation is
 *      robust.
 *   3. Make ANY improvements you think are reasonable (rename, refactor, even restructure)
 *   4. Make this your AUDITION tape - we're looking for superstars!
 *   5. Remember to git commit any progress (as you might with any task or work item assigned to you)
 *   6. If you have any questions - feel free to make any reasonable assumptions (and document them
 *      and why).
 *
 * WHAT WE LOOK FOR:
 *   1. Understanding the problem and objective
 *   2. Coding communication style
 *   3. Skill with TypeScript
 *   4. Correctness and effectiveness
 *
 * EXPECTED COMPLETION TIME:
 *   30-45 minutes
 *
 * Good luck!
 */
describe("EventEmitter", () => {
  it("can be constructed", () => {
    const eventEmitter = new EventEmitter();
    expect(eventEmitter).toBeInstanceOf(EventEmitter);
  });

  it("can register a callback for a given event", () => {
    const eventEmitter = new EventEmitter();
    const callback = jest.fn();
    const payload = getRandomPayload(EventType.mouseClick);
    eventEmitter.register(EventType.mouseClick, callback);
    eventEmitter.emit(EventType.mouseClick, payload);
    expect(callback.mock.calls.length).toBe(1);
    const callbackParam1 = callback.mock.calls[0][0];
    expect(callbackParam1).toBe(payload);
  });

  it("can register different callbacks for a different events", () => {
    const eventEmitter = new EventEmitter();

    const mouseClickCallback = jest.fn();
    const keyPressCallback = jest.fn();
    const mouseClickPayload = getRandomPayload(EventType.mouseClick);
    const keyPressPayload = getRandomPayload(EventType.keyPress);

    eventEmitter.register(EventType.mouseClick, mouseClickCallback);
    eventEmitter.register(EventType.keyPress, keyPressCallback);
    eventEmitter.emit(EventType.mouseClick, mouseClickPayload);
    eventEmitter.emit(EventType.keyPress, keyPressPayload);

    // check correctess on mouseClick event
    expect(mouseClickCallback.mock.calls.length).toBe(1);
    const mouseClickCallbackParam1 = mouseClickCallback.mock.calls[0][0];
    expect(mouseClickCallbackParam1).toBe(mouseClickPayload);

    // check correctess on keyPress event
    expect(keyPressCallback.mock.calls.length).toBe(1);
    const keyPressCallbackParam1 = keyPressCallback.mock.calls[0][0];
    expect(keyPressCallbackParam1).toBe(keyPressPayload);
  });

  it("can register multiple callbacks for a given event", () => {
    const eventEmitter = new EventEmitter();

    // Dynamically generate 5 entries having same type but different payloads
    const mockData = Array(5).map(() => {
      return {
        eventType: EventType.mouseClick,
        callback: jest.fn(),
        payload: getRandomPayload(EventType.mouseClick),
      };
    });

    mockData.forEach((md) => {
      eventEmitter.register(md.eventType, md.callback);
      eventEmitter.emit(md.eventType, md.payload);
      expect(md.callback.mock.calls.length).toBe(1);
      const cbParam = md.callback.mock.calls[0][0];
      expect(cbParam).toEqual(md.payload);
    });
  });

  it("can unregister a given event", () => {
    const eventEmitter = new EventEmitter();
    const callback = jest.fn();
    eventEmitter.register(EventType.mouseClick, callback);
    eventEmitter.emit(
      EventType.mouseClick,
      getRandomPayload(EventType.mouseClick)
    );
    eventEmitter.unregister(EventType.mouseClick, callback);
    eventEmitter.emit(
      EventType.mouseClick,
      getRandomPayload(EventType.mouseClick)
    );
    eventEmitter.emit(
      EventType.mouseClick,
      getRandomPayload(EventType.mouseClick)
    );
    eventEmitter.emit(
      EventType.mouseClick,
      getRandomPayload(EventType.mouseClick)
    );
    expect(callback.mock.calls.length).toBe(1);
  });

  it("can unregister a given event and preserve other registrations", () => {
    const eventEmitter = new EventEmitter();
    const callbacks = [jest.fn(), jest.fn(), jest.fn()];
    eventEmitter.register(EventType.mouseClick, callbacks[0]);
    eventEmitter.register(EventType.mouseClick, callbacks[1]);
    eventEmitter.register(EventType.mouseClick, callbacks[2]);

    eventEmitter.unregister(EventType.mouseClick, callbacks[1]);

    eventEmitter.emit(
      EventType.mouseClick,
      getRandomPayload(EventType.mouseClick)
    );
    expect(callbacks[0].mock.calls.length).toBe(1);
    expect(callbacks[1].mock.calls.length).toBe(0);
    expect(callbacks[2].mock.calls.length).toBe(1);
  });

  it("can unregister EVERY callbacks from a given event", () => {
    const eventEmitter = new EventEmitter();
    const callbacks = [jest.fn(), jest.fn(), jest.fn()];
    eventEmitter.register(EventType.mouseClick, callbacks[0]);
    eventEmitter.register(EventType.mouseClick, callbacks[1]);
    eventEmitter.register(EventType.mouseClick, callbacks[2]);
    eventEmitter.unregisterAll(EventType.mouseClick);
    eventEmitter.emit(
      EventType.mouseClick,
      getRandomPayload(EventType.mouseClick)
    );
    expect(callbacks[0].mock.calls.length).toBe(0);
    expect(callbacks[1].mock.calls.length).toBe(0);
    expect(callbacks[2].mock.calls.length).toBe(0);
  });

  it("Ensure uniqueness of registrations (for the same eventype and same callback)", () => {
    const eventEmitter = new EventEmitter();
    const callback = jest.fn();
    eventEmitter.register(EventType.mouseClick, callback);
    eventEmitter.register(EventType.mouseClick, callback);
    eventEmitter.emit(
      EventType.mouseClick,
      getRandomPayload(EventType.mouseClick)
    );
    expect(callback.mock.calls.length).toBe(1);
  });

  it("Can return all registered event types", () => {
    const eventEmitter = new EventEmitter();
    eventEmitter.register(EventType.mouseClick, jest.fn());
    eventEmitter.register(EventType.keyPress, jest.fn());
    eventEmitter.register(EventType.pageScroll, jest.fn());

    const existingEvents = eventEmitter.getAllEventTypes();
    expect(existingEvents).toEqual([
      EventType.mouseClick,
      EventType.keyPress,
      EventType.pageScroll,
    ]);
  });

  it("Can return all callbacks given an event types", () => {
    const eventEmitter = new EventEmitter();
    const callbacks = [jest.fn(), jest.fn(), jest.fn()];
    eventEmitter.register(EventType.mouseClick, callbacks[0]);
    eventEmitter.register(EventType.mouseClick, callbacks[1]);
    eventEmitter.register(EventType.mouseClick, callbacks[2]);

    const existingCb = eventEmitter.getCallbacksByEventType(
      EventType.mouseClick
    );
    expect(existingCb).toEqual(callbacks);
  });
});

function getRandomPayload(eventType: EventType): AnyEventPayload {
  switch (eventType) {
    case EventType.mouseClick:
      return { x: Math.random(), y: Math.random() };
    case EventType.keyPress:
      return { keyCode: Math.random() };
      break;
    case EventType.pageScroll:
      return { origin: Math.random(), delta: Math.random() };
      break;
    case EventType.windowResize:
      return { width: Math.random(), height: Math.random() };
    default:
      throw `Error: unexpected event type: ${eventType}`;
  }
}
