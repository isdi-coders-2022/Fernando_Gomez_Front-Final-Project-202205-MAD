import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../chat/chat-socket';
import { iUser } from '../../interfaces/interfaces';
import styles from './index.module.css';


export const openAlert = () => {
    document.querySelector('#back-alert')?.classList.remove(`${styles.d_none}`);
    
    document.querySelector('#back-alert')?.classList.add(`${styles.d_initial}`);

};

export const closeAlert = () => {
    document
        .querySelector('#back-alert')
        ?.classList.remove(`${styles.d_initial}`);
    document.querySelector('#back-alert')?.classList.add(`${styles.d_none}`);
};


export function Alert({id, token}: {id:string, token:string}) {
    const navigate = useNavigate();
    
    
    
    const deleteAccount = async (ev: SyntheticEvent) => {
        ev.preventDefault();
    
        console.log('send from socket: ', id, token);
        socket.emit('delete-account', 
            {id, token}
        );
    
    }

    

    return (
        <div
            id="back-alert"
            className={`${styles.back_modal} ${styles.d_none}`}
            onClick={closeAlert}
        >
            <div id="drop-menu" className={`${styles.modal}`}>
                <div>
                    <span>
                        <img
                            onClick={closeAlert}
                            className={`${styles.link} ${styles.cancel}`}
                            src="./assets/cancel.png"
                            alt="close window"
                        />
                    </span>
                </div>
                <div>¿Realmente deseas eliminar tu cuenta?</div>
                <div className={`${styles.link}`}>
                    <button onClick={closeAlert}>Cancelar</button>
                    <button onClick={deleteAccount}>Confirmar</button>
                </div>
            </div>
        </div>
    );
}
function updatedUser(arg0: string, updatedUser: any) {
    throw new Error('Function not implemented.');
}

