import { useState, useEffect, useCallback } from "react";

export const useChartData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    let retries = 0;
    const maxRetries = 2;

    while (retries <= maxRetries) {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/data/dashboardData.json");

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setLoading(false);
        return;
      } catch (err) {
        retries++;
        if (retries > maxRetries) {
          setError("Failed to load dashboard data. Please try again later.");
          setLoading(false);
          return;
        }

        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, retries) * 1000)
        );
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, fetchData };
};
