'use client'

import { ProductListSkeleton, TableSkeleton } from '@/app/ui/skeleton'
import ProductCard from '@/components/card/product-card'
import { showMoreIcon, showStatus } from '@/components/table/components/table-components'
import Table from '@/components/table/table'
import { dataMenuTextI18, productTableMenu } from '@/constants/menu'
import { PRODUCT_SEARCH_LIMIT, SEARCH_TIME, SHORT_TIME } from '@/constants/numbers'
import useSize from '@/hook/useSize'
import { useI18n } from '@/locales/client'

import {
  ProductQuery,
  ProductQueryGenderType,
  ProductResDto,
  ProductStatusBulkDtoStatus,
  VendorResDto,
} from '@/services/generated/managerstore.schemas'
import interceptorClient from '@/services/mutator/interceptorClient'
import { setUpdateItem, useProductStore } from '@/stores/product'
import { clearBrand, setActivated, useProductFilterStore } from '@/stores/product-filter'
import { useUserInfoStore } from '@/stores/user-info'
import ProductDTO from '@/types/product'
import { dataTextI18, headerProduct } from '@/types/tables/props'
import { isAdmin, showSnakbar } from '@/utils/utils'
import { throttle } from 'lodash'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import styles from './list-container.module.scss'

export default function useHooks() {
  const router = useRouter()
  const t = useI18n()
  const [ref, size] = useSize()
  const [allCheck, setAllCheck] = useState<boolean>(false) // 전체 체크
  const [pageTotal, setPageTotal] = useState<number>(0) // 전체 페이지
  const [loading, setLoading] = useState<boolean>(true) // 로딩
  const [currentPage, setCurrentPage] = useState<number>(0) // 현재 페이지
  const [totalItems, setTotalItems] = useState<ProductDTO[] | []>([]) // 검색한 전체 아이템
  const [debouncedFilter, setDebouncedFilter] = useState<boolean>(false) // 필터 변경 시 디바운스 값 설정
  const [dataFilter, setDataFilter] = useState() // 검색한 전체 아이템
  const [dataBrand, setDataBrand] = useState() // 브랜드 리스트
  const [dataVendorList, setDataVendorList] = useState<VendorResDto[]>([]) // 벤더 리스트
  const updateItem = useProductStore((state) => state.updateItem)

  const [profile, authorities, vendor] = useUserInfoStore((state) => [state.profile, state.authorities, state.vendor])

  const [viewType, isBookMark, color, item, season, gender, pattern, searchText, brand, activated, vendorId] =
    useProductFilterStore(
      (state) => [
        state.viewType,
        state.isBookMark,
        state.color,
        state.item,
        state.season,
        state.gender,
        state.pattern,
        state.searchText,
        state.brand,
        state.activated,
        state.vendorId,
      ],
      shallow,
    )

  // 네트워크 통신 - 상품 리스트 조회 함수
  const fetchData = async () => {
    setLoading(true)
    const filter: ProductQuery = {
      page: currentPage,
      direction: 'DESC',
      orderBy: 'CREATED_AT',
      size: PRODUCT_SEARCH_LIMIT,
      type: 'CUSTOMER',
    }
    if (activated === undefined) {
      filter.activated = undefined
    } else {
      filter.activated = activated
    }
    if (color.length > 0) filter.colorType = color
    if (item.length > 0) filter.categoryId = item.map(Number)
    if (season.length > 0) filter.seasonTypes = season
    if (brand.length > 0) filter.brand = brand
    if (pattern.length > 0) filter.patternType = pattern
    if (gender) filter.genderType = gender as ProductQueryGenderType
    if (searchText.trim() !== '') filter.search = searchText.trim()
    if (isBookMark) filter.myWished = true
    if (vendorId) filter.vendorId = vendorId
    try {
      const data = await interceptorClient.get('/product/findAll', { params: filter })
      if (data.data.content) {
        // setTotalItems(data.data.content)
        setUpdateItem(data.data.content)
      }
      if (data.data.totalElements) {
        setPageTotal(data.data.totalElements)
      } else {
        setPageTotal(0)
      }
    } catch (error: any) {
      setUpdateItem([])
      setPageTotal(0)
      showSnakbar('', error.message, profile)
    } finally {
      setLoading(false)
    }
  }

  const fetchDataFilter = async () => {
    try {
      const data = await interceptorClient.get('/product/filter')
      setDataFilter(data.data)
    } catch (error: any) {
      showSnakbar('', error.message, profile)
    }
  }
  // 밴더 정보
  const fetchDataVendor = async () => {
    try {
      const data = await interceptorClient.get('/product/vendor')
      setDataVendorList(data.data)
    } catch (error: any) {
      showSnakbar('', error.message, profile)
    }
  }
  // 브랜드 정보
  const fetchDataBrand = async (vendor: number | undefined) => {
    try {
      const data = await interceptorClient.get('/product/brand', { params: { vendorId: vendor } })
      setDataBrand(data.data)
    } catch (error: any) {
      showSnakbar('', error.message, profile)
    }
  }
  // 활성화 비활성화 변경
  const handleChangedActive = async (_active: ProductStatusBulkDtoStatus) => {
    const checkedItems: number[] = totalItems
      .filter((tItem) => tItem.checked)
      .map((filterItem) => filterItem.id!)
      .filter(Boolean)
    if (checkedItems.length === 0) {
      showSnakbar('', t('snackbar.errNotSelecteProduct'), profile)
      return null
    }
    try {
      const data = await interceptorClient.put('/product/status', {
        activated: _active,
        productIds: checkedItems,
      })
      if (data.data) {
        if (_active === ProductStatusBulkDtoStatus.ACTIVE) {
          // setActivated(false)
        }
        checkedItems.map((id) => {
          return setTotalItems((prev) => {
            return prev.map((tItem: ProductDTO | any) => {
              if (tItem.id === id) {
                return { ...tItem, activated: _active === ProductStatusBulkDtoStatus.ACTIVE }
              }
              return tItem
            })
          })
        })
        const result = updateItem.map((upItem) => {
          if (checkedItems.includes(upItem.id ?? 0)) {
            return { ...upItem, activated: _active === ProductStatusBulkDtoStatus.ACTIVE }
          }
          return upItem
        })
        setUpdateItem(result)
        showSnakbar('', t('snackbar.succActiveState'), profile)
      } else {
        showSnakbar('', t('snackbar.errActiveState'), profile)
      }
    } catch (error: any) {
      showSnakbar('', error.message, profile)
    }

    return null
  }

  // 상품 찜하기 추가 삭제
  const productWish = throttle(async (id: number, type: boolean) => {
    try {
      if (type) {
        await interceptorClient.delete(`/product/wish`, { data: { id } })
      } else {
        await interceptorClient.put(`/product/wish`, id)
      }
      setTotalItems((prev) => {
        return prev.map((tItem: ProductDTO | any) => {
          if (tItem.id === id) {
            return { ...tItem, myWished: !type }
          }
          return tItem
        })
      })
      showSnakbar('', t(type ? 'snackbar.removedWishState' : 'snackbar.favoritesWishState'), profile)
    } catch (error: any) {
      showSnakbar('', error.message, profile)
    }
  }, SHORT_TIME)
  // 카드 클릭 시 이벤트 목록
  const handleCardClick = (id: number, type: string) => {
    if (type === 'link') {
      router.push(`/product?editProd=${id}`)
    } else if (type === 'like') {
      const isWish = totalItems.find((tItem) => tItem.id === id)?.myWished
      if (isWish !== undefined) productWish(id, isWish)
    }
  }

  // table 체크박스 클릭 이벤트 관련
  const handleSetData = (id: number[], keys: any[], values: any[]) => {
    if (id[0] === 0) {
      // setActivated(values[0])
      setAllCheck(values[0])
      setTotalItems((prev) => {
        return prev.map((tItem: ProductDTO | any) => {
          return { ...tItem, checked: values[0] }
        })
      })
    } else {
      if (keys[0] === 'pageMove') {
        router.push(`/product?editProd=${id[0]}`)
      } else if (keys[0] === 'wishProduct') {
        const isWish = totalItems.find((tItem) => tItem.id === values[0])?.myWished
        if (isWish !== undefined) productWish(values[0], isWish)
      } else {
        setTotalItems((prev) => {
          const result: ProductResDto[] = prev.map((tItem: ProductDTO) => {
            if (id.includes(tItem.id ?? 0)) {
              const index = id.findIndex((it) => it === tItem.id)
              return { ...tItem, [keys[index]]: values[index] }
            }
            return tItem
          })
          return result
        })
      }
    }
  }

  const renderList = (): React.ReactNode => {
    if (loading) {
      return <ProductListSkeleton />
    }
    if (totalItems.length === 0) {
      return <div className={styles.grid_empty}>데이터가 없습니다.</div>
    }
    return totalItems.map((row: ProductResDto) => (
      <Fragment key={row.id}>
        <div
          key={row.id}
          className={`${row.activated ? 'grid-item-active' : 'grid-item-non-active'} "grid-item"`}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.preventDefault()
            handleCardClick(row.id ?? 0, 'link')
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              handleCardClick(row.id ?? 0, 'link')
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="상품정보"
        >
          <ProductCard
            item={row}
            cursor={`${size.width !== 0 ? 'pointer' : 'wait'}`}
            handleCardClick={handleCardClick}
            isActive
          />
        </div>
      </Fragment>
    ))
  }

  const renderTable = (): React.ReactNode => {
    if (loading) {
      return <TableSkeleton searchNum={PRODUCT_SEARCH_LIMIT} />
    }
    const headerProductT = dataTextI18(t, headerProduct)
    return (
      <Table
        isCheckbox
        allCheck={allCheck}
        header={headerProductT.map((headerItem: any) => {
          if (headerItem.i18n === 'common.state') {
            return {
              ...headerItem,
              dataRender: (data: any) => {
                return showStatus(data, data[0] ? t('prod.viewer-active') : t('prod.viewer-non-active'))
              },
            }
          }
          if (headerItem.i18n === 'common.etc') {
            return {
              ...headerItem,
              dataRender: (data: any) => {
                return showMoreIcon(data, dataMenuTextI18(t, productTableMenu), handleSetData)
              },
            }
          }
          return headerItem
        })}
        data={totalItems}
        selectItem={null}
        onSelected={(id, type) => {
          console.log(id, type)
          // if (type === 'selected') handleCardClick(id, 'link')
        }}
        handleSetData={handleSetData}
      />
    )
  }

  useEffect(() => {
    setTotalItems(updateItem)
  }, [updateItem])

  useEffect(() => {
    // const check = totalItems.some((value: ProductDTO) => {
    //   return value.checked === true
    // })
    // setActivated(check)
  }, [totalItems])

  // 필터 변경 시 디바운스
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(0)
      return setDebouncedFilter(true)
    }, SEARCH_TIME)
    return () => {
      setDebouncedFilter(false) // 검색 시간이 지나면 디바운스 값 false
      clearTimeout(timer)
    }
  }, [searchText, isBookMark, color, item, season, gender, pattern, brand, activated, vendorId])
  // }, [isBookMark, searchText, brand, line, color, item, lot, season, year, shipmentMonth, shipmentWeek])
  useEffect(() => {
    if (debouncedFilter) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilter, currentPage])

  useEffect(() => {
    fetchDataFilter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (isAdmin(authorities)) fetchDataVendor()
  }, [authorities])

  useEffect(() => {
    if (vendorId) {
      clearBrand()
      fetchDataBrand(vendorId)
    } else if (vendor) {
      clearBrand()
      fetchDataBrand(vendor.id)
    }
  }, [vendorId, vendor])

  return {
    dataFilter,
    ref,
    viewType,
    pageTotal,
    currentPage,
    dataVendorList,
    dataBrand,
    setCurrentPage,
    renderList,
    renderTable,
    handleChangedActive,
  }
}
