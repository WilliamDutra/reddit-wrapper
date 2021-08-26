import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

export default class Reddit {
	
	private AUTH_URL: string  = 'https://www.reddit.com';
	
	private URL_API: string = 'https://oauth.reddit.com';
	
	private URL_SSL: string = 'https://ssl.reddit.com';
	
	private Username: string;
	
	private Password: string;
	
	private ClientId: string;
	
	private SecretId: string;
	
	private UserAgent: string;
	
	constructor(args: any) {		
		this.Username = args.Username;
		this.Password = args.Password;
		this.ClientId = args.ClientId;
		this.SecretId = args.SecretId;
		this.UserAgent = args.UserAgent;
	}
	
	public async GetBearerToken() : Promise<any> {
		
		var UrlEnconded = new URLSearchParams();
		UrlEnconded.append('grant_type', 'password');
		UrlEnconded.append('username', `${this.Username}`);
		UrlEnconded.append('password', `${this.Password}`);
		
		let response = await fetch(`${this.AUTH_URL}/api/v1/access_token`, {
			method: 'POST',
			body: UrlEnconded,
			headers: {
				'Authorization': 'Basic ' + new Buffer(`${this.ClientId}:${this.SecretId}`).toString('base64'),
				'Content-Type': 'application/x-www-form-urlencoded',
				'User-Agent': 'MeuBot/1.0.0 (http://example.com)'
			}
		});
		
		return await response.json();
		
	}
	
	public async GetInfosMe(BearerToken: string): Promise<any> {
		
		let response = await fetch(`${this.URL_API}/api/me.json`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${BearerToken}`,
				'Content-Type': 'application/json',
				'User-Agent': `${this.UserAgent}`
			}
		});
		
		return await response.json();
	}
	
	public async GetInfoSubReddit(BearerToken: string, Subreddit: string) : Promise<any> {
		
		let response = await fetch(`${this.URL_API}/r/${Subreddit}/about`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${BearerToken}`,
				'Content-Type': 'application/json',
				'User-Agent': `${this.UserAgent}`
			}
		});
			
		return await response.json();
		
	}
	
	public async  GetNewPostsOfSubReddit(BearerToken: string, Subreddit: string): Promise<any> {
		
		//`${this.URL_API}/r/${Subreddit}/new?sort=rising&limit=2`
		
		let response = await fetch(`${this.URL_API}/r/${Subreddit}/new`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${BearerToken}`,
				'Content-Type': 'application/json',
				'User-Agent': `${this.UserAgent}`
			}
		});
		
		return await response.json();
		
	}
	
	public async SearchSubReddit(BearerToken: string, Name: string) : Promise<any> {
				
		let response = await fetch(`${this.URL_API}/subreddits/search?q=${encodeURI(Name)}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${BearerToken}`,
				'Content-Type': 'application/json',
				'User-Agent': `${this.UserAgent}`
			}
		});
		
		return await response.json();
	}

	

	public async GetModHash() : Promise<any> {
		
		let UrlEnconded = new URLSearchParams();
		UrlEnconded.append('user', `${this.Username}`);
		UrlEnconded.append('passwd', `${this.Password}`);
		UrlEnconded.append('api_type', 'json');
		
		let response = await fetch(`${this.URL_SSL}/api/login`, {
			method: 'POST',
			headers: {
				'User-Agent': `${this.UserAgent}`
			},
			body: UrlEnconded
		});
		
		return response.json();
	}

}