export default function Quiz() {
    return (
        <div>
            <form className='quiz'>
                <div className="question">
                    <h3>How would one say goodbye in Spanish?</h3>
                    <div className="answer-options">
                        <label htmlFor='Adios'>Adios</label>
                        <input type='radio' id='Adios' name='spanish' value="Adios" />

                        <label htmlFor='Hola'>Hola</label>
                        <input type='radio' id='Hola' name='spanish' value="Hola" />

                        <label htmlFor='AuRevoir'>Au Revoir</label>
                        <input type='radio' id='AuRevoir' name='spanish' value="Au Revoir" />

                        <label htmlFor='Selir'>Selir</label>
                        <input type='radio' id='Selir' name='spanish' value="Selir" />
                    </div>
                </div>
                <hr></hr>
                <button type='submit'>Check Answers</button>

            </form>
        </div>
    )
}