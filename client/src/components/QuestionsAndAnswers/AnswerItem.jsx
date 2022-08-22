import React from 'react';
import PropTypes from 'prop-types';

const example = {
  5986889: {
    id: 5986889,
    body: 'test',
    date: '2022-07-21T00:00:00.000Z',
    answerer_name: 'david',
    helpfulness: 0,
    photos: [],
  },
  5987205: {
    id: 5987205,
    body: 'good stuff',
    date: '2022-07-24T00:00:00.000Z',
    answerer_name: 'miras',
    helpfulness: 0,
    photos: [],
  },
};

function AnswerItem(props) {
  const { answers, expanded } = props;
  return (
    <div className="kris-AnswerItem">
      {
        Object.keys(answers).map((key, index) => {
          const answer = answers[key];
          if (!expanded && index >= 2) {
            return null;
          }
          return (
            <>
              <p className="kris-AnswerBody">
                {`A:${answer.body.padStart(answer.body.length + 1, ' ')}\n`}
              </p>
              <p className="kris-AnswerAuth">
                {`\nby: ${answer.answerer_name}`}
              </p>
              <p className="kris-AnswerDate">
                {`\n ${answer.date.slice(0, 10)}`}
              </p>
              <a className="kris-answerHelpful" href="www.google.com">Helpful?</a>
              <a className="kris-answerReported" href="www.google.com">Report</a>
            </>
          );
        })
      }
    </div>
  );
}

AnswerItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  answers: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,
};

export default AnswerItem;
