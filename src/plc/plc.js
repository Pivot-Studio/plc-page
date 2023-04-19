import * as wasm from "./plc_bg.wasm";
import { __wbg_set_wasm } from "./plc_bg.js";
__wbg_set_wasm(wasm);
export * from "./plc_bg.js";
