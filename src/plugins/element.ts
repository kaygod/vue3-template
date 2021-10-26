import { ElButton } from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'
import { App } from '@vue/runtime-dom'

export default (app:App<Element>) => {
  //locale.use(lang)
  app.use(ElButton)
}
