import {
  bangbangtang,
  binkuai,
  foodTitle,
  hanbobo,
  hebaodan,
  huafubin,
  huoguo,
  juzizhi,
  kuangquanshui,
  lajiao,
  niunai,
  regou,
  roujiamo,
  sanminzhi,
  shizi,
  shutiao,
  xuegao,
  youtiao,
} from "../svg";
import { loadSVGString } from "../fabric";

export interface DataItem {
  svg?: string | [string];
  img?: string;
  text: string;
  audio?: string;
  audioShort?: string;
}

export interface DataConfig {
  list: DataItem[];
  getTitleObj: () => Promise<fabric.Object>;
}
