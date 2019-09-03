import {DdupicItem} from './ddupic-item';

export interface Ddupic {
  ddupicName: string;
  ddupicPath: string;
  fileCount: number;
  createdAt: number;
  updatedAt: number;
  ddupicItems: Array<DdupicItem>;
}
