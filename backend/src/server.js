const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const logger = require("./configs/winston.config.js");
const crypto = require("crypto");
const compression = require("compression");
const connectDb = require("./configs/mongodb.config.js");
const { errorHandler } = require("./middlewares/error.handler.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./configs/swagger.config.js");
require("dotenv").config();

// Routes
const olamapsRoutes = require("./routes/olamaps.route.js");
const rideRoutes = require("./routes/ride.route.js");
const userRoutes = require("./routes/user.route.js");
const authRoutes=require("./routes/user.login.route.js");

// Connect to the database
connectDb();

// Middleware setup
server.use(compression());

server.use(
  cors({
    origin: [process.env.ORIGIN, process.env.ORIGIN1],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to generate a CSP nonce
server.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(32).toString("base64");
  next();
});

// Configure Helmet for enhanced security
server.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`],
        styleSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`],
        imgSrc: ["'self'", "data:"],
        objectSrc: ["'none'"],
        fontSrc: ["'self'"],
        frameSrc: ["'self'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: { policy: "require-corp" },
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    strictTransportSecurity: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    xContentTypeOptions: true,
    dnsPrefetchControl: { allow: false },
    frameguard: { action: "deny" },
    originAgentCluster: true,
  })
);

server.use(express.json());
server.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route setup
server.use("/api/olamaps", olamapsRoutes);
server.use("/api/users", userRoutes);
server.use("/api/auth", authRoutes);
server.use("/api/rides", rideRoutes);

// Error handling middleware
server.use(errorHandler);

// Global error handling for uncaught exceptions and unhandled rejections
process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection: ${reason}`);
  process.exit(1);
});

// Graceful shutdown
const shutdown = () => {
  logger.info(`Worker ${process.pid} shutting down gracefully.`);
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Start the server
const port = process.env.SOURCE_PORT || 3000;
server.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
  logger.info(`Server is listening at port ${port}`);
  logger.info(
    `Swagger Docs available at http://${process.env.SOURCE}:${port}/api/api-docs`
  );
});
