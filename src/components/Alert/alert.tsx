import styles from './index.module.css';

export const openAlert = () => {
    document
        .querySelector('#back-alert')
        ?.classList.remove(`${styles.d_none}`);
    // document
    //     .querySelector('#drop-menu')
    //     ?.classList.remove(`${styles.d_none}`);
    document
        .querySelector('#back-alert')
        ?.classList.add(`${styles.d_initial}`);
    // document
    //     .querySelector('#drop-menu')
    //     ?.classList.add(`${styles.d_initial}`);
};

export const closeAlert = () => {
    document
        .querySelector('#back-alert')
        ?.classList.remove(`${styles.d_initial}`);
    document.querySelector('#back-alert')?.classList.add(`${styles.d_none}`);
};

export function Alert() {
    return (
        <div
            id="back-alert"
            className={`${styles.back_modal} ${styles.d_none}`}
            onClick={closeAlert}
        >
            <div id="drop-menu" className={`${styles.modal}`}>
                <div onClick={closeAlert}>
                    <span>
                        <img
                            className={`${styles.link} ${styles.cancel}`}
                            src="./assets/cancel.png"
                            alt="close window"
                        />
                    </span>
                </div>
                <div  className={`${styles.link}`}>
                    mensaje
                </div>
                <div  className={`${styles.link}`}>
                    <span>
                        botón
                        <img src="./assets/shutdown.png" alt="logout" />{' '}
                    </span>
                </div>
            </div>
        </div>
    );
}
