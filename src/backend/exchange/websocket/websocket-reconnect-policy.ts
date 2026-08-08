export interface WebSocketReconnectPolicy {

  readonly maxAttempts:
    number;

  readonly delayMs:
    number;

}


export class DefaultWebSocketReconnectPolicy
  implements WebSocketReconnectPolicy {

  public readonly maxAttempts =
    5;

  public readonly delayMs =
    3000;

}
