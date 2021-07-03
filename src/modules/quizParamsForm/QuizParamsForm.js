import React, {useState, useRef} from 'react';
import { Form, Button } from 'react-bootstrap';

function QuizForm({ quizCategories, onSubmit }) {
    const [userName, setUserName] = useState('')
    const amountRef = useRef('')
    const difficultyRef = useRef('')
    const typeRef = useRef('')
    const categoryRef = useRef('')

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation();
        const formObj = {
            name: userName,
            amount: amountRef.current.value,
            difficulty: difficultyRef.current.value,
            type: typeRef.current.value,
            category: categoryRef.current.value
        }
        onSubmit(formObj)
    }

    const handleNameInput = (e) => {
        setUserName(e.target.value)
    }

    return (
        <Form className="quiz-form" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" onChange={handleNameInput}/>
            </Form.Group>

            <Form.Group controlId="formBasicNoQuestions">
                <Form.Label>Number of Questions:</Form.Label>
                <Form.Control
                    as="select"
                    className="mr-sm-2"
                    custom
                    ref={amountRef}
                >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicDifficulty">
                <Form.Label>Select Difficulty:</Form.Label>
                <Form.Control
                    as="select"
                    className="mr-sm-2"
                    custom
                    ref={difficultyRef}
                >
                    <option value="">Any</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicType">
                <Form.Label>Select Type:</Form.Label>
                <Form.Control
                    as="select"
                    className="mr-sm-2"
                    custom
                    ref={typeRef}
                >
                    <option value="">Any</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True/False</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicCategories">
                <Form.Label>Select Category:</Form.Label>
                <Form.Control
                    as="select"
                    className="mr-sm-2"
                    custom
                    ref={categoryRef}
                >
                    <option value="">Any</option>
                    {quizCategories.map(cat => <option key={cat.name + cat.id} value={cat.name}>{cat.name}</option>)}
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={userName === ""}>
                Start Quiz
            </Button>
        </Form>
    )
}

export default QuizForm