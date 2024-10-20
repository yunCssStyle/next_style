'use client'

import { InputFieldSkeleton } from '@/app/ui/skeleton'
import Button from '@/components/button/button'
import SelectBox from '@/components/select/select-box'
import SelectFilter from '@/components/select/select-filter'
import VerticalLine from '@/components/ui/vertical-line'
import { useCurrentLocale, useI18n } from '@/locales/client'
import {
  resetFilter,
  resetItems,
  setActivated,
  setBrand,
  setColor,
  setGender,
  setItem,
  setPattern,
  setSeason,
  setVendorId,
  useProductFilterStore,
} from '@/stores/product-filter'
import { addAllCommonCode, addDefaultVendor, vendorToCommonCode } from '@/utils/utils'
import { shallow } from 'zustand/shallow'

export default function Filter({ data, dataVendorList, dataBrand }: any) {
  const t = useI18n()
  const locale = useCurrentLocale()
  const [color, season, pattern, item, gender, brand, activated, vendorId] = useProductFilterStore(
    (state) => [
      state.color,
      state.season,
      state.pattern,
      state.item,
      state.gender,
      state.brand,
      state.activated,
      state.vendorId,
    ],
    shallow,
  )
  const getActiveValue = (active: boolean | undefined): string => {
    if (active === undefined) {
      return 'ALL'
    }
    return active ? 'ACTIVE' : 'INACTIVE'
  }
  if (data) {
    return (
      <>
        {(color.length !== 0 || season.length !== 0 || pattern.length !== 0 || item.length !== 0) && (
          <>
            <Button borderRadius="3px" paddingLR="0.5rem" size="smallR" theme="secondary" onClick={resetFilter}>
              {t('common.reset')}
            </Button>
            <VerticalLine />
          </>
        )}
        <SelectBox
          width="auto"
          datas={[
            { code: 'ALL', name: t('common.state') },
            { code: 'ACTIVE', name: t('prod.viewer-active') },
            { code: 'INACTIVE', name: t('prod.viewer-non-active') },
          ]}
          onClickOptionValue={(selectData: string) => {
            if (selectData === 'ALL') {
              setActivated(undefined)
            } else if (selectData === 'ACTIVE') {
              setActivated(true)
            } else {
              setActivated(false)
            }
          }}
          labelColor="var(--color-black)"
          selectedValue={getActiveValue(activated)}
          fontSize="0.75rem"
          top="32px"
          theme="secondary"
          showArrow
        />
        <SelectBox
          width="auto"
          datas={addAllCommonCode(data.gender, t('common.gender'))}
          onClickOptionValue={(selectData: string) => {
            if (selectData === 'ALL') {
              setGender(undefined)
            } else {
              resetItems()
              setGender(selectData === 'M' ? 'M' : selectData === 'F' ? 'F' : undefined)
            }
          }}
          labelColor="var(--color-black)"
          selectedValue={gender === undefined ? 'ALL' : gender}
          fontSize="0.75rem"
          top="32px"
          theme="secondary"
          locale={locale}
          showArrow
        />
        <SelectFilter
          label={t('common.color')}
          gdata={data.color ?? []}
          valueKey="code"
          labelKey="name"
          labelType="color"
          selectedItem={color}
          handleAddFilter={setColor}
          locale={locale}
        />
        {dataVendorList && dataVendorList.length > 0 && (
          <SelectBox
            width="auto"
            datas={vendorToCommonCode(addDefaultVendor(dataVendorList))}
            onClickOptionValue={(selectData: string) => {
              if (selectData === '-1') {
                setVendorId(undefined)
              } else {
                setVendorId(Number(selectData))
              }
            }}
            labelColor="var(--color-black)"
            selectedValue={vendorId?.toString() ?? '-1'}
            fontSize="0.75rem"
            top="32px"
            theme="secondary"
            showArrow
          />
        )}
        {dataBrand && dataBrand.length > 0 && (
          <SelectFilter
            label={t('common.brand')}
            gdata={dataBrand ?? []}
            valueKey="id"
            labelKey="name"
            selectedItem={dataBrand
              .filter((brandItem: any) => brand.includes(brandItem.name))
              .map((brandItem: any) => brandItem.id)}
            handleAddFilter={(r) => setBrand(dataBrand.find((brandItem: any) => brandItem.id === r)?.name)}
          />
        )}
        {gender ? (
          <SelectFilter
            label={t('common.item')}
            gdata={data.item.filter((i: any) => i.genderType === gender) ?? []}
            valueKey="id"
            labelKey="name"
            selectedItem={item}
            handleAddFilter={setItem}
          />
        ) : (
          <SelectFilter
            label={t('common.item')}
            gdata={data.item ?? []}
            valueKey="id"
            labelKey="name"
            selectedItem={item}
            handleAddFilter={setItem}
          />
        )}
        <SelectFilter
          label={t('common.pattern')}
          gdata={data.pattern ?? []}
          valueKey="code"
          labelKey="name"
          selectedItem={pattern}
          handleAddFilter={setPattern}
          locale={locale}
        />
        <SelectFilter
          label={t('common.season')}
          gdata={data.season ?? []}
          valueKey="code"
          labelKey="name"
          selectedItem={season}
          handleAddFilter={setSeason}
          locale={locale}
        />
      </>
    )
  }
  return <InputFieldSkeleton />
}
