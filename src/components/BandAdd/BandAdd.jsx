import React, { useState } from 'react'
import { useContext } from 'react/cjs/react.development';
import { SocketContext } from '../../context/SocketContext';

export const BandAdd = () => {

    const [valor, setValor] = useState('');
    const { socket } = useContext(SocketContext);

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(valor);
        if (valor.trim().length > 0) {
            // TODO llamar la funcion para emitir el evento
            crearBanda(valor);
            setValor('');
        }
    }

    const crearBanda = (nombre) => {
        socket.emit('nueva-banda', nombre);
    }
    return (
        <>
            <h3>Agregar Banda</h3>
            <form
                onSubmit={onSubmit}
                action="" className="">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Nuevo nombre de banda"
                    value={valor}
                    onChange={(ev) => setValor(ev.target.value)}
                />
            </form>
        </>
    )
}
