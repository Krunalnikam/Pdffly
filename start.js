// Cloud Run and container entry point
// Ensures the server binds to 0.0.0.0 and listens on the assigned Cloud Run PORT
process.env.HOST = process.env.HOST || "0.0.0.0";
process.env.PORT = process.env.PORT || "3000";
process.env.NITRO_HOST = process.env.NITRO_HOST || "0.0.0.0";
process.env.NITRO_PORT = process.env.NITRO_PORT || "3000";

await import("./dist/server/index.mjs");
