import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { RichText } from 'prismic-dom';
import { prismicInit } from '../../config/prismic';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

import styles from './styles.module.scss';

type Props = {
    data: {
        title: string;
        content: string;
        banner: string;
        altText: string;
        facebook: string;
        instagram: string;
        youtube: string;
        linkedin: string;
    }
}

export default function About({ data }: Props) {

    return (
        <>
            <Head>
                <title>Quem somos?</title>
            </Head>

            <main className={styles.main}>
                <section className={styles.container}>
                    <div className={styles.content}>
                        <h1>{data.title}</h1>
                        <p>{data.content}</p>
                        <div>
                            <a href={data.facebook} target="_blank" rel="noreferrer">
                                <FaFacebook size={40} />
                            </a>
                            <a href={data.instagram} target="_blank" rel="noreferrer">
                                <FaInstagram size={40} />
                            </a>
                            <a href={data.youtube} target="_blank" rel="noreferrer">
                                <FaYoutube size={40} />
                            </a>
                            <a href={data.linkedin} target="_blank" rel="noreferrer">
                                <FaLinkedin size={40} />
                            </a>
                        </div>
                    </div>
                    <div className={styles.banner}>
                        <Image 
                            src={data.banner} 
                            alt={data.altText} 
                            width={600} 
                            height={600} 
                        />
                    </div>
                </section>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismicDoc = prismicInit();

    const res = await prismicDoc.getByType('about');

    const base = res.results[0].data;

    const data = {
        title: RichText.asText(base.title),
        content: RichText.asText(base.content),
        banner: base.banner.url,
        altText: base.banner.alt,
        facebook: base.facebook.url,
        instagram: base.instagram.url,
        youtube: base.youtube.url,
        linkedin: base.linkedin.url
    }

    return {
        props: {
            data
        },
        revalidate: 60 * 15
    }
}