import * as THREE from "three";
import Renderer from "./Renderer";
import Time from "./Utils/Time";
import Sizes from "./Utils/Size";
import Camera from "./Camera";
import World from "./World/World";
import Resources from "./Utils/Resources";
import assets from "./Utils/assets";
import Preloader from "../Homepage/Preloader";
// import Preloader from "./Preloader";
// import World from './World/World';
// import Resources from "./Utils/Resources";
// import assets from '../Homepage/Utils/assets'

export default class Page {
	static instance: Page;
	canvas?: Element;
	scene!: THREE.Scene;
	time!: Time;
	sizes!: Sizes;
	camera!: Camera;
	renderer!: Renderer;
	resources!: Resources;
	// theme: any;
	world!: World;
	preloader!: Preloader;

	constructor(canvas?: Element) {
		if (Page.instance) {
			return Page.instance;
		}
		Page.instance = this;
		this.canvas = canvas;
		this.scene = new THREE.Scene();
		this.time = new Time();
		this.sizes = new Sizes();
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.resources = new Resources(assets);
		this.world = new World();
		this.preloader = new Preloader();
		// this.theme = new Theme();

		this.time.on("update", () => {
			this.update();
		});
	}

	// 	this.preloader.on("enablecontrols", () => {
	// 		this.controls = new Controls();
	// 	});

	// 	this.sizes.on("resize", () => {
	// 		this.resize();
	// 	});

	// }

	// resize() {
	// 	this.camera.resize();
	// 	this.world.resize();
	// 	this.renderer.resize();
	// }

	update() {
		// this.preloader.update();
		this.camera.update();
		this.world.update();
		this.renderer.update();
		// if (this.controls) {
		// 	this.controls.update();
		// }
	}
}

// export default class Page extends EventEmitter {
// 	canvas: Element | null | undefined;
// 	private currentPage: any;

// 	constructor(canvas: Element | null) {
// 		super();
// 		this.canvas = canvas;

// 		this.currentPage = new HomePage();
// 		/** Loop throught page index to add page router link */
// 		for (let page in PAGE_INDEX) {
// 			/**
// 			 * Because use enum with value is number so [page] contain key and number value
// 			 * => Check and skip all case is number
// 			 */
// 			if (isNaN(Number(page))) {
// 				// Add page router
// 				switch (Number(page)) {
// 					case PAGE_INDEX.HOME_PAGE:
// 						this.routers[page] = new HomePage(canvas);
// 						break;
// 					case PAGE_INDEX.ROOM_BATHROOM:
// 						this.routers[page] = new Experience(canvas);
// 						break;
// 					case PAGE_INDEX.ROOM_KITCHEN:
// 						this.routers[page] = new Experience(canvas);
// 						break;
// 					case PAGE_INDEX.ROOM_BED1:
// 						this.routers[page] = new Experience(canvas);
// 						break;
// 					case PAGE_INDEX.ROOM_BED2:
// 						this.routers[page] = new Experience(canvas);
// 						break;
// 				}
// 			}
// 		}

// 		this.attachChangePageListener();
// 	}

// 	attachChangePageListener() {
// 		// this.routers[0].on('selectroom', (roomIndex: PAGE_INDEX) => {
// 		//   switch (roomIndex) {
// 		//     case PAGE_INDEX.HOME_PAGE:
// 		//       this.canvas.
// 		//       break;
// 		//     case PAGE_INDEX.HOME_PAGE:
// 		//       this.routers[page] = new Experience(canvas);
// 		//       break;
// 		//     case PAGE_INDEX.HOME_PAGE:
// 		//       this.routers[page] = new Experience(canvas);
// 		//       break;
// 		//     case PAGE_INDEX.HOME_PAGE:
// 		//       this.routers[page] = new Experience(canvas);
// 		//       break;
// 		//   }
// 		// })
// 	}
// }
