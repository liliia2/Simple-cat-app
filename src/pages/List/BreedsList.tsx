import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Button, Modal, Pagination } from "antd";

import { Breed } from "../../models/breed";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { breeds } from "../../store/Breeds/breeds-slice";
import {
  fetchBreedsData,
  searchBreeds,
} from "../../store/Breeds/breeds-actions";
import { findBridById, searchResultText } from "../../utils/utils";
import BreedModalCard from "../../components/BreedInfoModal/BreedModalCard";
import BreedCard from "../../components/BreedCard/BreedCard";
import "./BreedsList.css";

export const BreedsList = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const breedsState = useAppSelector(breeds);
  const [openedBreed, setOpenedBreed] = useState(null as Breed | null);

  const currentPage = query.has("page") ? Number(query.get("page")) : 1;
  const limit = query.has("limit") ? Number(query.get("limit")) : 10;
  const searchText = query.has("search") ? query.get("search") : null;

  const onChange = (page: number, limit?: number) => {
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());
    history.push({ search: params.toString() });
  };

  useEffect(() => {
    if (searchText) {
      dispatch(searchBreeds({ text: searchText }));
    } else {
      dispatch(fetchBreedsData({ page: currentPage, limit }));
    }
  }, [currentPage, dispatch, searchText, limit]);

  if (breedsState.status === "failed") {
    return (
      <div className="failed">
        {`${breedsState.error?.length ? breedsState.error : "Oops..."}`}
      </div>
    );
  }

  if (breedsState.status === "loading") {
    return (
      <div className="loader">
        <img src="loading.png" alt="loading"></img>
      </div>
    );
  }

  return (
    <div>
      <div className="content-wrapper">
        {(searchText || breedsState.breeds?.length === 0) && (
          <p>
            <span className="accent">{`"${searchText}": `}</span>
            {`${searchResultText(breedsState.breeds?.length ?? 0)}`}
          </p>
        )}
        <div className="breeds">
          {breedsState.breeds?.map((breed: Breed) => (
            <BreedCard
              key={breed.id}
              breed={breed}
              showBreed={(id: string) => {
                if (breedsState.breeds)
                  setOpenedBreed(findBridById(id, breedsState.breeds));
              }}
            />
          ))}
        </div>
        {breedsState.count && (
          <Pagination
            current={currentPage}
            defaultPageSize={limit}
            onChange={onChange}
            total={Number(breedsState.count)}
          />
        )}
      </div>
      {!!openedBreed && (
        <Modal
          visible={!!openedBreed}
          title={!!openedBreed ? `${openedBreed.name} cat` : ""}
          maskClosable={true}
          onCancel={() => setOpenedBreed(null)}
          footer={[
            <Button key="back" onClick={() => setOpenedBreed(null)}>
              Cancel
            </Button>,
            <Button
              key="link"
              disabled={!openedBreed.wikipedia_url}
              onClick={() => window.open(openedBreed.wikipedia_url)}
              type="primary"
            >
              Search on Wiki
            </Button>,
          ]}
        >
          <BreedModalCard breed={openedBreed} />
        </Modal>
      )}
    </div>
  );
};
