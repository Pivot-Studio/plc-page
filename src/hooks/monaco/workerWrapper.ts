import PromiseWorker from "promise-worker";
// @ts-ignore
import PLWorker from './worker?worker';
import { WorkerInvokeRequest } from "./workerTypes";


const worker = new PLWorker();

const promiseWorker = new PromiseWorker(worker);


export default new Proxy({} as any, {
  get: function get(target, name) {
    return async function wrapper() {
      var args = Array.prototype.slice.call(arguments);
      return await promiseWorker.postMessage({
        fn: name,
        params: args,
      });
    }
  }
});
