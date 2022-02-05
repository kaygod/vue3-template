import { createApp } from 'vue'
import { onDemand as importVant } from '@/config/onDemand'

export const Modal = (Component: any, props: any) => {
  const destory = () => {
    _instance.unmount()
    document.body.removeChild(node)
  }
  const _instance = createApp(Component, {
    ...props,
    destory
  })

  importVant(_instance)

  const node = document.createElement('DIV')

  document.body.appendChild(node)

  type instanceType = { show: () => void };

  const cot = _instance.mount(node) as unknown

  const instance = cot as instanceType

  return instance
}
