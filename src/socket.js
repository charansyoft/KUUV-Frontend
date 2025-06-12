// src/utils/socket.js
import { io } from "socket.io-client";
import BASE_URL from "../config";

const socket = io(`${BASE_URL}`); // Change to your backend URL

export default socket;
