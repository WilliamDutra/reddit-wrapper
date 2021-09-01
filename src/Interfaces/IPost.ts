export interface Data {
	after?: any;
	dist: number;
	modhash?: any;
	geo_filter: string;
	children: Children[];
	before?: any;
}

export default interface IPost {
	kind: string;
	data: Data;
}

export interface Children {
	kind: string;
	data: Data2
}

export interface Data2 {
	author_flair_background_color?: any;
	approved_at_utc?: any;
	subreddit: string;
	selftext: string;
	author_fullname: string;
	saved: boolean;
	mod_reason_title?: any;
	gilded: number;
	clicked: boolean;
	title: string;
	link_flair_richtext: any[];
	subreddit_name_prefixed: string;
	hidden: boolean;
	pwls?: any;
	link_flair_css_class?: any;
	downs: number;
	thumbnail_height?: number;
	top_awarded_type?: any;
	hide_score: boolean;
	media_metadata: MediaMetadata;
	name: string;
	quarantine: boolean;
	link_flair_text_color: string;
	upvote_ratio: number;
	ignore_reports: boolean;
	ups: number;
	domain: string;
	media_embed: MediaEmbed;
	thumbnail_width?: number;
	author_flair_template_id?: any;
	is_original_content: boolean;
	user_reports: any[];
	secure_media?: any;
	is_reddit_media_domain: boolean;
	is_meta: boolean;
	category?: any;
	secure_media_embed: SecureMediaEmbed;
	link_flair_text?: any;
	can_mod_post: boolean;
	score: number;
	approved_by?: any;
	is_created_from_ads_ui: boolean;
	author_premium: boolean;
	thumbnail: string;
	edited: boolean;
	author_flair_css_class?: any;
	author_flair_richtext: any[];
	gildings: Gildings;
	content_categories?: any;
	is_self: boolean;
	subreddit_type: string;
	created: number;
	link_flair_type: string;
	wls?: any;
	removed_by_category?: any;
	banned_by?: any;
	author_flair_type: string;
	total_awards_received: number;
	allow_live_comments: boolean;
	selftext_html: string;
	likes: boolean;
	suggested_sort?: any;
	banned_at_utc?: any;
	view_count?: any;
	archived: boolean;
	no_follow: boolean;
	spam: boolean;
	is_crosspostable: boolean;
	pinned: boolean;
	over_18: boolean;
	all_awardings: any[];
	awarders: any[];
	media_only: boolean;
	can_gild: boolean;
	removed: boolean;
	spoiler: boolean;
	locked: boolean;
	author_flair_text?: any;
	treatment_tags: any[];
	rte_mode: string;
	visited: boolean;
	removed_by?: any;
	mod_note?: any;
	distinguished?: any;
	subreddit_id: string;
	author_is_blocked: boolean;
	mod_reason_by?: any;
	num_reports: number;
	removal_reason?: any;
	link_flair_background_color: string;
	id: string;
	is_robot_indexable: boolean;
	report_reasons: any[];
	author: string;
	discussion_type?: any;
	num_comments: number;
	send_replies: boolean;
	whitelist_status?: any;
	contest_mode: boolean;
	mod_reports: any[];
	author_patreon_flair: boolean;
	approved: boolean;
	author_flair_text_color?: any;
	permalink: string;
	parent_whitelist_status?: any;
	stickied: boolean;
	url: string;
	subreddit_subscribers: number;
	created_utc: number;
	num_crossposts: number;
	media?: any;
	is_video: boolean;
}

export interface MediaEmbed {
	
}

export interface SecureMediaEmbed {
}

export interface Gildings {
	
}

export interface MediaMetadata {
	
}




