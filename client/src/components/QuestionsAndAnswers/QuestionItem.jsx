/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import AnswerModal from './AnswerModal.jsx';

function QuestionItem(props) {
  const {
    question,
    qid,
    helpful,
    product,
    show,
    answer,
    answerChange,
    nickname,
    nicknameChange,
    email,
    emailChange,
    close,
  } = props;

  return (
    <div className="kris-QuestionItem">
      <h3>
        Q:
        {question.padStart(question.length + 1, ' ')}
      </h3>
      <button className="kris-questionHelpful" type="button" onClick={() => (axios.get(`/qanda/question/helpful/${qid}`))}>{`Helpful?(${helpful})`}</button>
      <button className="kris-questionReported" type="button" onClick={() => (axios.get(`/qanda/question/reported/${qid}`))}>Report</button>
      <button
        className="kris-answerSubmitted"
        type="button"
        onClick={close}
      >
        add an answer
      </button>
      <AnswerModal
        show={show}
        product={product}
        question={question}
        answer={answer}
        answerChange={answerChange}
        nickname={nickname}
        nicknameChange={nicknameChange}
        email={email}
        emailChange={emailChange}
        id={qid}
        close={close}
        submit={() => { console.log(`A: ${answer}\nN: ${nickname}\nE: ${email}`); }}
      />
    </div>
  );
}

QuestionItem.propTypes = {
  question: PropTypes.string.isRequired,
  qid: PropTypes.number.isRequired,
  helpful: PropTypes.number.isRequired,
  product: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  answer: PropTypes.string.isRequired,
  answerChange: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  nicknameChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  emailChange: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

// close={() => { this.handleClick('isAnswering', !isAnswering); }}
// id={key}

export default QuestionItem;
