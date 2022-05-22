import { useCallback, useEffect, useState } from "react";

const useGiphy = (keywords: string) => {
  const [gifUrl, setGifUrl] = useState();

  const fetchGifByKeywords = useCallback(async () => {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${
        import.meta.env.VITE_GIPHY_API_KEY
      }&q=${keywords.split(" ")}&limit={1}`
    );
    const { data } = await response.json();

    setGifUrl(data[0]?.images?.downsized_medium.url);
  }, [keywords]);

  const fetchTrendingGif = useCallback(async () => {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${
        import.meta.env.VITE_GIPHY_API_KEY
      }&limit={1}`
    );
    const { data } = await response.json();

    setGifUrl(data[0]?.images?.downsized_medium.url);
  }, []);

  const fetchGif = useCallback(async () => {
    try {
      await fetchGifByKeywords();
    } catch (e) {
      fetchTrendingGif();
    }
  }, [fetchGifByKeywords, fetchTrendingGif]);

  useEffect(() => {
    fetchGif();
  }, [fetchGif]);

  return gifUrl;
};

export default useGiphy;
