const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center py-3 mt-10">
      <p className="text-green-500 text-3xl">Processing...</p>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700 mt-10 mb-10" />
    </div>
  );
};

export default Loader;
