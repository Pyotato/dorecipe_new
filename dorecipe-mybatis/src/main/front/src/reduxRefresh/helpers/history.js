import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
export const historylocation = history.location;
console.log("historylocation", history.location);
