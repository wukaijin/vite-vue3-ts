/* eslint-disable */
import {
  AllowedComponentProps,
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  EmitsOptions,
  // MethodOptions,
  VNodeProps,
  PropType
} from 'vue'
declare type CusObject = Record<string, unknown>
declare type EmptyObject = Record<string, never>

declare type VueCom = DefineComponent<
  {},
  {},
  {},
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  VNodeProps & AllowedComponentProps & ComponentCustomProps,
  Readonly<{} & {}>,
  {}
>
declare type EventFN = PropType<(value: string) => void>
