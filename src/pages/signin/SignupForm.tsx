import {
  FormRules,
  NButton,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  FormValidationError,
  useMessage
} from 'naive-ui'
import clx from 'classnames'
import { computed, defineComponent, reactive, ref } from 'vue'
import { EyeOffOutline, IdCardOutline } from '@vicons/ionicons5'
import { SET_USER } from '@/store/user/actionType'
import $styles from './signin.module.less'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useRequest } from '@/hooks'
type FormFata = {
  id: string
  password: string
  reenteredPassword: string
}

const getRules = (formData: FormFata): FormRules => ({
  id: [
    {
      validator(rule, value) {
        if (!value) {
          return new Error('请输入ID')
        }
        return true
      }
    }
  ],
  password: [
    {
      validator(rule, value) {
        if (!value) {
          return new Error('请输入密码')
        }
        return true
      }
    }
  ],
  reenteredPassword: [
    {
      validator(rule, value) {
        if (!value) {
          return new Error('请重复密码')
        }
        return true
      }
    },
    {
      validator(rule, value) {
        if (value !== formData.password) {
          return new Error('两次密码不一致')
        }
        return true
      }
    }
  ]
})

export default defineComponent({
  setup(props, ctx) {
    const formRef = ref()
    const router = useRouter()
    const message = useMessage()
    const store = useStore()
    const { dispatch } = store
    const formData: FormFata = reactive({
      id: '',
      password: '',
      reenteredPassword: ''
    })
    const submittedData = reactive({
      name: computed(() => formData.id),
      password: computed(() => formData.password),
    })
    const { request, loading, result } = useRequest('koa-api/user/signup', {
      manual: true,
      method: 'post',
      data: submittedData
    })
    const loginHandler = () => {
      if (loading.value) return false
      formRef.value.validate((errors: FormValidationError) => {
        if (errors) return false
        request().then(res => {
          console.log('request().then', res)
          // dispatch('user/' + SET_USER, { name: formData.id })
        }).catch((err) => {
          console.log(err)
          message.error(err.msg)
        })
        // router.push({ name: 'Home' })
      })
    }
    const rules = getRules(formData)
    // if (!result.value) {
    // }
    return () => {
      if (!result.value) {
        return (
          <div class={clx($styles.panel, $styles.signup)}>
            <div>
              <NForm
                model={formData}
                ref={formRef}
                label-placement="left"
                label-width="80"
                rules={rules}
              >
                <NFormItem label="ID" path="id">
                  <NInput
                    value={formData.id}
                    onUpdateValue={id => {
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
                    onUpdateValue={password => {
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
                <NFormItem label="确认密码" path="reenteredPassword">
                  <NInput
                    type="password"
                    showPasswordToggle={true}
                    value={formData.reenteredPassword}
                    placeholder="请确认密码"
                    maxlength="32"
                    onUpdateValue={password => {
                      formData.reenteredPassword = password
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
              <NButton
                loading={loading.value}
                color="#fd4c5b"
                block
                onClick={loginHandler}
              >
                注册
              </NButton>
            </div>
            <div>{result.value}</div>
          </div>
        )
      }
      return (
        <div
          class={clx($styles.panel, $styles.signup)}
          style={{ height: '208px' }}
        >
          
        </div>
      )
    }
  }
})
