import React from 'react'

const StoreContext = React.createContext();

const initialState = {
    name: '',
    categories: [],
    quizParams: {
        amount: "10",
        category: "",
        difficulty: "",
        name: "",
        type: ""
    }

}

const StoreProvider = props => {

    const [globalState, dispatch] = React.useReducer((state, action) => {
        console.log(state, action)
        switch (action.type) {
            case "SET_NAME":
                localStorage.setItem('name', action.name)
                return { ...state, name: action.name }
            case "SET_CATEGORIES":
                return { ...state, categories: action.categories }
            case "SET_QUIZ_PARAMS":
                return { ...state, quizParams: action.quizParams }
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

export { StoreContext, StoreProvider }