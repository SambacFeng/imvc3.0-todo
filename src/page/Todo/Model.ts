import { Action } from "react-imvc"

export type State = {
    todos: Todo[],
    isEditing: number | null
}

export interface Todo {
    id: number,
    text: string,
    done: boolean
}

export const initialState = {
    todos: [],
    isEditing: null
}

export const INITIAL_TODOS: Action<State, Todo[]> = (state, todos) => {
    return {
        ...state,
        todos
    }
}

export const INITIAL_EDITING: Action<State, number> = (state, isEditing) => {
    return {
        ...state,
        isEditing
    }
}

export const ADD_TODO: Action<State, Todo> = (state, todo) => {
    const newTodos = [todo, ...state.todos]

    return {
        ...state,
        todos: newTodos
    }
}

export const DELETE_TODO: Action<State, number> = (state, id) => {
    const newTodos = state.todos.filter(todo => {
        return todo.id !== id
    })

    return {
        ...state,
        todos: newTodos
    }
}

export const CHECK_TODO: Action<State, number> = (state, id) => {
    const newTodos = state.todos.map(todo => {
        return todo.id === id ? { ...todo, done: !todo.done } : todo
    })

    return {
        ...state,
        todos: newTodos
    }
}

export const CLEAR_DONE: Action<State> = (state) => {
    const newTodos = state.todos.filter(todo => {
        return !todo.done
    })

    return {
        ...state,
        todos: newTodos
    }
}

export const CHECK_ALL: Action<State> = (state) => {
    const newTodos = state.todos.map(todo => {
        return {
            ...todo,
            done: true
        }
    })

    return {
        ...state,
        todos: newTodos
    }
}

export const START_EDITING: Action<State, number> = (state, id) => {  
    return {
        ...state,
        isEditing: id
    }
}

export const END_EDITING: Action<State> = (state) => {
    return {
        ...state,
        isEditing: null
    }
}

export const UPDATE_TODO: Action<State, string> = (state, text) => {
    const newTodos = state.todos.map(todo => {
        return todo.id === state.isEditing ? { ...todo, text } : todo
    })

    return {
        ...state,
        todos: newTodos
    }
}