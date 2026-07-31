import clsx from 'clsx';

export default function Quiz(props) {
    const { submitAnswers, questions, isSubmitted } = props

    function getRadioElements(allAnswers,  name) {

        return allAnswers.map((answer, index) => (
            <div key={`${name}-${answer}-${index}`} className='answer-options'>
                <input type='radio' id={answer} name={name} value={answer} disabled={isSubmitted}/>
                 <label htmlFor={answer}>{answer}</label>
            </div>
        ))

    }
    
    const questionElements = questions.map((question) => {
        const isCorrect = question.correctAnswer === question.usersAnswer;
        const className = clsx(isSubmitted && isCorrect && 'correct', isSubmitted && !isCorrect && 'incorrect', '');
        const radioElements = getRadioElements(question.allAnswers, question.question);
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
                <button type='submit'>Check Answers</button>

            </form>
        </div>
    )
}