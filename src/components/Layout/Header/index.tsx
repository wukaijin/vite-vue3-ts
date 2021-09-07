import { CSSProperties, defineComponent, PropType, reactive } from 'vue'
import { NLayoutHeader, NSpace, NInputNumber } from 'naive-ui'
import { useStore } from 'vuex'
import UserInfo from './UserInfo'
import LoginButton from './LoginButton'

type HeaderProps = {
  height: number
  heightChange: (num: number) => void
}
interface HeaderState {
  currentHeight: number | undefined
}
const headerStyle = (h: number): CSSProperties => ({
  height: `${h}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0 20px'
})

const Header = defineComponent({
  name: 'Header',
  props: {
    height: {
      type: Number || null,
      default: 60
    },
    heightChange: {
      type: Function as PropType<(id: number) => void>,
      default: null
    }
  },
  setup(props: HeaderProps) {
    const { heightChange } = props
    const state: HeaderState = reactive({ currentHeight: props.height })
    const userState = useStore().state.user
    const limitedHeightChange = (num: number | null) => {
      state.currentHeight = num || 0
      if (!num) num = 0
      heightChange(Math.max(60, Math.min(num, 160)))
    }
    return (props: HeaderProps) => {
      return (
        <NLayoutHeader>
          <div style={headerStyle(props.height)}>
            <NSpace>
              <NInputNumber value={state.currentHeight} onUpdateValue={limitedHeightChange} />
              { userState.isLogin ? <UserInfo /> : <LoginButton /> }
            </NSpace>
          </div>
        </NLayoutHeader>
      )
    }
  }
})
export default Header
