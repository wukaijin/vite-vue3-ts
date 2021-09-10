import { defineComponent, reactive } from 'vue'
import { NCard, NTabs, NTabPane } from 'naive-ui'
import SignupForm from './SignupForm'
import SigninForm from './SigninForm'
import $styles from './signin.module.less'

export default defineComponent({
  setup(props, ctx) {
    const state = reactive({
      value: 'signin'
    })
    const selectPanel = (key: string) => (state.value = key)
    return () => (
      <div class={$styles.page}>
        <div class={$styles.card}>
          <NCard content-style="padding: 8px 8px 0;">
            <NTabs
              tabs-padding={20}
              // pane-style="padding: 20px;"
              value={state.value}
              onUpdateValue={selectPanel}
              size="large"
            >
              <NTabPane name="signin" tab="登录">
                <SigninForm />
              </NTabPane>
              <NTabPane name="signup" tab="注册">
                <SignupForm onSelectPanel={selectPanel} />
              </NTabPane>
            </NTabs>
          </NCard>
        </div>
      </div>
    )
  }
})
