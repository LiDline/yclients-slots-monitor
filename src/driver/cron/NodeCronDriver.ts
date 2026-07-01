import { CronJob } from 'cron';

import type { CronDriver, CronJobHandle, NodeCronDriverConfig } from './interface/interface.js';

export class NodeCronDriver implements CronDriver {
  public constructor(private readonly config: NodeCronDriverConfig = {}) {}

  public createJob(expression: string, onTick: () => void | Promise<void>): CronJobHandle {
    if (this.config.timeZone) {
      return CronJob.from({
        cronTime: expression,
        onTick,
        start: false,
        timeZone: this.config.timeZone,
      });
    }

    return CronJob.from({
      cronTime: expression,
      onTick,
      start: false,
    });
  }
}
