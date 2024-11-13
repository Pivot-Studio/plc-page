import registerPromiseWorker from 'promise-worker/register'
// import * as pl from '@pivot-lang/pivot-lang';
import { WorkerInvokeRequest } from './workerTypes';

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
registerPromiseWorker(async (message: WorkerInvokeRequest) => {
  try {
    // return "aa";
    let pl = (await import('@pivot-lang/pivot-lang'));
    // sometimes it returns undefined in first few run. So, we need to wait for it to load
    while (!pl) {
      await timeout(100);
      pl = await import('@pivot-lang/pivot-lang');
    }
    return JSON.parse((pl[message.fn as keyof typeof pl] as any)(...message.params));
    // pl.set_init_content(message.params[0]);
  } catch (error) {
    console.error(error);
    return "error";
  }
  // (pl[message.fn as keyof typeof pl] as any)(...message.params); 
  return 'done';
})
