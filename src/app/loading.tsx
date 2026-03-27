export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-32 flex flex-col gap-12 w-full animate-pulse">
      <div className="space-y-4 max-w-2xl">
        <div className="h-4 w-32 bg-muted rounded-full"></div>
        <div className="h-12 md:h-20 w-3/4 bg-muted rounded-xl"></div>
        <div className="h-4 w-full max-w-xl bg-muted rounded-full mt-4"></div>
        <div className="h-4 w-2/3 max-w-xl bg-muted rounded-full"></div>
      </div>
      
      <div className="mt-8 space-y-4">
        <div className="h-8 w-48 bg-muted rounded-xl"></div>
        <div className="flex gap-4 overflow-hidden">
          <div className="h-64 w-[300px] bg-muted rounded-xl shrink-0"></div>
          <div className="h-64 w-[300px] bg-muted rounded-xl shrink-0"></div>
          <div className="h-64 w-[300px] bg-muted rounded-xl shrink-0 hidden md:block"></div>
        </div>
      </div>
    </div>
  );
}
