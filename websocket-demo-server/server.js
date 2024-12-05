const WebSocket = require('ws');

// tạo ws server chạy trên cổng 3002
const server = new WebSocket.Server({ port: 3002 });

let connectionCount = 0;

server.on('connection', (ws) => {
  connectionCount++;
  console.log('New client connected.');

  // gởi dữ liệu tới client mỗi 1 giây
  const interval = setInterval(() => {
    const data = {
      time: new Date().toLocaleTimeString(),
      connections: connectionCount,
    };
    ws.send(JSON.stringify(data));
  }, 1000);

  // xử lý khi client đóng kết nối
  ws.on('close', () => {
    connectionCount--;
    clearInterval(interval);
    console.log('Client disconnected.');
  });
});

console.log('WebSocket server running on ws://localhost:3002');
