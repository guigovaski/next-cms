import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi';
import { RichText } from 'prismic-dom';

import styles from './styles.module.scss';
import { GetStaticProps } from 'next';
import { prismicInit } from '../../config/prismic';

type DataType = {
    slug: string;
    title: string;
    banner: string;
    content: string;
    updatedAt: string;
}

type Props = {
    data: DataType[];
    page: string;
    totalPages: string;
}

export default function Posts({ data, page, totalPages }: Props) {
    const [posts, setPosts] = useState(data || []);
    const [currentPage, setCurrentPage] = useState(+page);

    async function getPosts(page: number) {
        const prismicDoc = prismicInit();

        const res = await prismicDoc.getByType('posts', {
            orderings: {
                field: 'document.last_publication_date',
                direction: 'desc'
            },
            pageSize: 2,
            page
        });

        return res;
    }

    async function switchPage(page: number) {
        const res = await getPosts(page);

        if (res.results.length < 1) return;
        
        const data = res.results.map(item => {
            return {
                slug: item.uid!,
                title: RichText.asText(item.data.title),
                banner: item.data.banner.url,
                content: item.data.content.find((item: any) => item.type === 'paragraph').text ?? 'Post sem conteúdo',
                updatedAt: new Date(item.last_publication_date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })
            }
        })

        setCurrentPage(page);
        setPosts(data);
    }

    return (
        <>
            <Head>
                <title>Blog | My Project</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.container}>
                    {posts.length > 0 && posts.map((item, index) => (
                        <Link key={index} href={`/posts/${item.slug}`}>
                            <a>
                                <Image 
                                    src={item.banner} 
                                    alt={item.title} 
                                    width={720}
                                    height={410}
                                    quality={100}
                                    placeholder="blur"
                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMM/A8AAacBUvjH9TsAAAAASUVORK5CYII="
                                />
                                <h2>{item.title}</h2>
                                <time>{item.updatedAt}</time>
                                <p>{item.content}</p>
                            </a>
                        </Link>
                    ))}
                    
                    <div className={styles.navigateButtons}>
                        {currentPage >= 2 && (
                            <div>
                                <button onClick={() => switchPage(1)}>
                                    <FiChevronsLeft size={25} color="#FFF" />
                                </button>
                                <button onClick={() => switchPage(currentPage - 1)}>
                                    <FiChevronLeft size={25} color="#FFF" />
                                </button>
                            </div>
                        )}
                        {currentPage < +totalPages && (
                            <div>
                                <button onClick={() => switchPage(currentPage + 1)}>
                                    <FiChevronRight size={25} color="#FFF" />
                                </button>
                                <button onClick={() => switchPage(+totalPages)}>
                                    <FiChevronsRight size={25} color="#FFF" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismicDoc = prismicInit();
    
    const res = await prismicDoc.getByType('posts', {
        orderings: {
            field: 'document.last_publication_date',
            direction: 'desc'
        },
        pageSize: 2,
    });

    const data = res.results.map(item => {
        return {
            slug: item.uid,
            title: RichText.asText(item.data.title),
            banner: item.data.banner.url,
            content: item.data.content.find((item: any) => item.type === 'paragraph').text ?? 'Post sem conteúdo',
            updatedAt: new Date(item.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return {
        props: {
            data,
            page: res.page,
            totalPages: res.total_pages
        },
        revalidate: 60 * 30
    }
}
