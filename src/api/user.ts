import { fetch, ResponseType, NoDataType } from '@/util/common'
import hexMD5 from '@/util/md5'
import { ComputedRef } from 'vue'
import { ruleType } from '@/util/validate'

function Md5 (params: { password: string }) {
  params.password = hexMD5(params.password)
}

export enum NumberType {
  // 号码类型
  phone = 1, // 手机
  email = 2, // 邮箱
}

/**
 * 登录接口参数
 */
export interface LoginType {
  number_type: NumberType; // 1.手机号码；2.邮箱
  number_number: string; // 对应 msg_type
  password: string;
}

export interface LoginResponseType {
  login_flag: string; // 登录标志
}

export const Login = (params: LoginType) => {
  Md5(params)
  return fetch<LoginResponseType, ResponseType<LoginResponseType>>({
    url: '/user/login',
    data: params
  })
}

/**
 * 重置密码
 */
export interface ResetPwdType {
  number_type: NumberType; // 1.手机号码；2.邮箱
  number_number: string; // 对应msg_type
  password: string;
  captcha: string; // 验证码
}

export const ResetPwd = (params: ResetPwdType) => {
  Md5(params)
  return fetch<NoDataType, ResponseType<NoDataType>>({
    url: '/user/init_psw',
    data: params
  })
}

/**
 * 注册
 */
export interface RegisterType {
  number_type: NumberType; // 1.手机号码；2.邮箱
  number_number: string; // 对应msg_type
  password: string;
  captcha: string; // 验证码
}

export const Register = (params: RegisterType) => {
  Md5(params)
  return fetch<NoDataType, ResponseType<NoDataType>>({
    url: '/user/register',
    data: params
  })
}

/**
 * 校验验证码接口
 */

export enum CaptchaType {
  register = 1, // 注册
  forgetpwd = 2, // 忘记密码
}

export interface CheckCaptchaType {
  number_type: NumberType; // 1.手机号码；2.邮箱
  number_number: string; // 对应msg_type
  captcha: string; // 验证码
  type: CaptchaType; // 类型值,注册 还是 忘记密码
}

export const CheckCaptcha = (params: CheckCaptchaType) => {
  return fetch<NoDataType, ResponseType<NoDataType>>({
    url: '/captcha/check',
    data: params
  })
}

/**
 * 发送验证码接口
 */

export interface SendCaptchaType {
  number_type: NumberType; // 1.手机号码；2.邮箱
  number_number: string; // 对应msg_type,号码内容
  type: CaptchaType; // 类型值,注册 还是 忘记密码
}

export const SendCaptcha = (params: SendCaptchaType) => {
  return fetch<NoDataType, ResponseType<NoDataType>>({
    url: '/captcha/send',
    data: params
  })
}

export type oneRuleType = ComputedRef<
  (ruleType | ComputedRef<string> | string)[]
>;
