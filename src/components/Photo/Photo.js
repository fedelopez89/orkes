import React from "react";
import * as S from "./styles";

const initUrl = "https://www.pinkvilla.com/";

const Photo = ({ photo }) => {
  const photoImg = `${initUrl}${photo.field_photo_image_section}`;
  const titleImg = photo.title;
  const imgPath = `${initUrl}${photo.path}`;

  console.log()
  return (
    <S.Photo>
      <h4>{titleImg}</h4>
      <img
        src={photoImg}
        alt={photoImg}
      ></img>
      <a href={imgPath}>Link</a>
    </S.Photo>
  );
};

export default Photo;
