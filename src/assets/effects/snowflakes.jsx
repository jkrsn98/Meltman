import React from 'react'
import './snowflakes.css';

export default function snowflakes() {
    const snowflakes = ['❅','❆','❅','❆','❅','❆','❅','❆','❅','❆','❅','❆'];
    return (
        <div class="snowflakes" aria-hidden="true">
            {snowflakes.map( (s) => (<div class="snowflake">{s}</div>))}
        </div>
    )
}
