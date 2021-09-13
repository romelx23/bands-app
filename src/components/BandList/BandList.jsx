import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/SocketContext';
import './BandList.css';
export const BandList = () => {

    const [bands, setBands] = useState([]);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setBands(bands);
        })
        return ()=> socket.off('current-bands');
    }, [socket])

    const cambioNombre = (event, id) => {
        const nuevoNombre = event.target.value;
        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = nuevoNombre
            }
            return band;
        }))
    }

    const onPerdioFoco = (id, nombre) => {
        // TODO Dispara el evento de socket
        socket.emit('cambiar-nombre-banda', { id, nombre });
    }

    const votar = (id) => {
        // console.log('votar-app',id);
        socket.emit('votar-banda', id);
    }

    const borrar = (id) => {
        // console.log('votar-app',id);
        socket.emit('borrar-banda', id);
    }

    const crearRows = () => {

        return (
            bands.map((band => (

                <tr key={band.id}>
                    <td><button
                        onClick={() => votar(band.id)}
                        className="btn btn-primary">
                        +1</button></td>
                    <td>
                        <input
                            type="text"
                            value={band.name}
                            className="form-control"
                            onChange={(ev) => cambioNombre(ev, band.id)}
                            onBlur={() => onPerdioFoco(band.id, band.name)}
                        />
                    </td>
                    <td> <h3>{band.votes}</h3> </td>
                    <td><button
                        onClick={() => borrar(band.id)}
                        className="btn btn-danger">Borrar</button></td>
                </tr>
            )
            ))
        );

    }

    return (
        <>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {crearRows()}
                </tbody>
            </table>

        </>
    )
}
