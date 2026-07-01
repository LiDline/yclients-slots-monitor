import type { CronDriver, CronJobHandle, FakeCronJob } from './interface/interface.js';

class FakeCronJobHandle implements FakeCronJob {
  public started = false;

  public constructor(
    public readonly expression: string,
    public readonly onTick: () => void | Promise<void>,
  ) {}

  public start(): void {
    this.started = true;
  }

  public stop(): void {
    this.started = false;
  }
}

export class FakeCronDriver implements CronDriver {
  public readonly jobs: FakeCronJob[] = [];

  public createJob(expression: string, onTick: () => void | Promise<void>): CronJobHandle {
    const job = new FakeCronJobHandle(expression, onTick);
    this.jobs.push(job);
    return job;
  }
}
