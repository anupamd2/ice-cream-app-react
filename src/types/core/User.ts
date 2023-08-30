import IceCreamPreference from "./IceCreamPreference";

interface User {
  username: string;
  password: string;
  iceCreamPreferences: IceCreamPreference[];
}

export default User;
