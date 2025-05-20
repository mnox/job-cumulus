import type { Job } from '~/data/jobs/Job';
import MockController from '~/services/mock/controllers/MockController';
import { mockJobs } from '~/services/mock/data/jobs';

class JobController extends MockController<Job> {
  mockResource = mockJobs;
  resourceKey = 'jobs';
}

export default new JobController()