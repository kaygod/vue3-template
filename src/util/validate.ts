import { ComputedRef } from 'vue';

/**
 * 是手机号码吗
 */
export const isPhone = (code: string) => {
  return /^1[3456789]\d{9}$/.test(code);
};

/**
 * 是邮箱地址吗
 */
export const isMail = (code: string) => {
  return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(code);
};

/**
 *  是手机号码或者邮箱地址
 */
export const phoneOrMail = (code: string) => {
  return isPhone(code) || isMail(code);
};

export interface ruleType {
  type: string;
  msg?: string; //自定义的错误信息
  params?: any; //传过来的参数值 比如 {type:'maxLength',params:6}
  callback?: () => validateResult; //自定义校验函数
}

function isRuleType(arg: ruleType | ComputedRef): arg is ruleType {
  return (<ruleType>arg).type !== undefined;
}

/**
 * 验证返回的结果
 */
export interface validateResult {
  flag: boolean; //验证通过没有
  msg?: string; //错误信息
}

export interface FunctionType {
  (v: string): validateResult;
  propName?: string;
}

/**
 * 获取校验函数的工厂函数
 */
export const getValidate = (
  list: (ruleType | ComputedRef<string>)[] | undefined
) => {
  if (list) {
    const ob = new Validate();

    const fn_list: any[] = []; //将所有的验证函数收集起来

    list.forEach((item) => {
      if (typeof item === 'string') {
        fn_list.push({
          fn: ob[item],
        });
      } else if (isRuleType(item)) {
        fn_list.push({
          ...item,
          fn: item.type === 'custome' ? item.callback : ob[item.type],
        });
      } else {
        fn_list.push({
          fn: ob[item.value],
        });
      }
    });

    const execuate: FunctionType = (value) => {
      let flag = true,
        msg = '';
      for (let i = 0; i < fn_list.length; i++) {
        const item = fn_list[i];
        const result = item.fn.apply(ob, [value, item]);
        if (!result.flag) {
          //验证没有通过
          flag = false;
          msg = item.msg ? item.msg : result.msg;
          break;
        }
      }
      return {
        flag,
        msg,
      };
    };

    return execuate;
  } else {
    return null;
  }
};

function getVaUnit(flag: boolean, msg?: string): validateResult {
  return {
    flag,
    msg,
  };
}

class Validate {
  [key: string]: any;

  constructor() {}

  required(data: any): validateResult {
    const msg = '该信息为必填项';

    if (data == null) {
      return getVaUnit(false, msg);
    }
    if (typeof data === 'string' && data.trim() === '') {
      return getVaUnit(false, msg);
    }
    return getVaUnit(true, msg);
  }

  phone(data: any) {
    const msg = '请填写正确的手机号码';
    return getVaUnit(isPhone(data), msg);
  }

  email(data: any) {
    const msg = '请填写正确的邮箱地址';
    return getVaUnit(isMail(data), msg);
  }

  minLength(data: any, { params }: ruleType) {
    let minLength = params as number;

    if (minLength == null) {
      return getVaUnit(true);
    }
    if (data == null) {
      return getVaUnit(false, '数据不能为空');
    }
    if (typeof data === 'string') {
      if (data.trim().length >= minLength) {
        return getVaUnit(true);
      } else {
        return getVaUnit(false, `数据最小长度不能小于${minLength}位`);
      }
    }
    return getVaUnit(false, '数据必须为字符串');
  }

  maxLength(data: any, { params }: ruleType) {
    let maxLength = params as number;

    if (maxLength == null) {
      return getVaUnit(true);
    }
    if (data == null) {
      return getVaUnit(false, '数据不能为空');
    }
    if (typeof data === 'string') {
      if (data.trim().length <= maxLength) {
        return getVaUnit(true);
      } else {
        return getVaUnit(false, `数据最小长度不能超过${maxLength}位`);
      }
    }
    return getVaUnit(false, '数据必须为字符串');
  }
}
