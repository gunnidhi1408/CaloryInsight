const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      <p className="mt-3 text-gray-500 text-sm">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
