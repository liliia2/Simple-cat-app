import { Button } from "antd";
import { Breed } from "../../models/breed";

import "./BreedCard.css";

type Props = {
  breed: Breed;
  showBreed: (id: string) => void;
};

const BreedCard = ({ breed, showBreed }: Props) => {
  return (
    <div className="breed-card">
      <div>
        <div className="img-block">
          <img
            className="breed-img"
            src={breed.image?.url ?? "cat-icon.png"}
            alt={breed.name}
          />
        </div>
        <p className="breed-name">{breed.name}</p>
        <p className="description">{breed.description}</p>
      </div>
      <Button
        onClick={() => {
          showBreed(breed.id);
        }}
      >
        Show more
      </Button>
    </div>
  );
};

export default BreedCard;
