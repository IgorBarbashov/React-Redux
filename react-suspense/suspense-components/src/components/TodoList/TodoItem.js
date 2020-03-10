import React, { useContext } from 'react'
import Context from '../../context';

export default function TodoItem({ index, item, toggleCompleted }) {
    const { id, completed, title } = item;

    const { delItem } = useContext(Context);

    const styles = {
        li: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid black',
            borderRadius: '5px',
            marginTop: '10px',
            padding: '5px'
        },
        input: {
            marginRight: '10px'
        }
    }

    function onInputHandler() {
        toggleCompleted(index);
    }

    function onButtonHandler(e) {
        e.preventDefault(e);
        delItem(id);
    }

    return (
        <li style={styles.li} >
            <span>
                <input checked={completed} onClick={onInputHandler} style={styles.input} type='checkbox' />
                <span className={completed ? 'completed' : ''}>{title}</span>
            </span>
            <button onClick={onButtonHandler} className='rm'>&times;</button>
        </li>
    )
}