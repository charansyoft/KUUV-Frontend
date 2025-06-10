// src/utils/socket.js
import { io } from "socket.io-client";

const socket = io("http://192.168.29.75:3000"); // Change to your backend URL

export default socket;
