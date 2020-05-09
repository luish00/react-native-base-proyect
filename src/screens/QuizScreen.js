import React from 'react';
import { ContainerView, CardView } from '../componets/common';

import { QuizForm } from '../componets/quiz/QuizForm';

class QuizScreen extends React.PureComponent {
  render() {
    return (
      <ContainerView>
        <CardView>
          <QuizForm />
        </CardView>
      </ContainerView>
    );
  }
}

export default QuizScreen;
