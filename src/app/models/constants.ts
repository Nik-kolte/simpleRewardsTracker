import { Reward } from "./app.context";

export const TASK_COLLECTION_ID = "tasks";
export const APPDATA_COLLECTION_ID = "appdata";
export const LOG_COLLECTION_ID = "logs";
export const REWARD_COLLECTION_ID = "redeemed";

export const POINTS_ID = "heart_points";

export const RewardList: Array<Reward> = [
  {
    name: "Chocolate Dish PREMIUM!",
    cost: 200,
  },
  {
    name: "Pizza",
    cost: 130,
  },
  {
    name: "Brownie",
    cost: 100,
  },
  {
    name: "Subway",
    cost: 80,
  },
  {
    name: "Fries",
    cost: 60,
  },
  {
    name: "Outside Food (Unhealty)",
    cost: 20,
  },
  {
    name: "Naan",
    cost: 20,
  },
  {
    name: "Rice",
    cost: 10,
  },
];
