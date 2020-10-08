import { TapMnRewardProvider } from "./MinterRewardProvider";

describe("Reward Provider test", () => {
  test("tap.mn push create success", async () => {
    let tap = new TapMnRewardProvider();
    let link = await tap.createPush();
    
    return expect(link.length).toBeGreaterThan(3);
  });
});
