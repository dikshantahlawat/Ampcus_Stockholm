const ScoreRing = ({ score }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#1f2937"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#00E5FF"
          strokeWidth="10"
          fill="none"
          strokeDasharray={`${progress} ${circumference}`}
          transform="rotate(-90 60 60)"
        />
      </svg>

      <h2 className="text-xl font-bold mt-2">{score}</h2>
      <p className="text-gray-400 text-sm">Health Score</p>
    </div>
  );
};

export default ScoreRing;
