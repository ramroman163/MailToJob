import { config } from "../config/emailConfig.js";
import { emailChecker } from "./checkers.js";

export async function bodyParser (body) {
  const obj = {};
  let serverConfig = null;

  try {
    serverConfig = await getServerConfig(body.type);

    obj.sender = body.sender
    obj.receiver = emailChecker(body.receiver);
    obj.text = body.text;
    obj.subject = body.subject;

    console.log(obj);
    obj.auth = {
      user: emailChecker(body.email),
      pass: body.password
    };

    obj.config = serverConfig;

    return obj;

  } catch (error) {
    console.log(error)
    return {
      error: true,
      message: "Body parser error"
    }
  }
}

async function getServerConfig (type) {
  const serverConfig = config.find(configObj => configObj.type === type)
  console.log(serverConfig)

  if (serverConfig) {
    return serverConfig

  } else {
    throw error;
  }
}