import { defineComponent } from 'vue'
import { NCard, NTabs, NTabPane } from 'naive-ui'
import SignupForm from './SignupForm'
import SigninForm from './SigninForm'
import $styles from './signin.module.less'

export default defineComponent({
  setup(props, ctx) {
    return () => (
      <div class={$styles.page}>
        <div class={$styles.card}>
          <NCard content-style="padding: 8px 8px 0;">
            <NTabs
              tabs-padding={20}
              // pane-style="padding: 20px;"
              default-value="signin"
              size="large"
            >
              <NTabPane name="signin" tab="登录">
                <SigninForm />
              </NTabPane>
              <NTabPane name="signup" tab="注册">
                <SignupForm />
              </NTabPane>
            </NTabs>
          </NCard>
        </div>
      </div>
    )
  }
})
