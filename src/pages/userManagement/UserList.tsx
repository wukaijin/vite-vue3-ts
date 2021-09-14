import { defineComponent, reactive, watch, watchEffect } from 'vue'
import { NCard, NDataTable, DataTableColumns } from 'naive-ui'
import { useRequest } from '@/hooks'
import { RowData } from 'naive-ui/lib/data-table/src/interface'

const columns: DataTableColumns = [
  {
    title: 'UID',
    key: 'uid'
  },
  {
    title: '邮箱',
    key: 'email'
  },
  {
    title: '创建时间',
    key: 'createdAt'
  },
  // {
  //   title: '更新时间',
  //   key: 'updatedAt'
  // },
  {
    title: '上次登录时间',
    key: 'loginAt'
  }
]
export default defineComponent({
  setup(props, ctx) {
    const { result } = useRequest<RowData[] | null>('koa-api/user/list', {
      defaultResult: []
    })
    const state = reactive({
      data: []
    })
    watchEffect(() => {
      state.data = result.value && result.value.data
    })

    return () => (
      <NCard>
        <NDataTable size="small" columns={columns} data={state.data} />
      </NCard>
    )
  }
})
