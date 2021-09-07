import { defineComponent, reactive } from 'vue'
import $styles from './userinfo.module.less'
import { NAvatar, NIcon, NDropdown } from 'naive-ui'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { SIGN_OUT } from '@/store/user/actionType'
import { PersonSharp, LogOutOutline  } from '@vicons/ionicons5'
import { DropdownMixedOption } from 'naive-ui/lib/dropdown/src/interface'

const options: DropdownMixedOption[] = [
  {
    label: '退出',
    key: 'sign-out',
    icon: () => <NIcon>
      <LogOutOutline />
    </NIcon>
  }
]

const UserInfo = defineComponent({
  setup() {
    const state = reactive({
      isHover: false
    })
    const store = useStore()
    const router = useRouter()
    const { state: { user }, dispatch } = store
    const methods = {
      onMouseenter: () => {
        state.isHover = true
      },
      onMouseleave: () => {
        state.isHover = false
      },
      handleSelect: (key: string) => {
        console.log('handleSelect', key)
        dispatch('user/' + SIGN_OUT)
        router.push('/signin')
      }
    }
    return () => {
      const AvatarStyle = {
        background: state.isHover ? 'pink' : undefined
      }
      return (
        <div onMouseenter={methods.onMouseenter} onMouseleave={methods.onMouseleave}>
          <NDropdown onSelect={methods.handleSelect} trigger="click" options={options}>
            <div class={$styles.userInfo}>
              <NAvatar round object-fit="fill" style={AvatarStyle}>
                <NIcon>
                  <PersonSharp />
                </NIcon>
              </NAvatar>
              <span class={$styles.userName}>{user.userInfo.name}</span>
            </div>
          </NDropdown>
        </div>
      )
    }
  }
})
export default UserInfo
