import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { RichText } from 'prismic-dom';
import { prismicInit } from '../../config/prismic';

import styles from './post.module.scss';

type Props = {
    data: {
        slug: string;
        title: string;
        banner: string;
        content: string;
        updatedAt: string;
    }
}

export default function Post({ data }: Props) {

    return (
        <>
            <Head>
                <title>{data.title}</title>
            </Head>

            <main className={styles.main}>
                <article className={styles.container}>
                    <Image 
                        src={data.banner}
                        width={720}
                        height={410}
                        alt={data.title}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMM/A8AAacBUvjH9TsAAAAASUVORK5CYII="
                    />
                    <h1>{data.title}</h1>
                    <time>{data.updatedAt}</time>
                    <div className={styles.postContent} dangerouslySetInnerHTML={{__html: data.content}}></div>
                </article>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const { slug } = params!;

    const prismicDoc = prismicInit();

    const res = await prismicDoc.getByUID('posts', slug as string)

    if (!res) {
        return {
            redirect: {
                destination: '/posts',
                permanent: false
            }
        }
    }

    const data = {
        slug,
        title: RichText.asText(res.data.title),
        banner: res.data.banner.url,
        content: RichText.asHtml(res.data.content),
        updatedAt: new Date(res.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            data
        }
    }
}
