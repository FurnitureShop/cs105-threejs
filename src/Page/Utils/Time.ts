import { EventEmitter } from 'events';

export default class Time extends EventEmitter {
  private start: number;
  private current: number;
  // Time pass from the beginning to the current time
  elapsed: number;
  // Time pass from the last update to the current time
  delta: number;

  constructor() {
    super();
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    this.update();
  }

  update() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.emit("update");
    window.requestAnimationFrame(() => this.update());
  }
}