'use client'

import { StyledForm } from '@/app/[locale]/(dashboard)/signin/_client/form/style-form'
import Button from '@/components/button/button'
import Input from '@/components/input/input'
import Modal from '@/components/modal/modal'
import SelectBox from '@/components/select/select-box'
import UiColorText from '@/components/ui/ui-color-text'
import { LONG_TIME } from '@/constants/numbers'
import { activatedFilter } from '@/constants/radio-filter'
import { useI18n } from '@/locales/client'
import interceptorClient from '@/services/mutator/interceptorClient'
import { setUpdateItem, useProductStore } from '@/stores/product'
import { useUserInfoStore } from '@/stores/user-info'
import { ProductEditSchema, ProductEditType } from '@/types/form/form-schema'
import ProductDTO from '@/types/product'
import { formatNumberWithComma, removeCommaFromNumber } from '@/utils/regex/regex'
import { isHexColor, showSnakbar } from '@/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { throttle } from 'lodash'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './modal.module.scss'

export default function ModalEditContainer() {
  const router = useRouter()
  const params = useSearchParams()
  const getId = params.get('editProd')
  const profile = useUserInfoStore((state) => state.profile)
  const updateItem = useProductStore((state) => state.updateItem)
  const formMethod = useForm<ProductEditType>({
    resolver: zodResolver(ProductEditSchema),
  })
  const { register, setValue, formState, getValues, handleSubmit } = formMethod
  const t = useI18n()
  const [isProductItem, setIsProductItem] = useState<ProductDTO>()
  const [, setIsActivatedItem] = useState<boolean>(false)

  useEffect(() => {
    if (updateItem.length === 0) return
    const data = updateItem.filter((item) => item.id === Number(getId))[0]
    setIsProductItem(data)
    setIsActivatedItem(data.activated)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateItem])

  useEffect(() => {
    if (isProductItem === undefined) return
    setValue('code', isProductItem.code ?? '', { shouldValidate: true })
    setValue('name', isProductItem.name ?? '', { shouldValidate: true })
    setValue('url', isProductItem.productOption?.detailSiteUrl ?? '', { shouldValidate: true })
    setValue('price', formatNumberWithComma(String(isProductItem.productOption?.price)) ?? '', { shouldValidate: true })
    setValue('priceDiscount', formatNumberWithComma(String(isProductItem.productOption?.priceDiscount)) ?? '', {
      shouldValidate: true,
    })
    setValue('activated', isProductItem.activated ?? false, { shouldValidate: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProductItem])

  const handleInputChange =
    (fieldName: keyof ProductEditType) =>
    (event: { target: any; type?: any }): Promise<boolean | void> => {
      const inputValue = event.target.value
      if (inputValue === '') {
        setValue(fieldName, '')
      } else {
        setValue(fieldName, formatNumberWithComma(inputValue))
      }
      return Promise.resolve(true)
    }

  const onSubmit: SubmitHandler<ProductEditType> = throttle(async () => {
    if (formState.isValid) return
    try {
      const result = await interceptorClient.put('/product', {
        id: getId,
        productUpdateDto: {
          code: getValues('code'),
          activated: getValues('activated'),
          name: getValues('name'),
          productOption: {
            detailSiteUrl: getValues('url'),
            price: removeCommaFromNumber(getValues('price')),
            priceDiscount: getValues('priceDiscount') === '' ? 0 : removeCommaFromNumber(getValues('priceDiscount')),
          },
        },
      })
      const items = updateItem.map((item) => {
        if (item.id === result.data.id) {
          return result.data
        }
        return item
      })
      setIsProductItem(result.data)
      setUpdateItem(items)
      showSnakbar('', t('snackbar.succEditGoods'), profile)
      router.back()
    } catch (error: any) {
      showSnakbar('', error.message, profile)
    }
  }, LONG_TIME)

  if (isProductItem === undefined) return null
  return (
    <Modal>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register('code').ref}
          onChange={register('code').onChange}
          onBlur={register('code').onBlur}
          name={register('code').name}
          value=""
          placeholder={t('modal.prod-code-placeholder')}
          label={t('modal.prod-code')}
          inputType="s1"
          readOnly
        />
        <div className={styles.modal_row}>
          <div className={styles.modal_flex}>
            <span className={styles.modal_label}>{t('common.gender')}</span>
            <SelectBox
              width="100%"
              labelRender={isProductItem.genderType ?? ''}
              labelColor="var(--color-placeholder-grey-disabled)"
              datas={[]}
              onClickOptionValue={() => {}}
              fontSize="0.75rem"
              top="32px"
            />
          </div>
          <div className={styles.modal_flex}>
            <span className={styles.modal_label}>{t('common.pattern')}</span>
            <SelectBox
              width="100%"
              labelRender={isProductItem.patternType ?? ''}
              labelColor="var(--color-placeholder-grey-disabled)"
              datas={[]}
              onClickOptionValue={() => {}}
              fontSize="0.75rem"
              top="32px"
            />
          </div>
        </div>
        <div className={styles.modal_row}>
          <div className={styles.modal_flex}>
            <span className={styles.modal_label}>{t('common.color')}</span>
            <SelectBox
              width="100%"
              labelRender={
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <UiColorText
                    fontSize="0.75rem"
                    color={isHexColor(isProductItem.colorType ?? '')}
                    text={isProductItem.colorType ?? ''}
                    textColor="var(--color-placeholder-grey-disabled)"
                  />
                </div>
              }
              datas={[]}
              onClickOptionValue={() => {}}
              fontSize="0.75rem"
              top="32px"
            />
          </div>
          <div className={styles.modal_flex}>
            <span className={styles.modal_label}>{t('common.season')}</span>
            <SelectBox
              width="100%"
              labelRender={isProductItem.seasonTypes}
              labelColor="var(--color-placeholder-grey-disabled)"
              datas={[]}
              onClickOptionValue={() => {}}
              fontSize="0.75rem"
              top="32px"
            />
          </div>
        </div>
        <Input
          ref={register('name').ref}
          onChange={(data) => {
            setIsProductItem(
              (prev) =>
                prev && {
                  ...prev,
                  name: data.target.value,
                },
            )
            return Promise.resolve(register('name').onChange(data))
          }}
          onBlur={register('name').onBlur}
          name={register('name').name}
          value=""
          placeholder={t('modal.goods-name-placeholder')}
          label={t('modal.goods-name')}
          inputType="s1"
        />
        <div className={styles.modal_row}>
          <div className={styles.modal_flex}>
            <Input
              ref={register('price').ref}
              onBlur={handleInputChange('price')}
              onChange={(data) => {
                setIsProductItem(
                  (prev) =>
                    prev && {
                      ...prev,
                      productOption: {
                        ...prev.productOption,
                        price: data.target.value,
                      },
                    },
                )
                return handleInputChange('price')(data)
              }}
              name={register('price').name}
              value=""
              placeholder={t('modal.price-placeholder')}
              label={t('modal.price')}
              inputType="s1"
              marginBottom="0"
            />
          </div>
          <div className={styles.modal_flex}>
            <Input
              ref={register('priceDiscount').ref}
              onBlur={handleInputChange('priceDiscount')}
              onChange={(data) => {
                setIsProductItem(
                  (prev) =>
                    prev && {
                      ...prev,
                      productOption: {
                        ...prev.productOption,
                        priceDiscount: data.target.value,
                      },
                    },
                )
                return handleInputChange('priceDiscount')(data)
              }}
              name={register('priceDiscount').name}
              value=""
              placeholder={t('modal.price-discount-placeholder')}
              label={t('modal.price-discount')}
              inputType="s1"
              marginBottom="0"
            />
          </div>
        </div>
        <Input
          ref={register('url').ref}
          onChange={(data) => {
            setIsProductItem(
              (prev) =>
                prev && {
                  ...prev,
                  productOption: {
                    ...prev.productOption,
                    detailSiteUrl: data.target.value,
                  },
                },
            )
            return Promise.resolve(register('url').onChange(data))
          }}
          onBlur={register('url').onBlur}
          name={register('url').name}
          value=""
          placeholder={t('modal.detail-site-url-placeholder')}
          label={t('modal.detail-site-url')}
          inputType="s1"
        />
        <div className={styles.modal_row}>
          <div className={styles.modal_flex}>
            <span className={styles.modal_label}>{t('prod.viewer-active')}</span>
            <SelectBox
              labelRender={
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <UiColorText
                    fontSize="0.75rem"
                    color={(isProductItem?.activated ? 'var(--color-gren)' : 'var(--color-red)') ?? ''}
                    text={(isProductItem?.activated ? t('prod.viewer-active') : t('prod.viewer-non-active')) ?? ''}
                  />
                </div>
              }
              datas={activatedFilter.map((item) => {
                switch (item.name) {
                  case '활성화':
                    return {
                      ...item,
                      name: t('prod.viewer-active'),
                    }
                  default:
                    return {
                      ...item,
                      name: t('prod.viewer-non-active'),
                    }
                }
              })}
              onClickOptionValue={(data) => {
                setIsProductItem(
                  (prev) =>
                    prev && {
                      ...prev,
                      activated: data === 'true',
                    },
                )
              }}
              selectedValue={(isProductItem?.activated ? 'true' : 'false') ?? ''}
              fontSize="0.75rem"
              top="32px"
              showArrow
              formRegister={register('activated')}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: '42px',
          }}
        >
          <Button size="cerMediumMax" theme="primary" type="submit" borderRadius="3px">
            {t('common.edit')}
          </Button>
        </div>
      </StyledForm>
    </Modal>
  )
}
