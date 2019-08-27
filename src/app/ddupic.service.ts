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
      createdAt: now,
      updatedAt: now,
      ddupicItems: []
    };

    await this.writeDdupic(this.ddupic);
    console.log(`done: ${JSON.stringify(this.ddupic)}`);
  }

  // getDdupic(ddupicName: string) {
  //   return this.http.get(`/assets/${ddupicName}`);
  // }

  writeDdupic(ddupic: Ddupic) {
    return new Promise<boolean>((resolve) => {
      this.ipc.once('writeDdupicResponse', (event, arg) => {
        resolve(arg);
      });
      this.ipc.send('writeDdupic', ddupic);
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
    return new Promise<string[]>((resolve) => {
      this.ipc.once('selectDirectoryResponse', (event, arg) => {
        resolve(arg);
      });
      this.ipc.send('selectDirectory');
    });
  }
}
