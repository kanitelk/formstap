import axios from "axios";

enum PushServiceProviders {
  TapMn,
  MinterPush,
}

interface MinterRewardProvider {
  pushServiceProvider: PushServiceProviders;
  createPush(): Promise<string>;
  runMultisend(formId: string): any;
}

type QueueItem = {
  address: string;
  coin: string;
  amount: string;
  pushLink: string;
}

export class TapMnRewardProvider implements MinterRewardProvider {
  pushServiceProvider: PushServiceProviders.TapMn;
  private _queue: QueueItem[] = [];
  constructor() {}

  async createPush(): Promise<string> {
    const url = "https://api.tap.mn/api/new";
    try {
      let res = await (await axios.post(url)).data
      return "https://tap.mn/" + res.link
    } catch (error) {
      throw error
    }
  }

  addToQueue (item: QueueItem): void {
    this._queue.push(item);
  }

  runMultisend() {
    return 123
  }
}
