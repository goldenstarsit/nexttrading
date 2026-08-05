import {
  PluginError,
} from "./plugin-error";


export class ConfigurationError
  extends PluginError {

  constructor(
    message: string,
  ) {

    super(message);

    this.name =
      "ConfigurationError";

  }

}
