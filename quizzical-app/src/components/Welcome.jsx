export default function Welcome(props) {
    const { startQuiz } = props;
    return (
        <>
         <h1 className="title">Quizzical</h1>
         <h3 className="description">Take a random quiz today</h3>
         <button onClick={startQuiz} className="start-quiz">Start quiz</button>   
        </>
    )
}