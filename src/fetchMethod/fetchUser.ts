export async function fetchUser(username: string, signal: AbortSignal | null) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    signal,
  });

  if (!res.ok) {
    throw new Error("User not found");
  }

  return await res.json();
}
