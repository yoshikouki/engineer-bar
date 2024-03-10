import { Context, MiddlewareHandler } from "hono";

/**
 * WebSocket Event Listeners type
 */
export interface WSEvents {
  onOpen?: (evt: Event, ws: WSContext) => void;
  onMessage?: (evt: MessageEvent<WSMessageReceive>, ws: WSContext) => void;
  onClose?: (evt: CloseEvent, ws: WSContext) => void;
  onError?: (evt: Event, ws: WSContext) => void;
}

export type UpgradedWebSocketResponseInputJSONType = "__websocket" | undefined;

/**
 * Upgrade WebSocket Type
 */
export type UpgradeWebSocket = (
  createEvents: (c: Context) => WSEvents | Promise<WSEvents>,
) => MiddlewareHandler<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  any,
  string,
  {
    in: {
      json: UpgradedWebSocketResponseInputJSONType;
    };
  }
>;

export type WSReadyState = 0 | 1 | 2 | 3;

export type WSContext = {
  send(
    source: string | ArrayBuffer | Uint8Array,
    options?: {
      compress: boolean;
    },
  ): void;
  raw?: unknown;
  binaryType: BinaryType;
  readyState: WSReadyState;
  url: URL | null;
  protocol: string | null;
  close(code?: number, reason?: string): void;
};

export type WSMessageReceive = string | Blob | ArrayBufferLike;

export const createWSMessageEvent = (
  source: WSMessageReceive,
): MessageEvent<WSMessageReceive> => {
  return new MessageEvent<WSMessageReceive>("message", {
    data: source,
  });
};

interface BunServerWebSocket<T> {
  send(data: string | ArrayBufferLike, compress?: boolean): void;
  close(code?: number, reason?: string): void;
  data: T;
  readyState: 0 | 1 | 2 | 3;
}
interface BunServer {
  upgrade<T>(
    req: Request,
    options?: {
      data: T;
    },
  ): boolean;
}
interface BunWebSocketHandler<T> {
  open(ws: BunServerWebSocket<T>): void;
  close(ws: BunServerWebSocket<T>, code?: number, reason?: string): void;
  message(ws: BunServerWebSocket<T>, message: string | Buffer): void;
}
interface CreateWebSocket {
  (): {
    upgradeWebSocket: UpgradeWebSocket;
    websocket: BunWebSocketHandler<BunWebSocketData>;
  };
}
export interface BunWebSocketData {
  connId: number;
  url: URL;
  protocol: string;
}

const createWSContext = (
  ws: BunServerWebSocket<BunWebSocketData>,
): WSContext => {
  return {
    send: (source, options) => {
      const sendingData =
        typeof source === "string"
          ? source
          : source instanceof Uint8Array
            ? source.buffer
            : source;
      ws.send(sendingData, options?.compress);
    },
    raw: ws,
    binaryType: "arraybuffer",
    readyState: ws.readyState,
    url: ws.data.url,
    protocol: ws.data.protocol,
    close(code, reason) {
      ws.close(code, reason);
    },
  };
};

export const createBunWebSocket: CreateWebSocket = () => {
  const websocketConns: WSEvents[] = [];

  const upgradeWebSocket: UpgradeWebSocket = (createEvents) => {
    return async (c, next) => {
      const server = c.env as BunServer;
      const connId = websocketConns.push(await createEvents(c)) - 1;
      const upgradeResult = server.upgrade<BunWebSocketData>(c.req.raw, {
        data: {
          connId,
          url: new URL(c.req.url),
          protocol: c.req.url,
        },
      });
      if (upgradeResult) {
        return new Response(null);
      }
      await next(); // Failed
    };
  };
  const websocket: BunWebSocketHandler<BunWebSocketData> = {
    open(ws) {
      const websocketListeners = websocketConns[ws.data.connId];
      if (websocketListeners.onOpen) {
        websocketListeners.onOpen(new Event("open"), createWSContext(ws));
      }
    },
    close(ws, code, reason) {
      const websocketListeners = websocketConns[ws.data.connId];
      if (websocketListeners.onClose) {
        websocketListeners.onClose(
          new CloseEvent("close", {
            code,
            reason,
          }),
          createWSContext(ws),
        );
      }
    },
    message(ws, message) {
      const websocketListeners = websocketConns[ws.data.connId];
      if (websocketListeners.onMessage) {
        const normalizedReceiveData =
          typeof message === "string"
            ? message
            : (message.buffer satisfies WSMessageReceive);

        websocketListeners.onMessage(
          createWSMessageEvent(normalizedReceiveData),
          createWSContext(ws),
        );
      }
    },
  };
  return {
    upgradeWebSocket,
    websocket,
  };
};
