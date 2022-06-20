import React from 'react'
import { useModel } from 'react-imvc/hook'

import type { State } from '../Model'
import type { Actions } from '../Controller'

export default function Footer() {
    const [state, actions] = useModel<State, Actions>()
    const { todos } = state
    const { CHECK_ALL, CLEAR_DONE } = actions

    const doneCount = todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)

    const handleCheckAll = () => {
        CHECK_ALL()
    }

    const handleClear = () => {
        if (window.confirm('确认要删除吗？')) {
            CLEAR_DONE()
        }
    }

    return (
        <div>
            <span>{doneCount} / {todos.length} 已完成 </span>
            <button onClick={handleCheckAll}>全选</button>
            <button onClick={handleClear}>删除全部已完成</button>
        </div>
    )
}
