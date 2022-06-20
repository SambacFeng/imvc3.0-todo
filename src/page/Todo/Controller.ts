import Controller from 'react-imvc/controller'

import * as Model from './Model'
import View from './View'

// 除了initialState之外的Model中的Action加入Actions
export type Actions = Omit<typeof Model, 'initialState'>

export default class Todo extends Controller<Model.State, Actions> {
    View = View
    Model = Model

    componentDidFirstMount() {
        const localData = localStorage.getItem('react-imvc-todo')
        const todos = (localData && JSON.parse(localData)) || []
        this.store.actions.INITIAL_TODOS(todos)

        const params = this.location.hash.slice(2).split('&').map(param => {
            return {...param.split('=')}
        })
        
        this.store.subscribe((data) => {
            localStorage.setItem('react-imvc-todo', JSON.stringify(data.currentState.todos))
        })
        
        console.log(params);
        // this.store.actions.INITIAL_EDITING(+hash)
    }
}