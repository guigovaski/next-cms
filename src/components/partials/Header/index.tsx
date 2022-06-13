import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { ActiveLink } from '../../ActiveLink';

import logo from '../../../../public/images/logo.png';

export function Header() {

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <Link href="/">
                    <a>
                        <Image src={logo} alt="Logo System" />
                    </a>
                </Link>

                <nav>
                    <ActiveLink activeClass={styles.active} href="/">
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink activeClass={styles.active} href="/posts">
                        <a>Conteúdos</a>
                    </ActiveLink>
                    <ActiveLink activeClass={styles.active} href="/about">
                        <a>Quem somos?</a>
                    </ActiveLink>
                </nav>

                <a className={styles.moreButton} type="button" href="#">Saiba Mais</a>
            </div>
        </header>
    );
}