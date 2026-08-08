export interface WebSocketEventHandler {

  onConnect():
    Promise<void>;

  onDisconnect():
    Promise<void>;

  onError(
    error: Error,
  ): Promise<void>;

}
