import express, { Express } from "express"
import JobTrackerServer from "./server";
import { databaseConnect } from "./server/database";
const initializeApp = (): void => {
  const app: Express = express();
  const jobtrackerServer = new JobTrackerServer(app);
  databaseConnect().then(()=>{
    jobtrackerServer.start();
  })
};

initializeApp();