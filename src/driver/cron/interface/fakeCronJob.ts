import type { CronJobHandle } from './interface.js';

export interface FakeCronJob extends CronJobHandle {
  readonly expression: string;
  readonly onTick: () => void | Promise<void>;
  readonly started: boolean;
}
