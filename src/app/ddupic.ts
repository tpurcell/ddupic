import {DdupicItem} from './ddupic-item';
import {DdupicDupItem} from './ddupic-dup-item';

export interface Ddupic {
  ddupicName: string;
  ddupicPath: string;
  fileCount: number;
  dupCount: number;
  createdAt: number;
  updatedAt: number;
  ddupicItems: Array<DdupicItem>;
  ddupicDupItems: Array<DdupicDupItem>;
}

