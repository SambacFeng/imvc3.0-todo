import React, { useState } from 'react'
import { useCtrl, useModelState } from 'react-imvc/hook'
import { State } from '../Model'

export default function TodoItem({
    id,
    text,
    done,
    CHECK_TODO,
    DELETE_TODO,
    START_EDITING,
    END_EDITING,
    UPDATE_TODO
}) {
    const state = useModelState<State>()
    const [newText, setNewText] = useState('')
    const ctrl = useCtrl()

    const handleChangeCheck = (id: number) => {
        CHECK_TODO(id)
    }

    const handleDelete = (id: number) => {
        if (window.confirm('确认要删除吗？')) {
            DELETE_TODO(id)
        }
    }

    const handleEdit = () => {
        START_EDITING(id)

        ctrl.history.push(`/#/id=${id}&text=${text}`, true)
        console.log(ctrl)

        setNewText(text)
    }

    const handleChange = (event) => {
        setNewText(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event)
        }
    }

    const handleSubmit = (event) => {
        const text = event.target.value.trim()
        text === '' ? window.confirm('确认要删除吗？') ? DELETE_TODO(id) : '' : UPDATE_TODO(text)
        setNewText('')
        END_EDITING()
    }

    return (
        <li>
            <input
                type="checkbox"
                checked={done}
                onChange={() => handleChangeCheck(id)}
            />
            <label>
                {
                    state.isEditing === id
                        ?
                        <span>
                            <input
                                type="text"
                                value={newText}
                                autoFocus
                                onBlur={handleSubmit}
                                onKeyDown={handleKeyDown}
                                onChange={handleChange} />
                            <button onClick={handleSubmit}>完成</button>
                        </span>
                        :
                        <span>
                            {text} <button onClick={handleEdit}>编辑</button>
                            <button onClick={() => handleDelete(id)}>删除</button>
                        </span>
                }
            </label>

        </li>
    )
}
