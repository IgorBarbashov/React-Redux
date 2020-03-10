import React from 'react'
import TodoItem from './TodoItem';

const styles = {
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    }
}

export default function TodoList({ todos, toggleCompleted }) {
    return (
        <ul style={styles.ul}>
            {todos.map((el, index) => <TodoItem index={index} key={`${el.id}-${index}`} item={el} toggleCompleted={toggleCompleted}/>)}
        </ul>
    )
}