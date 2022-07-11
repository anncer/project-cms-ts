import { Message } from "element-ui";

export default (...args) => {
  // type, msg, duration = 3000
  const length = args.length;
  if (!length) return;
  const type = length === 1 ? "success" : args[0];
  const msg = length === 1 ? args[0] : args[1];
  const duration = length >= 3 ? args[2] : 3000;

  Message({
    message: msg,
    type,
    duration
  });
};
