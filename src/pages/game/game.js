import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/store';
import { getQuestions, resetToken } from '../../services/api';
import { ButtonGroup, Button, Spinner } from 'react-bootstrap';
import './game.css'

function Game() {
    const [questionList, setQuestionsList] = useState([])
    const [qIndex, setqIndex] = useState(0)
    const { globalState, dispatch } = useContext(StoreContext)
    console.log("game", globalState)

    const getCategoryId = (categoryName) => {
        const quizCategories = globalState.categories
        const foundCategory = quizCategories.find(cat => cat.name === categoryName)
        if (foundCategory) return foundCategory.id
    }

    useEffect(() => {
        async function fetchQuizData() {
            const params = {}
            params.amount = globalState.quizParams.amount
            params.difficulty = globalState.quizParams.difficulty
            params.type = globalState.quizParams.type
            params.category = getCategoryId(globalState.quizParams.category)

            const res = await getQuestions(params)
            if (res.data.response_code === 0 && res.data?.results) setQuestionsList([...res.data.results])
            if (res.data.response_code === 4) {
                const resNewToken = await resetToken()
                if (resNewToken.data.response_code === 0) {
                    localStorage.setItem('token', resNewToken.data.token);
                    fetchQuizData();
                }
            }

        }
        fetchQuizData()
    }, [])

    const handleAnswer = (answer) => {
        if (qIndex === questionList.length - 1) return
        setqIndex(prevIndex => prevIndex + 1)
    }

    return (<div className="body-container mt-5">
        {questionList?.length > 0 ? <>
            <div className="quiz-card">
                <p>{`${qIndex + 1}. `}<span dangerouslySetInnerHTML={{ __html: questionList[qIndex].question }}></span></p>
                <div>
                    <ButtonGroup vertical>
                        {[questionList[qIndex].correct_answer, ...questionList[qIndex].incorrect_answers].map((ia, index) => (
                            <Button key={index + "-" + ia} className="m-2" variant="outline-primary" onClick={() => handleAnswer(ia)}>{ia}</Button>
                        ))}
                    </ButtonGroup>
                </div>
            </div>
            <div className="quiz-info"><p>Category: <span>{questionList[qIndex].category}</span></p><p>Difficulty: <span>{questionList[qIndex].difficulty}</span></p></div>
        </> :
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>}
    </div>)
}

export default Game;