import { CSSProperties, defineComponent } from 'vue'
import { NLayoutFooter } from 'naive-ui'

const footerStyle: CSSProperties = {
  height: '50px'
}

const Footer = defineComponent({
  name: 'Footer',
  render() {
    return (
      <NLayoutFooter>
        <div style={footerStyle}>footerStyle</div>
      </NLayoutFooter>
    )
  }
})
export default Footer
