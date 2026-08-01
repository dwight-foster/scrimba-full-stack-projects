import clsx from 'clsx';

export default function Quiz(props) {
    const { submitAnswers, questions, isSubmitted, playAgain } = props

    const answeredCorrectly = questions.filter((question) => question.correctAnswer === question.usersAnswer).length;

    function getRadioElements(allAnswers,  name, usersAnswer, correctAnswer) {

        return allAnswers.map((answer, index ) => {
            const isCorrect = correctAnswer === answer;
            const answered = answer === usersAnswer;
            const className = clsx(isSubmitted && isCorrect && 'correct', isSubmitted && !isCorrect && answered && 'incorrect', '');
            return (
                    <div key={`${name}-${answer}-${index}`} className='answer-options'>
                        <input type='radio' id={answer} name={name} value={answer} disabled={!isCorrect && isSubmitted}/>
                        <label className={className} htmlFor={answer}>{answer}</label>
                    </div>
                    )
        })

    }
    const questionElements = questions.map((question) => {
        const radioElements = getRadioElements(question.allAnswers, question.question, question.usersAnswer, question.correctAnswer);
        return (
                <div key={question.question}>
                    <div className="question">
                        <h3>{question.question}</h3>
                        <div className="answer-options">
                            {radioElements}
                        </div>
                    </div>
                    <hr></hr>
                </div>
        )
    });

    return (
        <div>
            <form action={submitAnswers} className='quiz'>
                {questionElements}
                {!isSubmitted && <button type='submit'>Check Answers</button>}

            </form>
            {isSubmitted && 
            <div className='submitted-container'>
                <h3>You scored {answeredCorrectly}/5 correct answers</h3>
                <button onClick={playAgain}>Play again</button>
            </div>
            }
        </div>
    )
}