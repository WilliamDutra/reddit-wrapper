import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

export default class Reddit {
	
	private URL: string  = 'https://www.reddit.com';
	
	private Username: string;
	
	private Password: string;
	
	private ClientId: string;
	
	private SecretId: string;
	
	constructor(args: any) {		
		this.Username = args.Username;
		this.Password = args.Password;
		this.ClientId = args.ClientId;
		this.SecretId = args.SecretId;
	}
	
	public async GetBearerToken() : Promise<string> {
		
		var UrlEnconded = new URLSearchParams();
		UrlEnconded.append("grant_type", "password");
		UrlEnconded.append("username", "Darklance1");
		UrlEnconded.append("password", "arn13056");
		
		let response = await fetch(`${this.URL}/api/v1/access_token`, {
			method: 'POST',
			body: UrlEnconded,
			headers: {
				'Authorization': 'Basic T04zbTd3akR1WW13MW8wUmloRmJVZzpQX241Uno5TkNNMHMwdFQ1N0tjTG5tRW5kVDJOUnc=',
				'Content-Type': 'application/x-www-form-urlencoded',
				'User-Agent': 'MeuBot/1.0.0 (http://example.com)'
			}
		});
		
		return await response.json();
		
	}
	
	
}