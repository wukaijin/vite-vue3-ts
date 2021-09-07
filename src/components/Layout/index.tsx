import { defineComponent, reactive } from 'vue'
import { NLayout, NLayoutContent, NLayoutSider } from 'naive-ui'
import { RouterView } from 'vue-router'
import Sider from './Sider'
import Header from './Header'
import Footer from './Footer'
import './layout.less'

export default defineComponent({
  name: 'Layout',
  setup(props, { slots }) {
    const state = reactive({
      headerHeight: 60
    })
    const heightChange = (num: number) => {
      console.log('Layout - heightChange ', num)
      state.headerHeight = num
    }
    return () => {
      return (
        <NLayout>
          <Header height={state.headerHeight} heightChange={heightChange} />
          <NLayout has-sider>
            <Sider headerHeight={state.headerHeight} />
            <NLayout has-sider>
              <NLayoutContent content-style="padding: 24px;">
                <RouterView />
              </NLayoutContent>
              <NLayoutSider content-style="padding: 24px;">海淀桥</NLayoutSider>
            </NLayout>
          </NLayout>
          <Footer />
        </NLayout>
      )
    }
  }
})
