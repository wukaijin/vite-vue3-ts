import { Map as ImmutableMap } from 'immutable'
import { FormItemMeta, Meta, Store } from './form.types'

export class Form {
  private meta: Meta
  private store: Store
  constructor(meta: Meta, data?: Store) {
    this.meta = meta
    this.store = this.initStore(data)
  }
  // public getRoot(): Form {
  //   return this.form
  // }
  public getData(): unknown {
    return this.store.toJS()
  }
  public initStore(data: unknown): Store {
    if (data && typeof data === 'object') {
      return ImmutableMap(data)
    }
    const store = ImmutableMap<string, Store>()
    return store
  }
  public setValue(path: Array<string | number>, value: unknown): Store {
    return this.store.setIn(path, value)
  }
  public getValue(path: Array<string | number>): unknown {
    return this.store.getIn(path)
  }
}

export class FormItem {
  private meta: FormItemMeta
  private children: FormItem[]
  private form: Form
  constructor(form: Form, meta: FormItemMeta) {
    this.form = form
    this.meta = meta
    this.children = []
  }
  private _getValue() {
    let val: unknown
    if (this.meta.path) {
      val = this.form.getValue(this.meta.path)
    }
    if (typeof val === 'undefined') {
      val = this.meta.default
    }
    return val
  }
}

export default Form
