import { EventEmitter } from "events";
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { AssetType } from "./assets";
import Page from "../Page";

type LoaderModel = {
  gltfLoader?: GLTFLoader,
  dracoLoader?: DRACOLoader,
}

export default class Resources extends EventEmitter {
  private page: Page;
  renderer: any;
  private assets: AssetType[];
  items: any = {};
  private queue: any;
  private loaded: number = 0;
  private loaders: LoaderModel = {};

  constructor(assets: AssetType[]) {
    super();

    this.page = new Page();
    this.renderer = this.page.renderer;

    this.assets = assets;
    this.queue = this.assets.length;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath('../node_modules/three/examples/jsm/libs/draco/');
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }

  startLoading() {
    for (const asset of this.assets) {
      if(asset.type === "glbModel") {
        this.loaders.gltfLoader?.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        })
      }
    }
  }

  singleAssetLoaded(asset: AssetType, file: GLTF) {
    this.items[asset.name] = file;
    this.loaded++;
    if(this.loaded === this.queue) {
      this.emit("ready");
    }
  }
}
