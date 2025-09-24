import React from 'react';
import { tinaField, useTina } from "tinacms/dist/react";
import type { ProjectQuery, ProjectQueryVariables } from '../__generated__/types.ts';
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import FormattedDate from '../../src/components/react/FormattedDate.tsx';

type Props = {
	variables: ProjectQueryVariables;
	data: ProjectQuery;
	query: string;
}

export default function AdminProjectPost(props: Props) {

	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	const project = data.project;

	return (
		<article>
			<div data-tina-field={tinaField(project, "heroImage")} className="hero-image">
				{project.heroImage && <img width={1020} height={510} src={project.heroImage} alt="" />}
			</div>
			<div className="prose-wrapper">
				<div className="prose">
					<div className="title">
						<div className="date-text" data-tina-field={tinaField(project, "pubDate")} >
							<FormattedDate date={project.pubDate} />
							{
								project.updatedDate && (
									<div className="last-updated-on" data-tina-field={tinaField(project, "updatedDate")} >
										Last updated on <FormattedDate date={project.updatedDate} />
									</div>
								)
							}
						</div>
						<h1 data-tina-field={tinaField(project, "title")} >{project.title}</h1>
						<ul className="tag-list-class">
						{project.tags && Array.isArray(project.tags) ? (
							project.tags.map((tag) => (
								<li className="tag">
									#{tag}
								</li>
							))
						):''}
						</ul>
					</div>
					<div data-tina-field={tinaField(project, "body")}>
						<TinaMarkdown content={project.body} />
					</div>
				</div>
			</div>
		</article>
	);
}
