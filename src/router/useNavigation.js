import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  const goPage = (page) => () => {
    navigate(page);
  };

  return {
    goRank: goPage("/"),
    goArtist: goPage("/artist"),
    goSearch: goPage("/search"),
  };
};

export default useNavigation;
