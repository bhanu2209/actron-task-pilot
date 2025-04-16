
import React from 'react';
import Plan, { PlanStatus } from '../Plan';
import FeedbackForm from '../FeedbackForm';
import AboutActron from './AboutActron';
import { Task } from '@/contexts/TasksContext';

interface PlanSectionProps {
  tasks: Task[];
  planStatus: PlanStatus;
  onApprove: () => void;
  onRetry: () => void;
  onFeedback: (success: boolean) => void;
  showFeedback: boolean;
  onFeedbackSubmit: (feedback: string) => void;
}

const PlanSection: React.FC<PlanSectionProps> = ({
  tasks,
  planStatus,
  onApprove,
  onRetry,
  onFeedback,
  showFeedback,
  onFeedbackSubmit
}) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <h2 className="text-xl font-bold text-terminal-text mb-2">Execution Plan</h2>
      
      <Plan 
        steps={tasks}
        status={planStatus}
        onApprove={onApprove}
        onRetry={onRetry}
        onFeedback={onFeedback}
      />
      
      {showFeedback && (
        <FeedbackForm onSubmit={onFeedbackSubmit} />
      )}
      
      <AboutActron />
    </div>
  );
};

export default PlanSection;
