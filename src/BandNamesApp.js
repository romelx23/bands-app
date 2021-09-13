import React from 'react'
import HomePage from './pages/HomePage'
import { SocketProider } from './context/SocketContext'

export const BandNamesApp = () => {
    return (
        <SocketProider>
            <HomePage/>
        </SocketProider>
    )
}
