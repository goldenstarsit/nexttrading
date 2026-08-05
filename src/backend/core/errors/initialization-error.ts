import {
  PluginError,
} from "./plugin-error";


export class InitializationError
  extends PluginError {

  constructor(
    message: string,
  ) {

    super(message);

    this.name =
      "InitializationError";

  }

}
