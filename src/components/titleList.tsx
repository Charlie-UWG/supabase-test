import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AddTitle } from "src/components/addTitle";
import noImage from "public/no_image.png";

export type Title = {
  id: number;
  user_id: string;
  title: string;
  author: string;
  image_url: string;
};

type TitlesProps = {
  titles: Title[];
  uuid: string;
  getTitleList: VoidFunction;
  filterText: string;
};

export const TitleList = (props: TitlesProps) => {
  //漫画タイトルのフィルタリング
  const filteredTitle = props.titles.filter((title) => {
    let searchContent = title.title + " " + title.author;
    return searchContent.toLowerCase().includes(props.filterText.toLowerCase());
  });

  return (
    <div>
      <AddTitle uuid={props.uuid} getTitleList={props.getTitleList} />
      {filteredTitle.map((title) => {
        return (
          <Link key={title.id} href={`/title?id=${title.id}`} passHref>
            <div>
              {title.image_url ? (
                <Image
                  src={title.image_url}
                  alt="thumbnale"
                  width={126}
                  height={200}
                />
              ) : (
                <Image src={noImage} alt="thumbnale" width={126} height={200} />
              )}
            </div>
            <div>{title.title}</div>
          </Link>
        );
      })}
    </div>
  );
};
