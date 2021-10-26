import { fetch, ResponseType, NoDataType } from '@/util/common';
import { payDataType } from '@/views/Extract/types';

export enum payTypes {
  alipay = 1, // 支付宝
  wechat = 2, //微信
  virpay = 3, // 币币支付
}

//轮播列表 3.6
export enum RotationPageType {
  home_page = 1, //首页的轮播
}

export interface RotationRequestType {
  type: RotationPageType; // 页面类型
  page_no?: number; //写死为1
}

export interface RotationResponseType {
  msg_list: RotationItemType[]; //返回轮播图的url
}

export interface RotationItemType {
  icon_url: string;
}

/**
 * @param type  页面类型
 */
export const GetRotation = (type?: RotationPageType) => {
  const params: RotationRequestType = {
    type: RotationPageType.home_page,
    page_no: 1,
  };
  if (type != undefined) {
    params.type = type;
  }
  return fetch<RotationResponseType, ResponseType<RotationResponseType>>({
    url: '/project4/rotation/get_list',
    data: params,
  });
};

//3.7 矿机列表
export interface minListReqType {
  page_no: number;
}

export interface minListItemResType {
  product_id: string; //产品id
  product_name: string; //产品名称
  icon_url: string; //图片路径
  unit_price: string; //单价
  parameter: [string, string][]; //二维数组 0 属性 1 值
}

export interface minListResType {
  msg_list: minListItemResType[];
  total: string;
}
/**
 * 矿机列表
 */
export const GetMinList = (params: minListReqType) => {
  return fetch<minListResType, ResponseType<minListResType>>({
    url: '/project4/product/get_list',
    data: params,
  });
};

//3.8 矿机详情

export interface minDetailReqType {
  product_id: string; // 产品id
}

export interface minDetailResType {
  product_name: string; // 产品名称
  icon_list: string[]; // 图片路径
  unit_price: string; // 单价
  parameter1: [string, string][]; // 二维数组 [属性名称,值]
  parameter2: [][]; // 二维数组 [属性名称,值1,值2,...] 规格参数
  parameter3: [string, string][]; // 二维数组 [属性名称,值] 产出分析对比
  introduction: string; //产品详情
}

/**
 * 矿机详情
 * @param params
 */
export const GetMinDetail = (params: minDetailReqType) => {
  return fetch<minDetailResType, ResponseType<minDetailResType>>({
    url: '/project4/product/detail',
    data: params,
  });
};

// 3.9 新增订单

//订单类型
export enum orderType {
  buy_min = 1, //购买矿机
  pay_electronic = 2, // 缴电费
}

//支付方式
export enum payType {
  alipay = 1,
  wechat = 2,
  virtual_money = 3, // 虚拟货币
}

export interface addOrderReqType {
  type: orderType; // 订单类型
  product_id: string; // 产品id
  product_quantity: string; // 购买数量
  electricity_months: string; // 电费月数
  payment_method: payType; // 缴费方式
  exchange_id?: string; // 当选择币币支付时,这个值必填
}

export interface addOrderResType {
  order_number: string; // 订单编号
  date: string; // 下单时间
  payment_method: payTypes; // 缴费方式
}

/**
 * 缴费方式过滤器
 */
export const payTypeFilter = (payment_method: number) => {
  const value = +payment_method;
  switch (value) {
    case payType.alipay:
      return '支付宝';
    case payType.wechat:
      return '微信';
    case payType.virtual_money:
      return '币币支付';
    default:
      return '';
  }
};

//3.9 新增订单
export const AddOrder = (params: addOrderReqType) => {
  return fetch<addOrderResType, ResponseType<addOrderResType>>({
    url: '/project4/order/add',
    data: params,
  });
};

export interface addElectricType {
  order_number: string; // 订单编号
  electricity_months: number; // 电费月数
  payment_method: payTypes; // 缴费方式
  exchange_id?: string; // 货币兑换id
}

