import React, { useContext, useEffect, useState, useRef } from 'react';
import { StoreContext } from '../../context/store';
import { getQuestions } from '../../services/api';
import { ButtonGroup, Button, Dropdown, Spinner } from 'react-bootstrap';
import CustomModal from '../../components/modal/modal';
import CountdownTimer from '../../components/countdownTimer/countdownTimer';
import { useHistory } from "react-router-dom";
import UI_TEXT from '../../constants';
import ErrorDisplay from '../../modules/error/error';
import './game.css'

function Game() {
    const [questionList, setQuestionsList] = useState([])
    const [qIndex, setqIndex] = useState(0)
    const [showSubmitModal, setShowSubmitModal] = useState(false)
    const [showResultsModal, setShowResultsModal] = useState(false)
    const [error, setError] = useState(null)

    const correctAnswers = useRef([])
    const answeredQuestions = useRef([])
    const timerId = useRef()

    const { globalState, dispatch } = useContext(StoreContext)
    const history = useHistory()

    const getCategoryId = (categoryName) => {
        const quizCategories = globalState.categories
        const foundCategory = quizCategories.find(cat => cat.name === categoryName)
        if (foundCategory) return foundCategory.id
    }

    async function fetchQuizData() {
        const params = {}
        params.amount = globalState.quizParams.amount
        params.difficulty = globalState.quizParams.difficulty
        params.type = globalState.quizParams.type
        params.category = getCategoryId(globalState.quizParams.category)

        const res = await getQuestions(params)
        console.log(res.data)
        if (res.data.response_code === 0 && res.data?.results) setQuestionsList([...res.data.results])
        else setError(res.data.response_code)
    }

    useEffect(() => {
        fetchQuizData()
    }, [])

    const handleSetIndex = (type, value) => {
        switch (type) {
            case 'prev':
                if (qIndex > 0) setqIndex(prev => prev - 1)
                break;
            case 'next':
                if (qIndex < questionList.length - 1) setqIndex(prev => prev + 1)
                break;
            case 'set':
                setqIndex(Number(value))
                break;
            default:
                break;
        }

    }

    const handleAnswer = (answer) => {
        questionList[qIndex].user_answer = {
            answer,
            correct: answer === questionList[qIndex].correct_answer
        }
        if (qIndex === questionList.length - 1) {
            return
        }
        setqIndex(prevIndex => prevIndex + 1)
    }

    const handleSubmit = () => {
        answeredQuestions.current = questionList.filter(qObj => qObj.user_answer)
        correctAnswers.current = answeredQuestions.current.filter(qObj => qObj.user_answer.correct)
        const name = localStorage.getItem('name') || 'quest'
        const score = JSON.parse(localStorage.getItem('score')) || {}
        score[name] = correctAnswers.current.length
        localStorage.setItem('score', JSON.stringify({ ...score }))
        setShowSubmitModal(true)

    }

    const handleModalEvent = (eventType) => {
        console.log(eventType)
        setShowSubmitModal(false)
        if (eventType === 'yes') {
            setShowResultsModal(true)

        }
    }

    const getHighScore = () => {
        const score = JSON.parse(localStorage.getItem('score'))
        if (!score) return null
        const highScore = Object.values(score).reduce(function (a, b) {
            return Math.max(a, b);
        });
        const boardLeaders = Object.entries(score).filter(entry => entry[1] === highScore)
        const boardLeadersObj = Object.fromEntries(boardLeaders)
        return <div>{`High score is ${highScore} achieved by ${Object.keys(boardLeadersObj).join(',')}`}</div>

    }

    const onCloseResultModal = () => {
        setShowResultsModal(prevState => {
            if(prevState)history.push('/')
            return false
        })
    }

    return (<div className="body-container mt-5">
        {questionList?.length > 0 ? <>
            <div className="high-score-message">
                {!showResultsModal && <CountdownTimer deadline={new Date(new Date().getTime() + 15 * 60000)} onFinish={() => handleModalEvent('yes')} />}
                {getHighScore()}
            </div>
            <div className="quiz-card">
                <p>{`${qIndex + 1}. `}<span dangerouslySetInnerHTML={{ __html: questionList[qIndex].question }}></span></p>
                <div className="answer-options-container">
                    <ButtonGroup vertical>
                        {[questionList[qIndex].correct_answer, ...questionList[qIndex].incorrect_answers].map((ia, index) => (
                            <Button key={index + "-" + ia} className="m-2" variant="outline-primary" onClick={() => handleAnswer(ia)} dangerouslySetInnerHTML={{ __html: ia }}></Button>
                        ))}
                    </ButtonGroup>
                </div>
                <div className="mt-3">
                    <ButtonGroup className="align-items-center">
                        <Button className="m-2" variant="dark" onClick={() => handleSetIndex('prev', null)} disabled={qIndex === 0}>Prev</Button>
                        <Dropdown onSelect={(value) => handleSetIndex('set', value)}>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                {qIndex + 1}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {questionList.map((q, index) => <Dropdown.Item key={q + index} eventKey={index}>{Number(index) + 1}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button className="m-2" variant="dark" onClick={() => handleSetIndex('next', null)} disabled={qIndex === questionList.length - 1}>Next</Button>
                    </ButtonGroup>
                </div>
                <div className="submit-container">
                    {qIndex === questionList.length - 1 && <Button className="m-2" variant="success" onClick={handleSubmit}>Submit</Button>}
                </div>
            </div>
            <div className="quiz-info"><p>Category: <span>{questionList[qIndex].category}</span></p><p>Difficulty: <span>{questionList[qIndex].difficulty}</span></p></div>
        </> :
            error ? <ErrorDisplay className="error-display-message" errorMsg={UI_TEXT.openApiErrors[error]}/> :
             <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>}
        <CustomModal show={showSubmitModal}
            title="Do you want to submit your answers?"
            onHide={() => setShowSubmitModal(false)}
            handleCancelButton={() => handleModalEvent('cancel')}
            handleYesButton={() => handleModalEvent('yes')}>
            {`You answered to ${answeredQuestions.current?.length} questions out of ${questionList.length}`}
        </CustomModal>
        <CustomModal show={showResultsModal}
            title="Your score is:"
            showFooter={false}
            onHide={onCloseResultModal}
        >
            <p>{`You answered to ${answeredQuestions.current?.length} questions out of ${questionList.length}.`}</p>
            <p>{`You answered correctly to ${correctAnswers.current?.length} questions.`}</p>
            <p>{`Your score is ${correctAnswers.current?.length}`}</p>
        </CustomModal>
    </div>)
}

export default Game;