export interface CronJobHandle {
  start(): void;
  stop(): void;
}
