const BestSellersSkeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col">
          <div className="aspect-3/4 bg-gray-100 rounded-2xl animate-pulse" />
          <div className="mt-4 h-3 w-2/3 bg-gray-100 rounded animate-pulse" />
          <div className="mt-2 h-3 w-1/3 bg-gray-100 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
};
export default BestSellersSkeleton;
