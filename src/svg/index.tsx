'use client'

/* eslint-disable react/destructuring-assignment */
import IconCloseXThin from './close-x-thin.svg'
import IconAdd from './icon_add.svg'
import IconCartListDel from './icon_cartlist_del.svg'
import IconClip from './icon_clip.svg'
import IconDelete from './icon_delete.svg'
import IconKakao from './icon_kakao.svg'
import IconMinus from './icon_minus.svg'
import IconShare from './icon_share.svg'
import IconShare1 from './icon_share1.svg'
import IconLeft from './left.svg'
import LookLogo from './look-logo.svg'
import IconLookLeft from './look_left_icon.svg'
import OlivelaQuickbuy from './olivela-quickbuy.svg'
import OlivelaIcon from './olivelaIcon.svg'
import IconRefresh from './refresh.svg'
import IconShoppingCart from './shopping-cart.svg'
import IconStyleLookLoginLogo from './styleLookLoginLogo.svg'
import IconStyleLookLogo from './styleLookLogo.svg'
// import IconRefresh1 from './icon_refresh.svg'

const ICON = {
  styleLookLoginLogo: (props: { width: string }): JSX.Element => (
    <IconStyleLookLoginLogo style={{ width: props.width }} />
  ),
  StyleLookLogo: (props: { width: string }): JSX.Element => <IconStyleLookLogo style={{ width: props.width }} />,
  Left: (): JSX.Element => <IconLeft />,
  ShoppingCart: (): JSX.Element => <IconShoppingCart />,
  LookLeft: (): JSX.Element => <IconLookLeft />,
  LookLogo: (): JSX.Element => <LookLogo />,
  Refresh: (): JSX.Element => <IconRefresh />,
  Share: (): JSX.Element => <IconShare />,
  Share1: (): JSX.Element => <IconShare1 />,
  ShareClip: (): JSX.Element => <IconClip />,
  ShareKakao: (): JSX.Element => <IconKakao />,
  ShareCartDelete: (): JSX.Element => <IconDelete />,
  ShareCartMinus: (): JSX.Element => <IconMinus />,
  ShareCartAdd: (): JSX.Element => <IconAdd />,
  ShareCartCartListDel: (): JSX.Element => <IconCartListDel />,
  CloseXThin: (): JSX.Element => <IconCloseXThin />,
  OlivelaQuickbuy: (): JSX.Element => <OlivelaQuickbuy />,
  OlivelaIcon: (): JSX.Element => <OlivelaIcon />,
}

export default ICON
