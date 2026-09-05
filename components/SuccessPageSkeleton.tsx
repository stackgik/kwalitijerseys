const SuccessPageSkeleton = () => {
  return (
    <main className="min-h-screen bg-white text-neutral-950 px-4 py-24 flex items-center justify-center">
      <div className="max-w-xl w-full text-center space-y-12">
        <div className="relative mx-auto w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center animate-pulse">
          <div className="w-8 h-8 rounded-full bg-neutral-200" />
        </div>
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-neutral-300 animate-pulse">
            Validating Order Manifest...
          </p>
          <div className="h-8 w-48 bg-neutral-100 rounded-lg mx-auto animate-pulse" />
          <div className="h-4 w-64 bg-neutral-100 rounded-lg mx-auto animate-pulse" />
        </div>
      </div>
    </main>
  );
};

export default SuccessPageSkeleton;
