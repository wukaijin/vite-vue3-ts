import { FormItem } from './fromDSL'
import { Map as ImmutableMap } from 'immutable'

export type FormItemMeta = {
  type: string
  path?: Array<string | number>
  cond?: (ctx: unknown) => unknown
  default?: unknown
  items?: Array<FormItemMeta>
}
export type Meta = {
  form: FormItemMeta
}

export type FormItemProps = {
  onChange?: (value: unknown) => void
  item: FormItem
  defaultValue?: unknown
}

export type Store = ImmutableMap<string, Store>
