import { defineComponent } from 'vue'
import clx from 'classnames'
import { NIcon } from 'naive-ui'
import { CheckmarkCircleOutline } from '@vicons/ionicons5'
import $styles from './signin.module.less'

export default defineComponent({
  emits: ['selectPanel'],
  setup(props, ctx) {
    return () => (
      <div
        class={clx($styles.panel, $styles.signup)}
        style={{ height: '208px' }}
      >
        <div class={$styles.success}>
          <div>
            <NIcon color="rgb(10, 120, 10, 0.9)" size="60">
              <CheckmarkCircleOutline />
            </NIcon>
          </div>
          <div class={$styles.text}>
            <span>注册成功, </span>
            <span class={$styles.link} onClick={() => ctx.emit('selectPanel', 'signin')}>前往登陆 </span>
            <span>～</span>
          </div>
        </div>
      </div>
    )
  }
})
