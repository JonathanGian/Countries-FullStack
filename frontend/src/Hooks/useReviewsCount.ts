import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

const useReviewsCounts = () => {
  const [reviewsCounts, setReviewsCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchReviewsCount = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("country_code");
      if (error) {
        console.error("Error fetching reviews:", error);
        return;
      }
      const counts: { [key: string]: number } = {};
      data.forEach((review: { country_code: string }) => {
        const code = review.country_code;
        counts[code] = (counts[code] || 0) + 1;
      });
      setReviewsCounts(counts);
    };

    fetchReviewsCount();
  }, []);

  return reviewsCounts;
};

export default useReviewsCounts;