import { config } from "../config/emailConfig.js";
import { emailChecker } from "./checkers.js";
import { configError } from "./errors.js";

export async function bodyParser (body) {
  const obj = {};
  let serverConfig = null;

  try {
    serverConfig = await getServerConfig(body.type);

    obj.sender = body.sender
    obj.receiver = emailChecker(body.receiver);
    obj.text = body.text;
    obj.subject = body.subject;

    obj.auth = {
      user: emailChecker(body.email),
      pass: body.password
    };

    obj.config = serverConfig;

    return obj;

  } catch (e) {
    throw configError('"[ Body parser error ]" + " " ' + e.message);
  }
}

async function getServerConfig (type) {
  const serverConfig = config.find(configObj => configObj.type === type)
  //console.log(serverConfig)

  if (serverConfig) {
    return serverConfig

  } else {
    throw configError("No se encontró la configuración");
  }
}