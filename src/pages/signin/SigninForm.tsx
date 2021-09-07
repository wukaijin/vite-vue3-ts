import {
  FormRules,
  NButton,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  FormValidationError
} from 'naive-ui'
import { defineComponent, reactive, ref } from 'vue'
import { EyeOffOutline, IdCardOutline } from '@vicons/ionicons5'
import { SET_USER } from '@/store/user/actionType'
import $styles from './signin.module.less'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const rules: FormRules = {
  id: [
    {
      validator (rule, value) {
        if (!value) {
          return new Error('请输入ID')
        }
        return true
      },
    }
  ],
  password: [
    {
      validator (rule, value) {
        if (!value) {
          return new Error('请输入密码')
        }
        return true
      },
    }
  ]
}

export default defineComponent({
  setup(props, ctx) {
    const router = useRouter()
    const store = useStore()
    const formData = reactive({
      id: '',
      password: ''
    })
    const formRef = ref()
    const { dispatch } = store

    const visitHandler = () => {
      dispatch('user/' + SET_USER, { name: '游客' })
      router.push({ name: 'Home' })
    }
    const loginHandler = () => {
      formRef.value.validate((errors: FormValidationError) => {
        if (errors) return false
        dispatch('user/' + SET_USER, { name: formData.id })
        router.push({ name: 'Home' })
      })
    }

    return () => (
      <div class={$styles.panel}>
        <div>
          <NForm
            model={formData}
            ref={formRef}
            label-placement="left"
            label-width="40"
            rules={rules}
          >
            <NFormItem label="ID" path="id">
              <NInput
                value={formData.id}
                onUpdateValue={(id) => {
                  formData.id = id
                }}
                placeholder="请输入ID"
                maxlength="32"
              >
                {{
                  prefix: () => (
                    <NIcon>
                      <IdCardOutline />
                    </NIcon>
                  )
                }}
              </NInput>
            </NFormItem>
            <NFormItem label="密码" path="password">
              <NInput
                type="password"
                showPasswordToggle={true}
                value={formData.password}
                placeholder="请输入密码"
                maxlength="32"
                onUpdateValue={(password) => {
                  formData.password = password
                }}
              >
                {{
                  prefix: () => (
                    <NIcon>
                      <IdCardOutline />
                    </NIcon>
                  )
                }}
              </NInput>
            </NFormItem>
          </NForm>
        </div>
        <div>
          <NButton color="#fd4c5b" block onClick={loginHandler}>
            登录
          </NButton>
        </div>
        <div class={$styles.visitor}>
          <NButton text color="rgba(0, 0, 0, 0.4)" onClick={visitHandler}>
            {{
              icon: () => (
                <NIcon>
                  <EyeOffOutline />
                </NIcon>
              ),
              default: () => '游客登录'
            }}
          </NButton>
        </div>
      </div>
    )
  }
})
