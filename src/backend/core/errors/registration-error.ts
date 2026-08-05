import {
  PluginError,
} from "./plugin-error";


export class RegistrationError
  extends PluginError {

  constructor(
    message: string,
  ) {

    super(message);

    this.name =
      "RegistrationError";

  }

}
