import { appRouter } from "./trpc";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import { inferAsyncReturnType } from "@trpc/server";
import { stripeWebhookHandler } from "./webhooks";
import { BASE_URL } from "./constants";
import cookieParser from "cookie-parser";

const app = express();

const PORT = Number(process.env.PORT) || 3000;
const createContext = ({
 req,
 res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

export type ExpressContext = inferAsyncReturnType<typeof createContext>;

const start = async () => {
 app.use(cookieParser());
 app.post("/api/webhooks/stripe", stripeWebhookHandler);
 const payload = await getPayloadClient({
  initOptions: {
   express: app,
   onInit: async (cms) => {
    cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
   },
  },
 });
 app.use(
  "/api/trpc",
  trpcExpress.createExpressMiddleware({ router: appRouter, createContext })
 ),
  app.use((req, res) => nextHandler(req, res));
 nextApp.prepare().then(() => {
  payload.logger.info("Nextjs started");
  app.listen(PORT, async () => {
   payload.logger.info(`Nextjs app URL: ${BASE_URL}`);
  });
 });
};

start();
