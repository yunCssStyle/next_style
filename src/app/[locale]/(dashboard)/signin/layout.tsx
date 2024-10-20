import Provider from '@/components/provider'
import Image from 'next/image'
import bgImg from 'public/images/imgs/img_sign.png'
import styles from './layout.module.scss'
import SignBack from './_client/icons/sign-back'

export default async function SignInLayout({
  params: { locale },
  children,
}: {
  params: { locale: string }
  children: React.ReactNode
}) {
  return (
    <Provider locale={locale}>
      <div
        className={styles.signLayout}
        style={{
          minWidth: '590px',
        }}
      >
        <div className={styles.signContainer}>
          <div className={styles.signInContainer}>
            <SignBack />
            <div className={styles.signInDiv}>{children}</div>
          </div>
          {/* <div className={styles.signInBg}>
            <Image
              src={bgImg}
              alt="Sign In Background Image"
              fill
              sizes="608px"
              quality={75}
              priority
              placeholder="blur"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div> */}
        </div>
        <h4 className={styles.copy_right}>@2024 STYLEBOT ALL Right Reserved.</h4>
      </div>
    </Provider>
  )
}
