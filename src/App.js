import {useRef, useState } from 'react';
import {questions} from './components/quiz';
import './App.css';

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [finishedTest, setFinishedTest] = useState(false);
  const score = useRef(0);
  const [answersArray, setAnswersArray] = useState([]);


  const handleClick = (val) => {
    setAnswersArray((array) => {
      return [
        ...array,
        val.answer
      ]
    })
    
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

  //create an array that contains all correct answers
  let array = [];
  let correctArray = [];
  for(let i=0 ;i<questions.length; i++) {
    array.push(questions[i].answers);
    for(let k=0;k<questions[i].answers.length;k++) {
      if(questions[i].answers[k].value === true) {
        correctArray.push(questions[i].answers[k].answer)
      }
    }
  }
  // console.log(ans1);


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
            <div className='answers-display'>
              <ul className='all-answers'>
                <p>Your answers</p>
                {
                  answersArray.map((answer) => {
                    return (
                      <div style={{background: correctArray.indexOf(answer) !== -1 ? '#29bf12' : '#ff3c38' }}>
                        {answer}
                      </div>
                    )
                  })
                }
              </ul>
              <ul className='correct-answers'>
                <p>Correct answers</p>
                {
                  correctArray.map((answer) => {
                    return (
                      <div style={{background:'#29bf12'}}>
                        {answer}
                      </div>
                    )
                  })
                }
              </ul>
            </div>
          </>
        )
      }
    </div>
  )
}