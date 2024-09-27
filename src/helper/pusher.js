import Pusher from "pusher-js";

const { REACT_APP_PUSHER_KEY, REACT_APP_PUSHER_CLUSTER } = process.env;

const pusher = new Pusher(REACT_APP_PUSHER_KEY, {
  cluster: REACT_APP_PUSHER_CLUSTER,
  encrypted: true,
});

export default pusher;
