import { NMenu, MenuOption, NIcon } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'
import { useRouter } from 'vue-router'
import { defineComponent, reactive, VNodeChild } from 'vue'
import { MenuOptionBase } from 'naive-ui/lib/menu/src/interface'
import { VueCom } from '@/typings'

const renderIcon =
  (Icon: VueCom): (() => VNodeChild) =>
  () =>
    (
      <NIcon>
        <Icon />
      </NIcon>
    )

const menuOptions: MenuOptionBase[] = [
  {
    label: '用户管理',
    key: '/user-management/list',
    icon: renderIcon(BookIcon),
    path: '/user-management/list'
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    disabled: true,
    icon: renderIcon(BookIcon)
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(PersonIcon),
            path: '/guide'
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: '威士忌',
            key: 'whisky'
          }
        ]
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]
interface State {
  activeKey: string | null
  collapsed: boolean
}
export default defineComponent({
  name: 'Menu',
  setup() {
    const state = reactive<State>({
      activeKey: null,
      collapsed: true
    })
    const router = useRouter()
    return () => {
      const update = (v: string, option: MenuOption) => {
        state.activeKey = v
        if (option.path) {
          router.push(option.path as string)
        }
      }
      return (
        <NMenu
          collapsed-width={64}
          collapsed-icon-size={22}
          options={menuOptions}
          value={state.activeKey}
          onUpdateValue={update}
        />
      )
    }
  }
})
