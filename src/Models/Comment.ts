export default class Comment {
		
	public return_rtjson?: boolean;
	
	public richtext_json?: string;

	public text: string;
	
	public thing_id: string;
	
	public uh: string;
	
	constructor(text: string, thing_id: string, uh: string){
		this.text = text;
		this.thing_id = thing_id;
		this.uh = uh;
	}
	
}