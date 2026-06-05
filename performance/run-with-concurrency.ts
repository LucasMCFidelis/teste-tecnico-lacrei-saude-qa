export async function runWithConcurrency<T>(
  total: number,
  concurrency: number,
  task: (id: number) => Promise<T>,
): Promise<T[]> {
  const results: T[] = [];
  let current = 0;

  async function worker() {
    while (current < total) {
      const id = ++current;

      try {
        const result = await task(id);
        results.push(result);
      } catch (error) {
        console.error(`Erro na execução ${id}`, error);
      }
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, total) },
    () => worker(),
  );

  await Promise.all(workers);

  return results;
}