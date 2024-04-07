import { makeApp } from "./app";

const app = makeApp();

const server = app.listen(process.env.PORT || 5001, () => {
  const address = server.address();

  if (typeof address !== "string") {
    const href = `http://localhost:${address?.port}`;

    console.log(`Backend is running at ${href}`);
  } else {
    console.log(`Backend is running at ${address}`);
  }
});

process.on("uncaughtException", (error) => {
  console.log(`Uncaught Exception occurred: ${error.message}`);
});
