import { createJobController, deleteJobController, getAllJobsController, getJobController, updateJobController } from "@/controllers/job.controller";
import { Router } from "express";

const jobRoutes = Router();
jobRoutes.route('/').post(createJobController).get(getAllJobsController);
jobRoutes.route('/:id').get(getJobController).patch(updateJobController).delete(deleteJobController);

export default jobRoutes;