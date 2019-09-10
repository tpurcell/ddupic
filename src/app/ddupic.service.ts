import {Injectable} from '@angular/core';
import {IpcRenderer} from 'electron';

import {Ddupic} from './ddupic';

@Injectable({
  providedIn: 'root'
})
export class DdupicService {
  private ddupic: Ddupic;
  private ipc: IpcRenderer;

  constructor() {
    if ((window as any).require) {
      try {
        this.ipc = (window as any).require('electron').ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn('Could not load electron');
    }
  }

  async runDdupic(name: string, path: string) {
    const now = Date.now();
    this.ddupic = {
      ddupicName: name,
      ddupicPath: path,
      fileCount: 0,
      dupCount: 0,
      createdAt: now,
      updatedAt: now,
      ddupicItems: [],
      ddupicDupItems: []
    };

    await this.processDdupic(this.ddupic);
  }

  processDdupic(ddupic: Ddupic) {
    return new Promise<boolean>((resolve) => {
      this.ipc.once('processDdupicResponse', (event, arg) => {
        resolve(arg);
      });
      this.ipc.send('processDdupic', ddupic);
    });
  }

  async readDdupic(ddupicName: string) {
    return new Promise<string>((resolve) => {
      this.ipc.once('readDdupicResponse', (event, arg) => {
        resolve(arg);
      });
      this.ipc.send('readDdupic', ddupicName);
    });
  }

  listDdupics() {
    return new Promise<string[]>((resolve) => {
      this.ipc.once('listDdupicsResponse', (event, arg) => {
        resolve(arg);
      });
      this.ipc.send('listDdupics');
    });
  }

  async selectDirectory() {
    return new Promise<string>((resolve) => {
      this.ipc.once('selectDirectoryResponse', (event, arg) => {
        resolve(arg);
      });
      this.ipc.send('selectDirectory');
    });
  }
}
