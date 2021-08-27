export default class Post {
	
	public ad?: boolean;
	
	public api_type?: string;
	
	public extension?: string;
	
	public flair_id?: string;
	
	public flair_text?: string;
	
	public kind?: string;
	
	public nsfw?: boolean;
	
	public resubmit?: boolean;
	
	//public richtext_json:? string;
	
	public sendreplies?: string;
	
	public spoiler?: boolean;
	
	public sr: string;
	
	public text: string;
	
	public title: string;
	
	public uh: string;
	
	public url: string;
	
	public  video_poster_url?: string;
	
	constructor(sr: string, title: string, text: string, uh: string, url: string){
		this.sr = sr;
		this.title = title;
		this.text = text;
		this.uh = uh;
		this.url = url;
	}
	
}