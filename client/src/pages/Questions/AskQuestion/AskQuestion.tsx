import { useEffect, useState } from 'react';

import GuidelineCard from '../../../components/Accordian/Accordian';
import { useModal } from '../../../components/Modal';
import MoreHelpfulCard from './QuestionForm/Cards/MoreHelpfulCard';
import NonProgCard from './QuestionForm/Cards/NonProgCard';
import Step1Card from './QuestionForm/Cards/Step1Card';
import Step2Card from './QuestionForm/Cards/Step2Card';
import HelpModal from './QuestionForm/HelpModal';
import QuestionForm from './QuestionForm/QuestionForm';
import {
  SBox,
  SCardBox,
  SQuestionBox,
  SRobotSVG,
  STitleBox,
  STitleH1,
} from './style';

const helpCards = [
  {
    title: 'Step 1: Draft your question',
    children: <Step1Card />,
    isCollapsable: false,
  },
  {
    title: 'Have a non-programming question?',
    children: <NonProgCard />,
    isCollapsable: true,
  },
  {
    title: 'More helpful links',
    children: <MoreHelpfulCard />,
    isCollapsable: true,
  },
];

const AskQuestion = () => {
  const [errs, setErrs] = useState({ status: 'unknown', counts: 0 });
  const { openModal, closeModal } = useModal();
  const step2Card = [
    {
      title: 'Step 2: Review your question',
      children: <Step2Card errCount={errs.counts} />,
      isCollapsable: false,
    },
  ];

  useEffect(() => {
    openModal(<HelpModal />);

    return () => closeModal();
  }, [openModal, closeModal]);

  return (
    <SQuestionBox>
      <STitleBox>
        <STitleH1>Ask a public question</STitleH1>
        <SRobotSVG viewBox="0 0 580 126" />
      </STitleBox>

      <SBox>
        <QuestionForm setErrs={setErrs} />
        <SCardBox>
          {(errs.status === 'ongoing' ? step2Card : helpCards).map((e) => (
            <GuidelineCard
              title={e.title}
              isCollapsable={e.isCollapsable}
              key={e.title}
            >
              {e.children}
            </GuidelineCard>
          ))}
        </SCardBox>
      </SBox>
    </SQuestionBox>
  );
};

export default AskQuestion;
