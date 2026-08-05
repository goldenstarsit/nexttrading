import type {
  WebSocketMessageHandler,
} from "../contracts/websocket-message-handler";

export class DefaultWebSocketMessageHandler
  implements WebSocketMessageHandler {

  public async handleMessage(
    message: string,
  ): Promise<void> {

    void message;

  }

}
