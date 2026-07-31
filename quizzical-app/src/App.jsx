import { useState, useEffect, useTransition } from 'react';
import Welcome from "./components/Welcome"
import Quiz from './components/Quiz'
import he from 'he';

export default function App() {
    const [ questions, setQuestions ] = useState(null);
    const [ isQuiz, setIsQuiz ] = useState(false);
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    useEffect(() =>  {
        if (!isSubmitted) {
            fetch('https://opentdb.com/api.php?amount=5')
                .then(res => res.json()) 
                .then(data => {
                    const results = data.results;
                    setQuestions(() => results.map((res) => {
                        return {
                            question: he.decode(res.question, {
                                        'isAttributeValue': true }),
                            wrongAnswers: res['incorrect_answers'],
                            correctAnswer: res['correct_answer'],
                            answeredCorrectly: false
                        }
                    }));
                })
        }
            

    }, [isSubmitted])
    
    const questionElements = questions.map((question) => {
        
    })

    return (
        <main>
            <div className="blob blob-yellow"></div>
            <div className="blob blob-blue"></div>
            <section>
                <Quiz />
            </section>
        </main>
    )
}


/*
    Scaffolding:
    Home page has title, description and button
    Button will be used to start the quiz
    Button Functionality: When clicked button will run a function
    that changes a state boolean variable to true. This will conditionally render
    the quiz screen instead of home page.

    Quiz screen: Each question will be displayed with the answers. The submit 
    answers button will be at the bottom. 
    Obtaining quiz questions: use the useeffect function to get it on the first go.
    The dependency should be the isSubmitted but the function should only run 
    if isSubmitted is false not when it is true. 

    Data format should be: 
    [{question: string, wrongAnswers: list[string], rightAnswer: string, answeredCorrectly: boolean}]
    The answered correctly will not be used until the form is submitted. 
    When the user clicks the submit button compare the answers with the right 
    answer and change answeredcorrectly accordingly. Once the submit button is clicked
    anther state isSubmitted with a boolean value should be set to true. 

    Quiz screen post submit: 
    Submit button should disappear. It should be replaced by the persons score
    and a play again button. 
    Each from item should have the correct answer highlighted in green
    and if the person answered incorrectly it should be highlighted in red for their
    answer. These should be conditionally rendered. If the person clicks play again
    the questions state should be changed and the issubmitted state should be returned 
    to false. 
    

*/