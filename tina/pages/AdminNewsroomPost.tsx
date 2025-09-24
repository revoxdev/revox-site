import React from 'react';
import { tinaField, useTina } from "tinacms/dist/react";
import type { NewsroomQuery, NewsroomQueryVariables } from '../__generated__/types';
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import FormattedDate from '../../src/components/react/FormattedDate.tsx';

type Props = {
	variables: NewsroomQueryVariables;
	data: NewsroomQuery;
	query: string;
}

export default function AdminNewsroomPost(props: Props) {

	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	const newsroom = data.newsroom;

	return (
		<article>
			<div data-tina-field={tinaField(newsroom, "heroImage")} className="hero-image">
				{newsroom.heroImage && <img width={1020} height={510} src={newsroom.heroImage} alt="" />}
			</div>
			<div className="prose-wrapper">
				<div className="prose">
					<div className="title">
						<div className="date-text" data-tina-field={tinaField(newsroom, "pubDate")} >
							<FormattedDate date={newsroom.pubDate} />
							{
								newsroom.updatedDate && (
									<div className="last-updated-on" data-tina-field={tinaField(newsroom, "updatedDate")} >
										Last updated on <FormattedDate date={newsroom.updatedDate} />
									</div>
								)
							}
						</div>
						<h1 data-tina-field={tinaField(newsroom, "title")} >{newsroom.title}</h1>
						<ul className="tag-list-class">
						{newsroom.tags && Array.isArray(newsroom.tags) ? (
							newsroom.tags.map((tag) => (
								<li className="tag">
									#{tag}
								</li>
							))
						):''}
						</ul>
					</div>
					<div data-tina-field={tinaField(newsroom, "body")}>
						<TinaMarkdown content={newsroom.body} />
					</div>
				</div>
			</div>
		</article>
	);
}
