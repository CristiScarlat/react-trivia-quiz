import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import UI_TEXT from '../../constants';
import './home.css'
import { StoreContext } from '../../context/store';
import QuizForm from '../../modules/quizParamsForm/QuizParamsForm';

function Home() {

    const { globalState, dispatch } = useContext(StoreContext)
    const history = useHistory()

    const handleStartQuiz = (quizParams) => {
        dispatch({ type: 'SET_NAME', name: quizParams.name })
        dispatch({ type: 'SET_QUIZ_PARAMS', quizParams})
        history.push('/quiz')
    }

    return (
        <div className="body-container">
            <div className="welcome-message m-4">{UI_TEXT.welcomeMessage}</div>
            <QuizForm quizCategories={globalState.categories} onSubmit={handleStartQuiz}/>
        </div>
    )
}

export default Home;