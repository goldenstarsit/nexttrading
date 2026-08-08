export interface WebSocketMessageHandler {

  handleMessage(
    message: string,
  ): Promise<void>;

}
