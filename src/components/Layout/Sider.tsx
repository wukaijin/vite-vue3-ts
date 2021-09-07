import { defineComponent, CSSProperties } from 'vue'
import { NLayoutSider } from 'naive-ui'
import Menu from './Menu'
type siderProps = {
  headerHeight: number
}

const siderStyle = (props: siderProps): CSSProperties => ({
  height: `calc(100vh - ${props.headerHeight + 50}px)`
})
const Sider = defineComponent({
  name: 'Sider',
  props: {
    headerHeight: {
      type: Number,
      default: 60
    }
  },
  render(props: siderProps) {
    const { headerHeight } = props
    console.log('siderProps headerHeight', headerHeight)
    console.log(headerHeight)
    return (
      <NLayoutSider show-trigger="bar" collapsed-width={10} content-style={siderStyle(props)}>
        <Menu />
      </NLayoutSider>
    )
  }
})
export default Sider
