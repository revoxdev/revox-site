import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import type {
  NewsroomQuery,
  NewsroomQueryVariables,
} from "../__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import FormattedDate from "../../src/components/react/FormattedDate.tsx";
import "../../src/styles/blog.detail.css";

type Props = {
  variables: NewsroomQueryVariables;
  data: NewsroomQuery;
  query: string;
};

export default function AdminNewsroomPost(props: Props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const newsroom = data.newsroom;

  return (
    <article className="blog-detail-page">
      <div
        data-tina-field={tinaField(newsroom, "heroImage")}
        className="hero-image"
      >
        {newsroom.heroImage && (
          <img width={1020} height={510} src={newsroom.heroImage} alt="" />
        )}
      </div>
      <div className="prose-wrapper-with-sidebar">
        <div className="prose">
          <div className="title">
            <span data-tina-field={tinaField(newsroom, "title")}>
              {newsroom.title}
            </span>
          </div>
          <div className="author-info-view">
            {newsroom.authors &&
              newsroom.authors.length > 0 &&
              newsroom.authors[0] && (
                <>
                  <div className="author-avatar">
                    {newsroom.authors[0].avatar && (
                      <img
                        src={newsroom.authors[0].avatar}
                        alt={newsroom.authors[0].name || "Author"}
                      />
                    )}
                  </div>
                  <div className="author-details">
                    <span
                      className="author-name"
                      data-tina-field={tinaField(newsroom.authors[0], "name")}
                    >
                      {newsroom.authors[0].name}
                    </span>
                    <span
                      className="author-designation"
                      data-tina-field={tinaField(
                        newsroom.authors[0],
                        "designation"
                      )}
                    >
                      {newsroom.authors[0].designation}
                    </span>
                  </div>
                </>
              )}
          </div>
          <div className="blog-content" data-tina-field={tinaField(newsroom, "body")}>
            <TinaMarkdown content={newsroom.body} />
          </div>
        </div>
        <div className="author-sidebar">
          <div className="author-info-view">
            {newsroom.authors &&
              newsroom.authors.length > 0 &&
              newsroom.authors[0] && (
                <>
                  <div className="author-avatar">
                    {newsroom.authors[0].avatar && (
                      <img
                        src={newsroom.authors[0].avatar}
                        alt={newsroom.authors[0].name || "Author"}
                      />
                    )}
                  </div>
                  <div className="author-details">
                    <span
                      className="author-name"
                      data-tina-field={tinaField(newsroom.authors[0], "name")}
                    >
                      {newsroom.authors[0].name}
                    </span>
                    <span
                      className="author-designation"
                      data-tina-field={tinaField(
                        newsroom.authors[0],
                        "designation"
                      )}
                    >
                      {newsroom.authors[0].designation}
                    </span>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </article>
  );
}
