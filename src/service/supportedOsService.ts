export const getSupportedOs = async () => {
  let iterations = 0;

  while (iterations <= 3) {
    const res = await fetch(`/api/os`);

    if (res.ok) {
      return (await res.json()) as string[];
    }

    iterations++;
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  return [];
};
