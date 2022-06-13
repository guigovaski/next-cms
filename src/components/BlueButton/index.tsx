import styles from './styles.module.scss';

export function BlueButton({ text }: { text: string }) {

    return (
        <button className={styles.button}>{text}</button>
    );
}
