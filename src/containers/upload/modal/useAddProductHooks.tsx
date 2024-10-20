'use client'

import { useScopedI18n } from '@/locales/client'
import { fetchFileUpload } from '@/services/files'
import { PresignedUrlResDto } from '@/services/generated/managerstore.schemas'
import interceptorClient from '@/services/mutator/interceptorClient'
import { setIsInsert } from '@/stores/upload-filter'
import { useUserInfoStore } from '@/stores/user-info'
import { ProductFileValues } from '@/types/props/props'
import { regexExcelFile } from '@/utils/regex/regex'
import { showSnakbar } from '@/utils/utils'
import { throttle } from 'lodash'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function useAddProductHooks() {
  const router = useRouter()
  const upload = useScopedI18n('modal')
  const snackbar = useScopedI18n('snackbar')
  const profile = useUserInfoStore((state) => state.profile)

  const formMethod = useForm<ProductFileValues>({
    defaultValues: {
      excelFile: null,
      zipFile: null,
    },
  })
  const { register, formState } = useForm<ProductFileValues>()
  const excelFileRegister = register('excelFile', {
    required: { value: true, message: upload('add-prod-file') },
  })
  const imageFileRegister = register('excelFile', {
    required: { value: true, message: upload('add-prod-file') },
  })

  const [isUpload, setIsUpload] = useState(false) // 업로드 여부
  const [fileExcelName, setExcelFileName] = useState('') // 엑셀 파일 이름
  const [excelError, setExcelError] = useState(false) // 엑셀 파일 에러
  const [fileImageName, setImageFileName] = useState('') // 이미지 파일 이름
  const [imageError, setImageError] = useState(false) // 이미지 파일 에러

  const onSubmit: SubmitHandler<ProductFileValues> = throttle(async (data) => {
    if (formMethod.getValues('excelFile') !== null) {
      try {
        setIsUpload(true)
        const result: PresignedUrlResDto[] = await interceptorClient
          .post('/productUpload/presigned-urls', {
            count: formMethod.getValues('zipFile') !== null ? 2 : 1,
            directory: 'PRIVATE',
          })
          .then((res) => res.data)
        await Promise.all(
          result.map(async (item, index) => {
            await fetchFileUpload(item.url, index === 0 ? data.excelFile : data.zipFile)
            return item
          }),
        )
        await interceptorClient.post('/productUpload', {
          infoFileName: fileExcelName,
          infoFileUuid: result[0].uuid,
          imageZipFileName: formMethod.getValues('zipFile') !== null ? fileImageName : null,
          imageZipFileUuid: formMethod.getValues('zipFile') !== null ? result[1].uuid : null,
        })
        setIsInsert(true)
        showSnakbar('', snackbar('succUploadFile'), profile)
      } catch (error) {
        showSnakbar('', snackbar('errUploadDB'), profile)
      } finally {
        setIsUpload(false)
        router.back()
      }
    }
  }, 1000)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    if (e.target.files === null) return
    const fileUploaded = e.target.files[0]
    if (name === 'excelFile') {
      if (fileUploaded.name.match(regexExcelFile)) {
        setExcelFileName(fileUploaded.name)
        formMethod.setValue('excelFile', fileUploaded)
        setExcelError(false)
      } else {
        setExcelFileName('')
        formMethod.setValue('excelFile', null)
        setExcelError(true)
      }
    } else if (name === 'zipFile') {
      if (fileUploaded.size > 524288000) {
        setImageFileName('')
        formMethod.setValue('zipFile', null)
        setImageError(true)
      } else {
        setImageFileName(fileUploaded.name)
        formMethod.setValue('zipFile', fileUploaded)
        setImageError(false)
      }
    }
  }

  const setClassName = (name: File | null, isError: boolean) => {
    if (name !== null) {
      return 'c_green'
    }
    if (isError) {
      return 'c_danger'
    }
    return 'c_place'
  }

  return {
    formMethod,
    formState,
    excelFileRegister,
    imageFileRegister,
    isUpload,
    fileExcelName,
    fileImageName,
    excelError,
    imageError,
    onSubmit,
    handleChange,
    setClassName,
  }
}
