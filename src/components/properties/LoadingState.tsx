
interface LoadingStateProps {
  error: string | null;
  onRetry: () => void;
}

const LoadingState = ({ error, onRetry }: LoadingStateProps) => {
  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={onRetry}
          className="gold-button px-6 py-2 rounded-md"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
    </div>
  );
};

export default LoadingState;
