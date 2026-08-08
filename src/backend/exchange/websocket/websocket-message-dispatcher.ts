import type {
  WebSocketMessageHandler,
} from "../contracts/websocket-message-handler";

import {
  WebSocketMessageParser,
} from "./websocket-message-parser";


export class WebSocketMessageDispatcher {

  private readonly parser =
    new WebSocketMessageParser();


  public constructor(
    private readonly handler:
      WebSocketMessageHandler,
  ) {}


  public async dispatch(
    message: string,
  ): Promise<void> {

    const parsed =
      this.parser.parse(
        message,
      );

    await this.handler.handleMessage(
      JSON.stringify(parsed.data),
    );

  }

}
