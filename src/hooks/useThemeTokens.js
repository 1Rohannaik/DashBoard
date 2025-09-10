import { useState, useEffect, useCallback } from "react";

export const useThemeTokens = () => {
  const [tokens, setTokens] = useState({});

  const getTokens = useCallback(() => {
    const root = document.documentElement;
    const computed = getComputedStyle(root);

    return {
      bg: computed.getPropertyValue("--bg").trim(),
      text: computed.getPropertyValue("--text").trim(),
      muted: computed.getPropertyValue("--text-muted").trim(),
      border: computed.getPropertyValue("--border").trim(),
      green: computed.getPropertyValue("--green").trim(),
      accent: computed.getPropertyValue("--accent").trim(),
    };
  }, []);

  useEffect(() => {
    setTokens(getTokens());

    const observer = new MutationObserver(() => {
      setTokens(getTokens());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [getTokens]);

  return tokens;
};
