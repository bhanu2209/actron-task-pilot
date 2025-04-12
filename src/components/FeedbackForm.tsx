
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface FeedbackFormProps {
  onSubmit: (feedback: string) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim()) {
      onSubmit(feedback);
      setFeedback('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 border border-gray-700 p-4 rounded-lg">
      <h3 className="font-bold text-white">Provide Feedback</h3>
      <p className="text-sm text-gray-400">
        Please describe what went wrong so Actron can improve its plan.
      </p>
      <Textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Describe the issue you encountered..."
        className="min-h-[100px] bg-gray-800 border-gray-700 text-white"
      />
      <Button 
        type="submit" 
        disabled={!feedback.trim()}
        className="w-full bg-terminal-cyan hover:bg-terminal-cyan/90 text-black"
      >
        Submit Feedback
      </Button>
    </form>
  );
};

export default FeedbackForm;
