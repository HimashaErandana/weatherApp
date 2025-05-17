
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';


const socket = io("http://localhost:4000", {
  transports: ['websocket', 'polling'],
});

function TemperatureDisplay() {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("update-temp", (data) => {
      console.log("Received sensor data:", data);
      setSensorData(data);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("update-temp");
      socket.off("connect");
    };
  }, []);

  const WeatherItem = ({ label, value }) => (
  <p style={{
    marginBottom: '12px',
    fontSize: '16px',
    color: '#333'
  }}>
    <strong style={{ color: '#0077cc' }}>{label}:</strong> {value}
  </p>
);


  return (
    <div style={{
          padding: '40px',
          fontFamily: 'Segoe UI, Arial, sans-serif',
          backgroundColor: '#f4f7f9',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '30px 40px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            width: '100%'
          }}>
            <h2 style={{
              color: '#0077cc',
              marginBottom: '24px',
              textAlign: 'center'
            }}>🌡️ Real-time Weather Monitor</h2>

            {sensorData ? (
              <div>
                <WeatherItem label="Device ID" value={sensorData.device_id} />
                <WeatherItem label="Temperature" value={`${sensorData.temperature} °C`} />
                <WeatherItem label="Humidity" value={`${sensorData.humidity} %`} />
                <WeatherItem label="Pressure" value={`${sensorData.pressure} hPa`} />
                <WeatherItem label="Wind Speed" value={`${sensorData.wind_speed} m/s`} />
                <WeatherItem label="Wind Direction" value={sensorData.wind_direction} />
                <WeatherItem label="Timestamp" value={new Date(sensorData.timestamp).toLocaleString()} />
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#777' }}>⏳ Waiting for sensor data...</p>
            )}
          </div>
        </div>

  );
}

export default TemperatureDisplay;
