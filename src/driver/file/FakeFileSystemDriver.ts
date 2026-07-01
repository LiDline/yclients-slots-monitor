import type { FileSystemDriver } from './interface/interface.js';

export class FakeFileSystemDriver implements FileSystemDriver {
  public constructor(private readonly files = new Map<string, string>()) {}

  public readFile(path: string): Promise<string> {
    return Promise.resolve(this.files.get(path) ?? '');
  }

  public writeFile(path: string, data: string): Promise<void> {
    this.files.set(path, data);
    return Promise.resolve();
  }
}
