import styles from './avatar.module.css'

export function Avatar({src, alt}: {src: string, alt: string}) {
    return <img className={styles.img} src={src} alt={alt} />;
}