// 3.10.	新增电费订单
export const addElectric = (params: addElectricType) => {
  return fetch({
    url: '/project4/order/add2',
    data: params,
  });
};

export enum listType {
  current = 1, //在期
  history = 2, //历史
}

export enum currencyType {
  CNY = 1, //人民币
  UDST = 10,
}

//5.2 矿机列表状态编码
export enum machineStatusType {
  wait_ensure = 1, //待确认
  wait_add = 2, // 待上架
  pay_electric = 3, // 续电费
  no_tip = 4, //不用提示
  freeze = 5, //冻结中
  was_due = 6, //已到期
  invalid = 7, //已失效
}

//5.3 电费列表状态编码
export enum electicStatusType {
  no_pass = 0, //  已审批,结果:不通过
  passed = 1, // 已审批,结果:通过
  wait_examine = 2, // 待审批
}

export const getEleBtnStatus = (type: number | string) => {
  type = +type;
  const colors = ['rgb(138,140,155)', 'rgb(158,223,215)', 'rgb(255,105,86)'];
  switch (type) {
    case electicStatusType.wait_examine:
      return {
        text: '待确认', //不能点
        color: colors[1],
        callback() {},
      };
    case electicStatusType.passed: // 审批通过,不显示
      return null;
    case electicStatusType.no_pass:
      return {
        text: '已失效', //不能点
        color: colors[0],
        callback() {},
      };
  }
};

//按钮状态
export const getBtnStatus = (
  type: number | string,
  fn_ob?: { [key: number]: Function }
) => {
  type = +type;
  const colors = ['rgb(138,140,155)', 'rgb(158,223,215)', 'rgb(255,105,86)'];
  const callback = () => {};
  if (!fn_ob) {
    fn_ob = {
      [type]: callback,
    };
  }

  //默认函数

  switch (type) {
    case 1:
      return {
        text: '待确认', //不能点
        color: colors[1],
        callback,
      };
    case 2:
      return {
        text: '待上架', //不能点
        color: colors[1],
        callback,
      };
    case 3:
      return {
        text: '续电费', //可以点
        color: colors[0],
        callback: fn_ob[type],
      };
    case 4: //不用显示
      return null;
    case 5:
      return {
        text: '冻结中', //可以点,就是续电费
        color: colors[2],
        callback: fn_ob[type],
      };
    case 6:
      return {
        text: '已到期', //不能点
        color: colors[1],
        callback,
      };
    case 7:
      return {
        text: '已失效', //不能点
        color: colors[1],
        callback,
      };
  }
};

export enum electricType {
  no_pass = 0, //已审批,结果,不通过
  has_pass = 1, // 已审批,结果:通过
  wait_approval = 2, // 待审批
}

export interface machineReqListType {
  type: number; //类型
  page_no: number; //页码
}

// 3.11.	矿机订单列表
export const getMachineList = (params: machineReqListType) => {
  return fetch({
    url: '/order/machine_list',
    data: params,
  });
};

// 3.12.	矿机订单详情
export const getMachineDetail = (params: { order_number: string }) => {
  return fetch({
    url: '/order/machine_detail',
    data: params,
  });
};

//3.13.	电费订单列表
export const getElecList = (params: { page_no: number }) => {
  return fetch({
    url: '/order/electricity_list',
    data: params,
  });
};

//3.14.	电费订单详情
export const getElecDetail = (params: { order_number: string }) => {
  return fetch({
    url: '/order/electricity_detail',
    data: params,
  });
};

export interface exchangeType {
  total_price: string; // 总价
  pay_currency: currencyType; // 付款币种
}

// 3.15.	货币兑换
export const getExchange = (params: exchangeType) => {
  return fetch({
    url: '/order/check_exchange',
    data: params,
  });
};

/**
 * 获取币种编码
 */
export const currency_type = (): currencyType => {
  return currencyType.UDST;
};
