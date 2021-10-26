import axios, { AxiosResponse } from 'axios';
import hexMD5 from './md5.js';
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus'


export const service_ip = 'https://m.wayforcloud.com/project4';


//打开loaidng
export const showLoading:any = (options = {}) => {
  showLoading.target = ElLoading.service(options);
};

//关闭loading
export const closeLoading = () => {
  if(showLoading.target){
    showLoading.target.close();
    showLoading.target = null;
  }
};

export const Info = (message: string,duration = 2000) => {
  ElMessage({
     message,
     duration
  });
};

export const Confirm = (props:{message:string}) => {
  return new Promise((resolve,reject)=>{
    ElMessageBox.confirm(
      props.message,
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }
      )
      .then(() => {
        resolve(null);
      })
      .catch(() => {
        //Info("删除取消了");
        reject(null);
      })
    })
};

export const fetch = <
  K,
  T extends { result?: number; errno?: string; data?: K }
>(
  params: any
) => {
  return new Promise<any>((resolve, reject) => {
    params.url = `${service_ip}${params.url}`;
    const data = paramsHandler(params.data || {});
    axios({
      ...params,
      method: params.method || 'post',
      data,
      withCredentials: true,
    })
      .then((res: AxiosResponse<T>) => {
        if (typeof res == 'string') {
          res = JSON.parse(res);
        }
        const rResult = res.data;
        if (rResult && rResult.result == 1) {
          resolve(rResult.data);
        } else {
          closeLoading();
          if (rResult.errno != null) {
            if (rResult.errno == '1030' || rResult.errno == '1040') {
              //没有登录 或者 被挤下来了
              //store.commit('noLogin');
            }
            Info(msgCode(rResult.errno));
          }
        }
      })
      .catch((error) => {
        closeLoading();
        if (error.code === 'ECONNABORTED') {
          Info('请求超时');
          return false;
        }
        console.log(error);
        reject(error);
      });
  });
};

/**
 * post参数处理
 */
export const paramsHandler = function(v: any) {
  let params: any = {
    data: v,
  };
  let secrete = 'xinwei2017';
  params.secret = secrete;
  params.source = 'pline';
  params.login_flag = getLoginCode();
  //params.platform = "41";
  params = JSON.stringify(params);
  let params2 = hexMD5(params);
  var second = params2.slice(1);
  second += params2[0];
  params2 = second;
  var reg = new RegExp(secrete);
  params = params.replace(reg, params2);
  return params;
};

function getLoginCode() {
  let loginStateData = localStorage.getItem('loginState');

  if (loginStateData) {
    let login_state = JSON.parse(loginStateData);
    return login_state.login_flag;
  } else {
    return '123456';
  }
}

export interface listType {
  loading: boolean;
  error: boolean;
  finished: boolean;
  page_no: number;
  final_page: number;
}
/**
 * 异常处理
 */
export const exceptionHandler = async (data: listType, callback: () => {}) => {
  data.loading = true;
  try {
    await callback();
  } catch (error) {
    data.error = true;
    data.finished = false;
    data.loading = false;
    data.page_no = 0;
  }
};

/**
 * 列表请求成功的处理
 */
export const listHanlder = (data: listType, total: string) => {
  data.loading = false;
  data.final_page = +total;
  if (data.page_no >= data.final_page) {
    //已经加载完了
    data.finished = true;
  }
};

//错误码
export const msgCode = (n: string) => {
  if (n === undefined) {
    return '未知错误';
  }
  n = n.toString();
  switch (n) {
    case '100':
      return 'json解析错误';
    case '101':
      return '缺少参数';
    case '102':
      return '参数有误';
    case '200':
      return '数据校验错误';
    case '625':
      return '数据库操作失败';
    case '700':
      return '没权限';
    case '1000':
      return '验证码错误';
    case '1001':
      return '用户未登录';
    case '1010':
      return '用户不存在';
    case '1011':
      return '密码错误';
    case '1012':
      return '用户已冻结';
    case '1013':
      return '当前密码错误';
    case '1020':
      return '资源不存在';
    case '1021':
      return '资源已删除';
    case '1022':
      return '库存实际数量不足，不能预定';
    case '1030':
      return '资源回复不存在';
    case '1031':
      return '您不是发布资源的采购，不能进行操作';
    case '1032':
      return '此预定资源信息已通过“采购回复”，不能重复操作';
    case '1033':
      return '您不是此预定资源生成者，不能进行操作';
    case '1034':
      return '采购还未回复，您不能修改回复';
    case '1035':
      return '本预定资源已确定或取消，不能再修改';
    case '1036':
      return '采购还未回复，您不能进行销售回复';
    case '1037':
      return '销售已回复，您不能重复回复';
    case '1038':
      return '您不是此预定资源生成者，不能进行操作';
    case '1050':
      return '需求不存在';
    case '1051':
      return '您不是对应的销售，不能回复';
    case '1052':
      return '本状态下，不能进行操作';
    case '1053':
      return '您不是创建者，不能回复';
    case '1054':
      return '该资源已过期，不能进行此操作';
    case '1060':
      return '审批人不存在';
    case '1061':
      return '审批人没有审批权限';
    case '1062':
      return '客户信息不能存在';
    case '1063':
      return '客户信息已删除';
    case '1064':
      return '信息审批中，不能编辑更新';
    case '1065':
      return '审核失败，您没有权限更新内容';
    case '1066':
      return '您没有归属，没有权限更新内容';
    case '1067':
      return '已在审批中状态，请不要重复申请';
    case '1068':
      return '已审批成功状态，请不要重复申请';
    case '1070':
      return '供应商信息不能存在';
    case '1071':
      return '供应商信息已删除';
    case '1074':
      return '已存在相同客户名称，不能再次新增';
    case '1075':
      return '已存在相同供应商名称，不能再次新增';
    case '1080':
      return '已存在相同名称的部门';
    case '1081':
      return '部门不存在';
    case '1082':
      return '部门还有用户，不能删除';
    case '1090':
      return '已有相同名字的用户存在';
    case '1091':
      return '手机号码已注册';
    case '1100':
      return '客户/供应商 审批信息不存在';
    case '1101':
      return '你不是该信息审批人，不能进行操作';
    case '1102':
      return '已审批，不能重复操作';
    case '1110':
      return '信息不存在';
    case '1111':
      return '您不是信息接收者，不能进行操作';
    case '1120':
      return '公司信息不存在';
    case '1121':
      return '公司信息已删除';
    case '1130':
      return '此产品已失效';
    case '1131':
      return '实际库存数量不足';
    case '1132':
      return '预定出库信息不存在';
    case '1133':
      return '您不是预定出库的销售，不能进行操作';
    case '1134':
      return '本状态下不能进行操作';
    case '1140':
      return '合同暂未生成';
    case '1141':
      return '您没有权限操作';
    default:
      return '未知错误';
  }
};

/**
 * 响应数据格式
 */
export interface ResponseType<T> {
  result: number;
  errno: string;
  data: T;
}

//接口返回数据为空时的类型
export interface NoDataType {}
