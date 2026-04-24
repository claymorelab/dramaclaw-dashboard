/**
 * 数据刷新 Hook — Mock 数据 + 定时刷新，预留真实 API
 */
import { useState, useEffect, useCallback } from 'react';

interface UseRefreshOptions<T> {
  /** 初始 Mock 数据 */
  initialData: T;
  /** 刷新间隔（毫秒），默认 3000 */
  interval?: number;
  /** 真实 API 获取函数，未实现时传 undefined */
  fetchFn?: () => Promise<T>;
  /** 数据变化回调 */
  onChange?: (data: T) => void;
}

export function useRefreshData<T>(options: UseRefreshOptions<T>) {
  const { initialData, interval = 3000, fetchFn, onChange } = options;
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (fetchFn) {
      setLoading(true);
      try {
        const newData = await fetchFn();
        setData(newData);
        onChange?.(newData);
      } finally {
        setLoading(false);
      }
    } else {
      // Mock 模式：生成随机变化数据
      const newData = typeof initialData === 'object' && initialData !== null
        ? { ...initialData } as unknown as T
        : initialData;
      setData(newData);
      onChange?.(newData);
    }
  }, [fetchFn, initialData, onChange]);

  useEffect(() => {
    const timer = setInterval(refresh, interval);
    return () => clearInterval(timer);
  }, [refresh, interval]);

  return { data, loading, refresh };
}
