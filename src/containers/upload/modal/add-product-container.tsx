'use client'

import Button from '@/components/button/button'
import InputFileButton from '@/components/input/input-file-button'
import { useI18n, useScopedI18n } from '@/locales/client'
import Modal from '@/components/modal/modal'
import { FormProvider } from 'react-hook-form'
import useAddProductHooks from './useAddProductHooks'

export default function ModalAddProductContainer() {
  const {
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
  } = useAddProductHooks()
  const t = useI18n()
  const modalText = useScopedI18n('modal')
  return (
    <Modal>
      <h3 className="f_22 f_bold c_black text_center">{modalText('add-prod-title')}</h3>
      <p
        className="f_12 f_m c_black text_center"
        style={{
          paddingTop: '1rem',
          display: 'block',
        }}
      >
        {modalText('add-prod-desc')}
      </p>
      <p
        className="f_12 f_m c_place text_center"
        style={{
          paddingBottom: '44px',
          display: 'block',
        }}
      >
        ({modalText('add-prod-desc1')})
      </p>
      <FormProvider {...formMethod}>
        <form onSubmit={formMethod.handleSubmit(onSubmit)}>
          <InputFileButton
            placeholder={`${fileExcelName === '' ? modalText('add-prod-file-placeholder') : fileExcelName}`}
            label={modalText('add-prod-file-label')}
            btnTitle={t('common.select-file')}
            formRegister={excelFileRegister}
            enableBtn={!isUpload}
            onChange={(e) => handleChange(e, 'excelFile')}
            onClick={() => {}}
            accept=".xlsx, .xls, .csv"
          />
          <p
            className={`f_10 ${setClassName(formMethod.getValues('excelFile'), excelError)}`}
            style={{
              marginBottom: '24px',
            }}
          >
            {modalText('add-prod-file-error')}
          </p>
          <InputFileButton
            placeholder={`${fileImageName === '' ? modalText('add-prod-file-placeholder') : fileImageName}`}
            label={modalText('add-prod-image-label')}
            btnTitle={t('common.select-file')}
            maxLength={6}
            formRegister={imageFileRegister}
            enableBtn={!isUpload}
            onChange={(e) => handleChange(e, 'zipFile')}
            onClick={() => {}}
          />
          {formState.errors.zipFile?.message}
          <p
            className={`f_10 ${setClassName(formMethod.getValues('zipFile'), imageError)}`}
            style={{
              marginBottom: '52px',
            }}
          >
            {modalText('add-prod-image-error')}
          </p>
          <div className="flex_row">
            <div
              style={{
                flex: 1,
                marginLeft: '4px',
              }}
            >
              <Button
                theme={`${formMethod.getValues('excelFile') !== null && isUpload === false ? 'primary' : 'secondary'}`}
                size="mediumMax"
                type="submit"
                loading={isUpload}
                disabled={isUpload}
              >
                {modalText('add-prod-btn')}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  )
}
