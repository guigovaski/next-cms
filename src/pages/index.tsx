import type { GetStaticProps } from 'next'
import Image from 'next/image';
import styles from '../styles/home.module.scss';

import { prismicInit } from '../config/prismic';
import { RichText } from 'prismic-dom';
import { HomeSection } from '../components/HomeSection';
import { BlueButton } from '../components/BlueButton';

import techsImg from '../../public/images/techs.svg'; 

type Props = {
  data: {
    title: string;
    titleContent: string;
    mobileTitle: string;
    mobileContent: string;
    mobileBanner: string;
    mobileBannerDimensions: {
      width: number;
      height: number;
    };
    mobileBannerAlt: string;
    webTitle: string;
    webContent: string;
    webBanner: string;
    webBannerDimensions: {
      width: number;
      height: number;
    };
    webBannerAlt: string;
  }
}

export default function Home({ data }: Props) {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.contentArea}>
            <h1>{data.title}</h1>
            <p>{data.titleContent}</p>
            <a>
              <BlueButton text="fazer orçamento" />
            </a>
          </div>
          <Image src="/images/banner.png" alt="Projetos" width={600} height={600} />
        </div>
      </main>

      <hr className={styles.divisor} />
      
      <HomeSection
        title={data.mobileTitle}
        text={data.mobileContent}
        image={data.mobileBanner}
        alt={data.mobileBannerAlt}
      />

      <hr className={styles.divisor} />

      <HomeSection
        title={data.webTitle}
        text={data.webContent}
        image={data.webBanner}
        alt={data.webBannerAlt}
      />

      <footer className={styles.footer}>
        <Image src={techsImg} alt="Tecnologias" />
        <h2 className={styles.texth2}>Trabalhamos com as melhores tecnologias do mercado</h2>
        <p>Dentre elas: ReactJS, NodeJS, JavaScript, Redux, Sass etc.</p>
        <BlueButton text="fazer orçamento" />
      </footer>

    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismicDoc = prismicInit();

  const res = await prismicDoc.getByUID('home', 'levando-voce-ao-proximo-nivel');

  const data = {
    title: RichText.asText(res.data.title),
    titleContent: RichText.asText(res.data.content),
    mobileTitle: RichText.asText(res.data.mobile_title),
    mobileContent: RichText.asText(res.data.mobile_content),
    mobileBanner: res.data.mobile_banner.url,
    mobileBannerAlt: res.data.mobile_banner.alt,
    webTitle: RichText.asText(res.data.web_title),
    webContent: RichText.asText(res.data.web_content),
    webBanner: res.data.web_banner.url,
    webBannerAlt: res.data.web_banner.alt,
  };

  return {
    props: {
      data
    },
    revalidate: 60 * 15
  }
} 
