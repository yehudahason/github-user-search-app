export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center font-mono text-xl dark:bg-neutral-800 dark:text-white"
    >
      <span className="sr-only">Loading user data...</span>
      <h1 aria-hidden="true">Loading...</h1>
    </div>
  );
}
