type Props = {
  error: Error;
};
export default function ErrorMsg({ error }: Props) {
  return (
    <div className="rounded-[20px] bg-white px-6 py-12 text-center shadow-[0_15px_30px_rgba(70,96,160,0.15)] dark:bg-neutral-900 sm:px-8 sm:py-16">
      <h2 className="text-2xl font-bold text-neutral-700 dark:text-white">
        {error.message}
      </h2>
      <p className="mx-auto mt-5 max-w-[700px] text-neutral-500 dark:text-neutral-300">
        {error.message === "User not found"
          ? "We couldn't find any GitHub users matching your search. Please double-check the username and try again."
          : "Something went wrong"}
      </p>
    </div>
  );
}
