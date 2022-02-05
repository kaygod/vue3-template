import { ElButton } from 'element-plus'
import { App } from '@vue/runtime-dom'
// import lang from 'element-plus/lib/locale/lang/zh-cn'
// import locale from 'element-plus/lib/locale'

export default (app:App<Element>) => {
  // locale.use(lang)
  app.use(ElButton)
}
