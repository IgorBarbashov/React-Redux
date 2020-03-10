import React, { useState, useContext } from 'react';
import Context from '../../context';

function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue);

    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }
}

function AddTodo() {
    const { addItem } = useContext(Context);
    const input = useInputValue('');

    const onClickHandler = (e) => {
        e.preventDefault();
        addItem(input.value());
        input.clear();
    }

    return (
        <div className='add-wrapper'>
            <input
                type='text'
                className='add-todo-input'
                {...input.bind}
            />
            <button
                onClick={onClickHandler}
                className='add-todo-button'
                disabled={!input.value().length}
            >
                Add todo
            </button>
        </div>
    )
}

export default AddTodo;