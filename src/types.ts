export enum EventType {
  mouseClick = "mouseClick",
  keyPress = "keyPress",
  pageScroll = "pageScroll",
  windowResize = "windowResize",
}

export interface MouseClickPayload {
  x: number;
  y: number;
}

export interface KeyPressPayload {
  keyCode: number;
}

export interface PageScrollPayload {
  origin: number;
  delta: number;
}

export interface WindowResizePayload {
  width: number;
  height: number;
}

export type AnyEventPayload =
  | MouseClickPayload
  | KeyPressPayload
  | PageScrollPayload
  | WindowResizePayload;
