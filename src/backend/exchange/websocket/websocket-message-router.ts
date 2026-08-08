import type {
  WebSocketMessageHandler,
} from "../contracts/websocket-message-handler";

export class WebSocketMessageRouter {

  public constructor(
    private readonly handler:
      WebSocketMessageHandler,
  ) {}

  public async route(
    message: string,
  ): Promise<void> {

    await this.handler.handleMessage(
      message,
    );

  }

}
