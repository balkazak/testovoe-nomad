import { createApp } from 'vue'
import { createPinia } from 'pinia'
import UsersWidget from './UsersWidget.vue'
import '@/widget/styles.css'

interface UsersWidgetOptions {
  container: string | HTMLElement
}

class UsersWidgetClass {
  private app: ReturnType<typeof createApp> | null = null

  init(options: UsersWidgetOptions) {
    const container =
      typeof options.container === 'string'
        ? document.querySelector(options.container)
        : options.container

    if (!container) {
      throw new Error('Container not found')
    }

    const pinia = createPinia()
    this.app = createApp(UsersWidget)
    this.app.use(pinia)
    this.app.mount(container)
  }

  destroy() {
    if (this.app) {
      this.app.unmount()
      this.app = null
    }
  }
}

const UsersWidgetInstance = new UsersWidgetClass()

if (typeof window !== 'undefined') {
  ;(window as any).UsersWidget = {
    init: (container: string | HTMLElement) => UsersWidgetInstance.init({ container }),
    destroy: () => UsersWidgetInstance.destroy()
  }
}

export default UsersWidgetInstance

