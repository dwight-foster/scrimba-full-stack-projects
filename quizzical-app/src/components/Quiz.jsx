import clsx from 'clsx';

export default function Quiz(props) {
    const { submitAnswers, questions, isSubmitted, playAgain } = props

    const answeredCorrectly = questions.filter((question) => question.correctAnswer === question.usersAnswer).length;

    function getRadioElements(allAnswers, name, usersAnswer, correctAnswer) {

        return allAnswers.map((answer, index) => {
            const isCorrect = correctAnswer === answer;
            const answered = answer === usersAnswer;
            const className = clsx(isSubmitted && isCorrect && 'correct', isSubmitted && !isCorrect && answered && 'incorrect', '');
            const id = `${name}-${index}`;
            return (
                <div key={id} className='answer-options'>
                    <input
                        type='radio'
                        id={id}
                        name={name}
                        value={answer}
                        disabled={!isCorrect && isSubmitted}
                        defaultChecked={usersAnswer === answer}
                    />
                    <label className={className} htmlFor={id}>{answer}</label>
                </div>
            )
        })

    }
    const questionElements = questions.map((question, qIndex) => {
        const groupName = `q-${qIndex}`;
        const labelId = `${groupName}-label`;
        const radioElements = getRadioElements(question.allAnswers, groupName, question.usersAnswer, question.correctAnswer);
        return (
            <div key={`q-${qIndex}`}>
                <div className="question">
                    <fieldset aria-labelledby={labelId}>
                        <legend id={labelId}><h3>{question.question}</h3></legend>
                        <div className="answer-options" role="radiogroup" aria-labelledby={labelId}>
                            {radioElements}
                        </div>
                    </fieldset>
                </div>
                <hr></hr>
            </div>
        )
    });

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.target); submitAnswers(fd); }} className='quiz' aria-label="Quiz form">
                {questionElements}
                {!isSubmitted && <button type='submit'>Check Answers</button>}

            </form>
            {isSubmitted && 
            <div className='submitted-container' role="status" aria-live="polite">
                <h3>You scored {answeredCorrectly}/5 correct answers</h3>
                <button onClick={playAgain} aria-label="Play again">Play again</button>
            </div>
            }
        </div>
    )
}