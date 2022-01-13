export default interface IMentions {
	kind: string;
	data: Data;
}



export interface Data2 {
	first_message: string;
	first_message_name: string;
	subreddit: string;
	likes: string;
	replies: string;
	author_fullname: string;
	id: string;
	subject: string;
	associated_awarding_id: string;
	score: number;
	author: string;
	num_comments: number;
	parent_id: string;
	subreddit_name_prefixed: string;
	new: boolean;
	type: string;
	body: string;
	link_title: string;
	dest: string;
	was_comment: boolean;
	body_html: string;
	name: string;
	created: number;
	created_utc: number;
	context: string;
	distinguished: string;
}

export interface Child {
	kind: string;
	data: Data2;
}

export interface Data {
	after: string;
	dist: number;
	modhash: string;
	geo_filter: string;
	children: Child[];
	before: string;
}



