export interface ParsedWebSocketMessage {

  readonly event:
    string;

  readonly data:
    unknown;

}


export class WebSocketMessageParser {

  public parse(
    message: string,
  ): ParsedWebSocketMessage {

    const parsed =
      JSON.parse(message);

    return {
      event:
        parsed.event ??
        "unknown",

      data:
        parsed,
    };

  }

}
