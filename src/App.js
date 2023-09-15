import { useEffect, useRef, useState } from 'react';
import {questions} from './components/quiz';
import './App.css';

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [finishedTest, setFinishedTest] = useState(false);
  const score = useRef(0);


  const handleClick = (val) => {
    
    if(currentQuestion <= questions.length -1 ) {
      // console.log(currentQuestion);

      if(val.value === true) {
        score.current = score.current + 1;
        // console.log(score);
      }
      

      if(currentQuestion === questions.length - 1) {
        setFinishedTest(!finishedTest);
      }
      
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  return (
    <div className='app'>
      {
        (finishedTest === false) ? (
          <>
          <div className='question'>
            {questions[currentQuestion].question}
          </div>
          <div className='answers'>
            {
              questions[currentQuestion].answers.map((answer) => {
              return (
                <button onClick={() =>handleClick(answer)} key={crypto.randomUUID()}>
                  {answer.answer}
                </button>
              )
              })
            }
          </div>
          </>
        ) :

        (
          <>
            <p>Test Finished</p>
            <p>Your score is {score.current} out of {questions.length}</p>
          </>
        )
      }
    </div>
  )
}