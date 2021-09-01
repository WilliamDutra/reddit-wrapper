export default interface IPostSubmit {
	ad?: boolean;
	api_type: string;
	extension?: string;
	flair_id?: string;
	flair_text?: string;
	kind?: string;
	nsfw?: boolean;
	resubmit: boolean;
	richtext_json?: string;
	sendreplies?: string;
	spoiler?: boolean;
	sr: string;
	text: string;
	title: string;
	uh: string;
	url: string;
	video_poster_url?: string;
}