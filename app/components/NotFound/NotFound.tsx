import React from 'react'
import './NotFound.css'

const NotFound = () => {
    return (
    <div className="terminal-loader">
    <div className="terminal-header">
        <div className="terminal-title">Status</div>
        <div className="terminal-controls">
        <div className="control close"></div>
        <div className="control minimize"></div>
        <div className="control maximize"></div>
    </div>
    </div>
    <div className="text">Not Entry Found...</div>
    </div>
    )
}

export default NotFound