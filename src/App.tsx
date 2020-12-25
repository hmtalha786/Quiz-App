import React, { useState } from 'react';
import QuestionCard from './Components/QuestionCard';
import { fetchQuestions, QuestionState } from './Api'
import { GlobalStyle, Wrapper } from './App.styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [diff, setDiff] = useState("");
  const [total_Questions, setTotal_Questions] = useState(10);
  const [type, setType] = React.useState("multiple");

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(total_Questions, diff, type);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1)
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    (nextQuestion === total_Questions) ? setGameOver(true) : setNumber(nextQuestion);
  }


  const DifficultyHandler = (event: any) => { setDiff(event.target.value); }
  const QusestionHandler = (event: any) => { setTotal_Questions(event.target.value); }
  const TypeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType((event.target as HTMLInputElement).value);
  };
  const classes = useStyles();

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {gameOver || userAnswer.length === total_Questions ? (
          <div>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Questions</InputLabel>
                <NativeSelect value={total_Questions} defaultValue="" onChange={QusestionHandler}>
                  <option style={{ cursor: "pointer" }} value={10}>10</option>
                  <option style={{ cursor: "pointer" }} value={20}>20</option>
                  <option style={{ cursor: "pointer" }} value={30}>30</option>
                  <option style={{ cursor: "pointer" }} value={40}>40</option>
                  <option style={{ cursor: "pointer" }} value={50}>50</option>
                </NativeSelect>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Difficulty</InputLabel>
                <NativeSelect value={diff} defaultValue="" onChange={DifficultyHandler}>
                  <option style={{ cursor: "pointer" }} value="easy">Easy</option>
                  <option style={{ cursor: "pointer" }} value="medium">Medium</option>
                  <option style={{ cursor: "pointer" }} value="hard">Hard</option>
                </NativeSelect>
              </FormControl>
            </div>
            <br />
            <div>
              <FormControl component="fieldset">
                <RadioGroup row aria-label="type" name="type" value={type} onChange={TypeHandler}>
                  <FormControlLabel value="multiple" control={<Radio />} label="Multiple Choice" />
                  <FormControlLabel value="boolean" control={<Radio />} label="True & False" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="btn"><button className="start" onClick={startTrivia}>Start</button></div>
          </div>
        ) : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading && <p>Loading Questions...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={total_Questions}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
            callback={checkAnswer}
          />)}
        {!gameOver && !loading && userAnswer.length === number + 1 && number !== total_Questions - 1 ?
          <button className="next" onClick={nextQuestion}>Next Question</button> : null}
      </Wrapper>
    </>
  );
}

export default App;