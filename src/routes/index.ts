import { Express } from "express";
import authRoutes from "./auth.route";
import jobRoutes from "./jobs.route";
import errorHandlerMiddleware from "@/middleware/errorHandler";
import notFoundMiddleware from "@/middleware/notFound";
export const setUpRoutes = (app: Express) => {
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/jobs', jobRoutes);
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);
}