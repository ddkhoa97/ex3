import React from 'react'

import Search from './Search'
import styles from "./Client.module.css"

export default function ClientView(props) {
    return (
        <div className= {styles.body}>
         
            {props.items.map(item => <Search key={item.id} {...item} />)}

        </div>
    )
}
