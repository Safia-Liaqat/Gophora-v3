// src/components/providers/VerificationBadge.jsx
import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

const VerificationBadge = ({ status, level }) => {
  const statusConfig = {
    verified: { 
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: <CheckCircleIcon className="h-4 w-4" />,
      text: 'Verified'
    },
    pending_review: { 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: <ClockIcon className="h-4 w-4" />,
      text: 'Pending Review'
    },
    denied: { 
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: <XCircleIcon className="h-4 w-4" />,
      text: 'Denied'
    },
    unverified: { 
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: <QuestionMarkCircleIcon className="h-4 w-4" />,
      text: 'Unverified'
    }
  };

  const { color, icon, text } = statusConfig[status] || statusConfig.unverified;

  return (
    <div className="flex flex-col gap-1">
      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${color} flex items-center gap-1`}>
        {icon}
        <span>{text}</span>
      </div>
      {level && (
        <span className="text-xs text-gray-600 px-1">{level}</span>
      )}
    </div>
  );
};

export default VerificationBadge;