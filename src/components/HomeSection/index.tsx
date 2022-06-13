import Image from 'next/image';
import styles from './styles.module.scss';

type Props = {
    title: string;
    text: string;
    image: string;
    alt: string;
}

export function HomeSection({ title, text, image, alt }: Props) {

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.contentArea}>
                    <h2>{title}</h2>
                    <p>{text}</p>
                </div>
                <div className={styles.imageArea}>
                    <Image src={image} alt={alt} width={600} height={600} />
                </div>
            </div>
        </section>
    );
}
