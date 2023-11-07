import Spinner from './spinner';

const Loading = () => {
  return (
    <div className="u-p-3 u-w-full u-h-full u-text-yellow-400 u-text-xl u-text-center u-flex u-justify-center u-items-center">
      <Spinner className="u-mr-2" />
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
