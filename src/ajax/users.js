import axios from "axios";
import url from "./url";

function get() {
  return axios(`${url}users`);
}

export default { get };
