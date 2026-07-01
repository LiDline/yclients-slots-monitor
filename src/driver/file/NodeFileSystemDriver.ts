import { readFile, writeFile } from 'node:fs/promises';

import type { FileSystemDriver } from './interface/interface.js';

export class NodeFileSystemDriver implements FileSystemDriver {
  public readFile(path: string, encoding: BufferEncoding): Promise<string> {
    return readFile(path, { encoding });
  }

  public writeFile(path: string, data: string): Promise<void> {
    return writeFile(path, data);
  }
}
