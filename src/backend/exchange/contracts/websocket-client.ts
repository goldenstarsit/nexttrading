export interface WebSocketClient {

  connect():
    Promise<void>;

  disconnect():
    Promise<void>;

  isConnected():
    boolean;

}
