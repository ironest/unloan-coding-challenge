import { EventEmitter } from "./eventEmitter";

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
    const payload = {};
    eventEmitter.register("mouseClick", callback);
    eventEmitter.emit("mouseClick", payload);
    expect(callback.mock.calls.length).toBe(1);
    const callbackParam1 = callback.mock.calls[0][0];
    expect(callbackParam1).toBe(payload);
  });

  it("can register different callbacks for a different events", () => {
    const eventEmitter = new EventEmitter();

    const mouseClickCallback = jest.fn();
    const keyPressCallback = jest.fn();
    const mouseClickPayload = getRandomPayload();
    const keyPressPayload = getRandomPayload();

    eventEmitter.register("mouseClick", mouseClickCallback);
    eventEmitter.register("keyPress", keyPressCallback);
    eventEmitter.emit("mouseClick", mouseClickPayload);
    eventEmitter.emit("keyPress", keyPressPayload);

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
    const callbacks = [jest.fn(), jest.fn(), jest.fn()];
    const payload = {};
    callbacks.forEach((cb) => {
      eventEmitter.register("mouseClick", cb);
    });
    eventEmitter.emit("mouseClick", payload);
    callbacks.forEach((cb) => {
      expect(cb.mock.calls.length).toBe(1);
      const cbParam1 = cb.mock.calls[0][0];
      expect(cbParam1).toBe(payload);
    });
  });

  it("can unregister a given event", () => {
    const eventEmitter = new EventEmitter();
    const callback = jest.fn();
    eventEmitter.register("mouseClick", callback);
    eventEmitter.emit("mouseClick", {});
    eventEmitter.unregister("mouseClick", callback);
    eventEmitter.emit("mouseClick", {});
    eventEmitter.emit("mouseClick", {});
    eventEmitter.emit("mouseClick", {});
    expect(callback.mock.calls.length).toBe(1);
  });

  it("can unregister a given event and preserve other registrations", () => {
    const eventEmitter = new EventEmitter();
    const callbacks = [jest.fn(), jest.fn(), jest.fn()];
    eventEmitter.register("mouseClick", callbacks[0]);
    eventEmitter.register("mouseClick", callbacks[1]);
    eventEmitter.register("mouseClick", callbacks[2]);

    eventEmitter.unregister("mouseClick", callbacks[1]);

    eventEmitter.emit("mouseClick", {});
    expect(callbacks[0].mock.calls.length).toBe(1);
    expect(callbacks[1].mock.calls.length).toBe(0);
    expect(callbacks[2].mock.calls.length).toBe(1);
  });

  it("can unregister EVERY callbacks from a given event", () => {
    const eventEmitter = new EventEmitter();
    const callbacks = [jest.fn(), jest.fn(), jest.fn()];
    eventEmitter.register("mouseClick", callbacks[0]);
    eventEmitter.register("mouseClick", callbacks[1]);
    eventEmitter.register("mouseClick", callbacks[2]);
    eventEmitter.unregisterAll("mouseClick");
    eventEmitter.emit("mouseClick", {});
    expect(callbacks[0].mock.calls.length).toBe(0);
    expect(callbacks[1].mock.calls.length).toBe(0);
    expect(callbacks[2].mock.calls.length).toBe(0);
  });
});

// Generates a (virtually) unique object with a random alphanumeric key and random value
function getRandomPayload(): { [key: string]: number } {
  const key = Math.random().toString(36).slice(-5);
  const value = Math.random();
  return { [key]: value };
}
