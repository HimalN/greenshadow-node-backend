import express from 'express';
import cors from 'cors';
import equipmentRoutes from "./routes/equipment-routes";
import cropsRoutes from "./routes/crop-routes";
import cropLogsRoutes from "./routes/crop-logs-routes";
import userAuthenticationRoutes, {authenticateToken} from "./routes/user-authentication-routes";

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",  // Allow frontend requests
    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true
}));

console.log("SECRET_KEY", process.env.SECRET_KEY);

app.use('/auth', userAuthenticationRoutes);

app.use(authenticateToken);

app.use('/equipment', equipmentRoutes);
app.use('/crops', cropsRoutes);
app.use('/crop-logs', cropLogsRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});