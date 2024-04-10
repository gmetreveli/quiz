import { useEffect, useState } from "react";

export default function Trivia({ data, setStop, qNum, setQNum }) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");

  useEffect(() => {
    setQuestion(data[qNum - 1]);
  }, [data, qNum]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(a.correct ? "answer correct" : "answer wrong")
    );
    delay(7000, () => {
      if (a.correct) {
        setQNum((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setStop(true);
      }
    });
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div
            className={selectedAnswer === a ? className : "answer"}
            onClick={() => handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}
