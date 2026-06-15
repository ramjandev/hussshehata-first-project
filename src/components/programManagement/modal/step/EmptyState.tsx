const EmptyState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center">
    <p className="text-center text-gray-500">{message}</p>
  </div>
);

export default EmptyState;
