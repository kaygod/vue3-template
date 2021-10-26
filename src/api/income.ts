import { fetch } from '@/util/common';
import { currencyType } from './deal';
/**
 * 3.16.	收益情况
 */
export const situation = (params: { currency: currencyType }) => {
  return fetch({
    url: '/income/situation',
    data: params,
  });
};

/**
 *
 * 3.17.	收益情况-产品列表
 */
export const productList = (params?: {
  currency: currencyType;
  page_no: number;
}) => {
  return fetch({
    url: '/income/product_list',
    data: params,
  });
};

export enum timeType {
  'week' = 1,
  'month' = 2,
  'current_year' = 3,
  'one_year' = 4, //近一年
  'now' = 5,
}

export interface machineType {
  machine_id: string;
  time_type: timeType;
  page_no: number;
}

/**
 *
 * 3.18.	收益明细
 */
export const machine = (params: machineType) => {
  return fetch({
    url: '/income/machine',
    data: params,
  });
};

/**
 *
 * 3.19.	收益情况-过期矿机
 */
export const historyMachine = (params: {
  currency: currencyType;
  page_no: number;
}) => {
  return fetch({
    url: '/income/history_machine',
    data: params,
  });
};
