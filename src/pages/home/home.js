import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import UI_TEXT from '../../constants';
import { resetToken } from '../../services/api'
import { StoreContext } from '../../context/store';
import QuizForm from '../../modules/quizParamsForm/QuizParamsForm';
import './home.css';

function Home() {

    const { globalState, dispatch } = useContext(StoreContext)
    const history = useHistory()

    useEffect(() => {
        dispatch({type: 'SET_NAME', name: ''})
        async function getNewToken() {
            const resNewToken = await resetToken()
            if (resNewToken.data.response_code === 0) {
                localStorage.setItem('token', resNewToken.data.token);
            }
        }
        getNewToken()
    }, [])

    const handleStartQuiz = (quizParams) => {
        dispatch({ type: 'SET_NAME', name: quizParams.name })
        dispatch({ type: 'SET_QUIZ_PARAMS', quizParams})
        history.push('/quiz')
    }

    console.log("home", globalState.name)

    return (
        <div className="body-container">
            <div className="welcome-message m-4">{UI_TEXT.welcomeMessage}</div>
            <QuizForm quizCategories={globalState.categories} onSubmit={handleStartQuiz}/>
        </div>
    )
}

export default Home;