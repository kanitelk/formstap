import cron from "node-cron";

const tasks = () => {
  const getProductTask = cron.schedule("*/15 * * * *", () => {});
  const updateStorageTask = cron.schedule("*/15 * * * *", () => {});

  getProductTask.start();
  updateStorageTask.start();
};

export default tasks