import User from "../types/core/User";

const initial_data: User[] = [
  {
    username: "userA",
    password: "passwordA",
    iceCreamPreferences: [
      {
        flavour: "Vanilla",
        notes: "I like it with chocolate syrup",
      },
      {
        flavour: "Chocolate",
        notes: "Best when it's dark chocolate",
      },
      {
        flavour: "Strawberry",
        notes: "Needs more strawberries",
      },
    ],
  },
  {
    username: "userB",
    password: "passwordB",
    iceCreamPreferences: [
      {
        flavour: "Chocolate",
        notes: "Love it with nuts",
      },
      {
        flavour: "Strawberry",
        notes: "More cream please",
      },
      {
        flavour: "Vanilla",
        notes: "Plain and simple",
      },
    ],
  },
  {
    username: "userC",
    password: "passwordC",
    iceCreamPreferences: [
      {
        flavour: "Strawberry",
        notes: "Perfect with a waffle",
      },
      {
        flavour: "Vanilla",
        notes: "Great with sprinkles",
      },
      {
        flavour: "Chocolate",
        notes: "More chocolate chips please",
      },
    ],
  },
];

export default initial_data;
