import { EventEmitter } from "events";

export default class Sizes extends EventEmitter {
    width: number;
    height: number;
    aspect: number;
    pixelRatio: number;
    frostum: number;

    constructor() {
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.frostum = 5;

       window.addEventListener("resize", () => {
         //   console.log(this)
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.aspect = this.width / this.height;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.emit("resize");
        })
    }
}