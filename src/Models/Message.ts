export default class Message {

	public To: string;
	
	public Subject: string;
	
	public Api_Type: string;
	
	public Text: string;
	
	public Uh: string;
	
	constructor(to: string, subject: string, text: string, api_type: string, uh: string) {
		this.To = to;
		this.Subject = subject;
		this.Api_Type = api_type;
		this.Text = text;
		this.Uh = uh;
	}
	
}