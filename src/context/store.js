import React from 'react'

const StoreContext = React.createContext();

const initialState = {
    name: '',
    modal: {
        show: false,
        title: "",
        body: ""
    }
}

const StoreProvider = props => {

    const [globalState, dispatch] = React.useReducer((state, action) => {
        console.log(state, action)
        const { payload } = action;
        switch (action.type) {
            case "SET_NAME":
                console.log('context', action)
                localStorage.setItem('name', action.name)
                return {...state, name: action.name}
            case "HANDLE_MODAL":
                console.log('context', action)
                return {...state, modal: action.modal}
            default:
                return state;
        }
    }, initialState)

    return (
        <StoreContext.Provider value={{ globalState, dispatch }}>
            {props.children}
        </StoreContext.Provider>
    );
};

export {StoreContext, StoreProvider}