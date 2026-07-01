import type { CronJobHandle } from './interface.js';

export interface CronDriver {
  createJob(expression: string, onTick: () => void | Promise<void>): CronJobHandle;
}
