const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    credentials: true
  }
});


function generateRandomWeatherData() {
  return {
    device_id: "simulated_sensor_001",
    temperature: +(20 + Math.random() * 15).toFixed(2), 
    humidity: +(40 + Math.random() * 50).toFixed(2),    
    pressure: +(1000 + Math.random() * 30).toFixed(2),  // 1000 to 1030 hPa
    wind_speed: +(Math.random() * 15).toFixed(2),       
    wind_direction: ["N","NE","E","SE","S","SW","W","NW"][Math.floor(Math.random()*8)],
    timestamp: new Date().toISOString()
  };
}

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  
  socket.emit('update-temp', generateRandomWeatherData());

  
  const intervalId = setInterval(() => {
    const data = generateRandomWeatherData();
    socket.emit('update-temp', data);
  }, 2000);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    clearInterval(intervalId);
  });
});

server.listen(4000, () => {
  console.log('Server listening on http://localhost:4000');
});
