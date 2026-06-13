export default function RootLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center" role="status" aria-live="polite">
      <div className="w-12 h-12 border-4 border-border rounded-full animate-spin border-t-brand"></div>
    </div>
  );
}
