import React, { useState, useEffect } from "react";
import Photo from "../Photo/Photo";
import useGetPhotos from "../../helpers/useGetPhotos";
import ClipLoader from "react-spinners/ClipLoader";
import * as S from "./styles";

const ListPhotos = () => {
  const [page, setPage] = useState(0);
  const [result, error, loading] = useGetPhotos(page);
  const [images, setImages] = useState([]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (page === 0 && result?.nodes && !loading) {
      setImages(result.nodes);
    }
    if (page > 0 && result?.nodes && !loading) {
      setImages((prev) => {
        return [...prev, ...result.nodes];
      });
    }
  }, [result, loading]);

  // function that runs when user scrolls
  const handleScroll = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
    const isBottom = scrollHeight - scrollTop <= clientHeight;
    if (isBottom && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  let content = <p>Loading...</p>;

  if (error) {
    content = <p>Error...</p>;
  }

  if (images !== undefined) {
    if (images?.length > 0) {
      content = images.map((photo) => {
        return <Photo key={photo.node.nid} photo={photo.node} />;
      });
    }
  }

  return (
  <>
  <S.ListPhotos>{content}</S.ListPhotos>
  {loading &&  <ClipLoader color={"red"} loading={loading} size={150} />}
  </>
  )
};

export default ListPhotos;
