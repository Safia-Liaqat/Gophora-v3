// src/components/providers/ScoreIndicator.jsx
const ScoreIndicator = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreTextColor = (score) => {
    if (score >= 85) return 'text-green-700';
    if (score >= 40) return 'text-yellow-700';
    return 'text-red-700';
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${getScoreColor(score)}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <span className={`font-bold ${getScoreTextColor(score)}`}>{score}</span>
    </div>
  );
};

export default ScoreIndicator;