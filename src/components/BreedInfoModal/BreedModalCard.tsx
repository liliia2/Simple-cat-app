import { Breed } from "../../models/breed";
import "./BreedModalCard.css";

type ParamProps = {
  long?: boolean;
  text?: string;
  title: string;
  value: string | number;
};

const Param = ({ long, text, title, value }: ParamProps): JSX.Element => (
  <div className={`param ${long ? "long" : ""}`}>
    <span className="accent-text">{title}:</span>
    <div className="sec-column">
      <span className="regular-text">{value}</span>
      {text && <span className="regular-text">{text}</span>}
    </div>
  </div>
);

type Props = {
  breed: Breed;
};

const BreedModalCard = ({ breed }: Props) => {
  return (
    <div className="breed-modal-info">
      <div>
        <div className="img-block">
          <img
            className="breed-img"
            src={breed.image?.url ?? "cat-icon.png"}
            alt={breed.name}
          />
        </div>
        <div className="all-params">
          <div>
            <Param title="Origin" value={breed.origin ?? "-"} />
            <Param
              title="Weight"
              value={breed.weight?.metric ? `${breed.weight.metric} kgs` : "-"}
            />
            <Param title="Average life span" value={breed.life_span ?? "-"} />
            <Param
              title="Adaptability"
              value={breed.adaptability ? `${breed.adaptability}/5` : "-"}
            />
            <Param
              title="Grooming"
              value={breed.grooming ? `${breed.grooming}/5` : "-"}
            />
            <Param
              title="Intelligence"
              value={breed.intelligence ? `${breed.intelligence}/5` : "-"}
            />
            <Param
              title="Child friendly"
              value={breed.child_friendly ? `${breed.child_friendly}/5` : "-"}
            />
            <Param
              title="Dog friendly"
              value={breed.dog_friendly ? `${breed.dog_friendly}/5` : "-"}
            />
          </div>
          <div>
            <Param title="Description" value={breed.description ?? "-"} long />
            <Param title="Temperament" value={breed.temperament ?? "-"} long />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreedModalCard;
