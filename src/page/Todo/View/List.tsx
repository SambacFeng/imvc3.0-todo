import React from 'react'
import { useModel } from 'react-imvc/hook'
import { State } from '../Model'
import type { Actions } from '../Controller'

import TodoItem from './TodoItem'

export default function List() {
    const [state, actions] = useModel<State, Actions>()
    const { todos } = state
    const { DELETE_TODO, CHECK_TODO, START_EDITING, END_EDITING, UPDATE_TODO } = actions
    return (
        <ul>
            {
                todos.map(todo => {
                    return (
                        <TodoItem
                            key={todo.id}
                            {...todo}
                            CHECK_TODO={CHECK_TODO}
                            DELETE_TODO={DELETE_TODO}
                            START_EDITING={START_EDITING}
                            END_EDITING={END_EDITING}
                            UPDATE_TODO={UPDATE_TODO}
                        />
                    )
                })
            }
        </ul>
    )
}
