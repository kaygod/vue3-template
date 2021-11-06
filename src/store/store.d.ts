import { HomeType } from "./modules/HomePage";
import { GlobalType } from "./modules/Global";

export interface RootState {
  content:string
}

export interface ModuleState {
  HomePage:HomeType,
  Global:GlobalType
}

export interface AllState extends RootState,ModuleState {}

