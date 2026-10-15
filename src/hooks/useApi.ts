import { useCallback, useEffect, useState } from "react";
import { getErrorInfo, type ErrorInfo } from "../utils/api";

interface ApiState<T> {
  data: T | null;
  error: ErrorInfo | null;
  loading: boolean;
}

export const useApi = <T,>(
  fetcher: ((signal: AbortSignal) => Promise<T>) | null
): ApiState<T> & { retry: () => void } => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    loading: false,
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!fetcher) {
      setState({ data: null, error: null, loading: false });
      return;
    }

    const controller = new AbortController();
    setState((prev) => ({ ...prev, error: null, loading: true }));

    fetcher(controller.signal)
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({ data: null, error: getErrorInfo(error), loading: false });
      });

    return () => controller.abort();
  }, [fetcher, attempt]);

  const retry = useCallback(() => setAttempt((prev) => prev + 1), []);

  return { ...state, retry };
};
