import type {
  WebSocketEventHandler,
} from "../contracts/websocket-event-handler";

export class WebSocketErrorHandler {

  public constructor(
    private readonly eventHandler:
      WebSocketEventHandler,
  ) {}

  public async handle(
    error: Error,
  ): Promise<void> {

    await this.eventHandler.onError(
      error,
    );

  }

}
