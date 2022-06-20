import React, { useState } from 'react'
import { useModelActions } from 'react-imvc/hook'
import { State } from '../Model'
import type { Todo } from '../Model'
import type { Actions } from '../Controller'

export default function Header() {
    const [text, setText] = useState('')
    const { ADD_TODO } = useModelActions<State, Actions>()

    const handleKeyUp = (event) => {
        const { key, target } = event
        if (key === 'Enter') {
            const text = target.value.trim()
            if (text === '') {
                alert('输入不能为空')
                return
            }
            const newTodo: Todo = {
                id: Date.now(),
                text,
                done: false
            }
            ADD_TODO(newTodo)
            setText('')
        }
    }

    const handleChange = (event) => {
        setText(event.target.value)
    }

    return (
        <header>
            <h1>TODOS</h1>
            <input
                type="text"
                value={text}
                onKeyUp={handleKeyUp}
                onChange={handleChange}
                placeholder="输入待办内容，按回车确认"
            />
        </header>
    )
}
