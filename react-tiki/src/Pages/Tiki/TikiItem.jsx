import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TikiItem(props) {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [tokenId, setTokenId] = useState();

  useEffect(() => {
    init();
  }, [props]);

  const init = async () => {
    const url = `${process.env.REACT_APP_PINATA_BASE_URL}${props.id}.json`;
    const _res = await fetch(url);
    const res = await _res.json();

    setTokenId(props.id);
    setImage(res.image);
    setName(res.name);
  };
  return (
    <div className="collectionItem">
      <div className="collectionItem__inner">
        <div className="collectionItem__inner-image">
          <img src={image} alt={props.id} />
        </div>
        <div className="collectionItem__inner-content">
          <div className="collectionItem__inner-name">{name}</div>
          <Link to={`/story/${tokenId}`} className="collectionItem__inner-btn">
            ADD YOUR STORY
          </Link>
        </div>
      </div>
    </div>
  );
}
