import { IncomingMessage } from 'http';
import { Duplex } from 'stream';
import WebSocket from 'ws';

declare module 'ws' {
  interface WebSocket {
    isAlive: boolean;
  }
}

export const heartbeat = (ws: WebSocket.WebSocket) => () => {
  ws.isAlive = true;
  console.log('Heartbeat');
};

export const createInterval = (wss: WebSocket.Server, ms = 30000) => setInterval(() => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive) {
      console.log('Terminating the connection');
      return ws.terminate();
    }

    ws.isAlive = false;
    console.log('Sending a ping');
    ws.ping();
  });
}, ms);

export const onUpgrade = (wss: WebSocket.Server) => (req: IncomingMessage, socket: Duplex, head: Buffer) => {
  // ToDo: authentication

  wss.handleUpgrade(req, socket, head, ws => {
    wss.emit('connection', ws);
  });
};