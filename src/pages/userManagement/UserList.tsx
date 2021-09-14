import { computed, defineComponent, reactive, watch, watchEffect } from 'vue'
import { NCard, NDataTable, DataTableColumns, NButton } from 'naive-ui'
import { useRequest } from '@/hooks'
import { RowData } from 'naive-ui/lib/data-table/src/interface'
import request from '@/utils/request'

const getRandomChar = () => (Math.random() + '').slice(-7)
const getRandomUser = () => {
  const char = getRandomChar()
  return {
    uid: char,
    email: char,
    password: char
  }
}
const getRandomUsers = () => {
  return [...Array(10)].map(() => {
    return getRandomUser()
  })
}

const columns: DataTableColumns = [
  {
    title: 'ID',
    key: 'id'
  },
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
    const state = reactive({
      data: [],
      count: 0
    })
    const pagination = reactive({
      page: 1,
      pageSize: 10,
      showSizePicker: true,
      pageSizes: [10, 20, 30, 50, 100],
      onChange: (page: number) => {
        pagination.page = page
      },
      onPageSizeChange: (pageSize: number) => {
        pagination.pageSize = pageSize
        pagination.page = 1
      }
    })
    const submitedData = reactive({
      count: computed(() => state.count)
    })
    const { result } = useRequest<RowData[] | null>('koa-api/user/list', {
      defaultResult: [],
      data: submitedData
    })

    watchEffect(() => {
      state.data = result.value && result.value.data
    })
    const batchSet = () => {
      request.post('koa-api/user/batchSignup', getRandomUsers()).then(red => {
        state.count++
      })
    }
    return () => (
      <div>
        <NCard>
          <NButton type="error" onClick={batchSet}>
            批量创建10条
          </NButton>
        </NCard>
        <NCard>
          <NDataTable
            size="small"
            columns={columns}
            data={state.data}
            pagination={pagination}
          />
        </NCard>
      </div>
    )
  }
})
