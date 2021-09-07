import { defineComponent } from 'vue'
import { NButton, NIcon } from 'naive-ui'
import { useRouter } from 'vue-router'
import { LogIn } from '@vicons/ionicons5'

const LoginButton = defineComponent({
  setup(props, ctx) {
    const router = useRouter()
    const loginHandler = () => {
      router.push('/signin')
    }
    const slots = {
      icon: () => (
        <NIcon>
          <LogIn />
        </NIcon>
      )
    }
    return () => (
      <div>
        <NButton type="primary" ghost v-slots={slots} onClick={loginHandler}>
          登陆
        </NButton>
      </div>
    )
  }
})
export default LoginButton
