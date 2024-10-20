import { getScopedI18n } from '@/locales/server'

export default async function ErrorUi() {
  const t = await getScopedI18n('common')
  return (
    <div>
      <p className="f_10">{t('errView')}</p>
    </div>
  )
}
