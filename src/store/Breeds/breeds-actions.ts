import qs from "qs";
import { breedsActions } from "./breeds-slice";

type fetchBreedsProps = {
  page: number;
  limit: number;
};

type searchBreedsProps = {
  text: string;
};

export const fetchBreedsData = ({ page, limit }: fetchBreedsProps) => {
  const params = {
    limit: limit,
    page: page - 1,
  };

  return async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    const fetchData = async () => {
      dispatch(breedsActions.setBreeds({ status: "loading" }));

      const response = await fetch(
        `https://api.thecatapi.com/v1/breeds?${qs.stringify(params, {
          arrayFormat: "repeat",
        })}`
      );

      if (!response.ok) {
        throw new Error("error");
      }

      const breeds = await response.json();
      const count = response.headers.get("pagination-count");
      return { breeds, count };
    };

    try {
      const { breeds, count } = await fetchData();
      dispatch(
        breedsActions.setBreeds({
          breeds,
          count,
          status: "succeeded",
        })
      );
    } catch (error) {
      dispatch(
        breedsActions.setBreeds({
          error: error.message,
          status: "failed",
        })
      );
    }
  };
};

export const searchBreeds = ({ text }: searchBreedsProps) => {
  const params = {
    q: text,
  };

  return async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    const fetchData = async () => {
      dispatch(breedsActions.setBreeds({ status: "loading" }));

      const response = await fetch(
        `https://api.thecatapi.com/v1/breeds/search?${qs.stringify(params, {
          arrayFormat: "repeat",
        })}`
      );

      if (!response.ok) {
        throw new Error("error");
      }

      const breeds = await response.json();
      return breeds;
    };

    try {
      const breeds = await fetchData();
      dispatch(
        breedsActions.setBreeds({
          breeds,
          count: null,
          status: "succeeded",
        })
      );
    } catch (error) {
      dispatch(
        breedsActions.setBreeds({
          error: error.message,
          status: "failed",
        })
      );
    }
  };
};
