import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import * as fs from 'fs';
import { pipeline }  from 'stream';
import { promisify }  from 'util';

import Post from './Models/Post';
import Comment from './Models/Comment';

import IPost from './Interfaces/IPost';
import IFlair from './Interfaces/IFlair';
import IResponse from './Interfaces/IResponse';
import ISubRedditAbout from './Interfaces/ISubRedditAbout';
import IAccessToken from './Interfaces/IAccessToken';
import IMentions from './Interfaces/IMentions';

export default class Reddit {
	
	private AUTH_URL: string  = 'https://www.reddit.com';
	
	private URL_API: string = 'https://oauth.reddit.com';
	
	private URL_SSL: string = 'https://ssl.reddit.com';
	
	private Username: string;
	
	private Password: string;
	
	private ClientId: string;
	
	private SecretId: string;
	
	private UserAgent: string;
	
	constructor(Username: string, Password: string, ClientId: string, SecretId: string, UserAgent: string) {		
		this.Username  = Username;
		this.Password  = Password;
		this.ClientId  = ClientId;
		this.SecretId  = SecretId;
		this.UserAgent = UserAgent;
	}
	
	public async GetBearerToken() : Promise<IAccessToken> {
		
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
		
		let result: IAccessToken =  await response.json() as IAccessToken;
		return result;
		
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
		
		return await response.json() as IAccessToken;
	}
	
	public async GetInfoSubReddit(BearerToken: string, Subreddit: string) : Promise<ISubRedditAbout> {
		
		let response = await fetch(`${this.URL_API}/r/${Subreddit}/about`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${BearerToken}`,
				'Content-Type': 'application/json',
				'User-Agent': `${this.UserAgent}`
			}
		});
			
		let result: ISubRedditAbout =  await response.json() as ISubRedditAbout;
		return result;	
			
	}
	
	public async  GetNewPostsOfSubReddit(BearerToken: string, Subreddit: string): Promise<IPost> {
		
		//`${this.URL_API}/r/${Subreddit}/new?sort=rising&limit=2`
		
		let response = await fetch(`${this.URL_API}/r/${Subreddit}/new`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${BearerToken}`,
				'Content-Type': 'application/json',
				'User-Agent': `${this.UserAgent}`
			}
		});
		
		
		let result: IPost =  await response.json() as IPost;
		return result;
		
	}
	
	public async GetPostOfSubReddit(BearerToken: string, SubReddit: string, PostId: string): Promise<IPost>{
		
		
		let response = await fetch(`${this.URL_API}/r/${SubReddit}/api/info?id=${PostId}&sr_name=&url=`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${BearerToken}`,
				'Content-Type': 'application/json',
				'User-Agent': `${this.UserAgent}`
			}
		});
		
		let result: IPost =  await response.json() as IPost;
		return result;
	}
		
	public async GetPostOfSubRedditByFlair(BearerToken: string, SubReddit: string, Flair: string): Promise<any>{
				
		let flairParam = encodeURIComponent(`flair_name:${Flair}`);
		
		let response = await fetch(`${this.URL_API}/r/${SubReddit}/search?q=${flairParam}&restrict_sr=true"`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${BearerToken}`,
				'Content-Type': 'application/json',
				'User-Agent': `${this.UserAgent}`
			}
		});
		
		return response.json();
		
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

	public async SubmitPostInSubReddit(BearerToken: string, post: Post): Promise<IResponse> {
				
		let UrlEnconded = new URLSearchParams();
		
		if(post.sr != null)
			UrlEnconded.append('sr', `${post.sr}`);
		
		if(post.url != null)
			UrlEnconded.append('url', `${post.url}`);
		
		if(post.resubmit != null)
			UrlEnconded.append('resubmit', `${post.sr}`);
		
		if(post.text != null)
			UrlEnconded.append('text', `${post.text}`);
		
				
		if(post.title != null)
			UrlEnconded.append('title', `${post.title}`);
		
		if(post.uh != null)
			UrlEnconded.append('uh', `${post.uh}`);
		
		if(post.kind != null)
			UrlEnconded.append('kind', `${post.kind}`);
		
		UrlEnconded.append('api_type', 'json');
		
		
		let response = await fetch(`${this.URL_API}/api/submit`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${BearerToken}`,
				'User-Agent': `${this.UserAgent}`,
				'X-Modhash': `${post.uh}`
			},
			body: UrlEnconded
		});
		
		return await response.json() as IResponse;
		
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

	public async GetMessagesUnread(BearerToken: string) : Promise<any> {
		
		let response = await fetch(`${this.URL_API}/message/unread`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${BearerToken}`,
				'User-Agent': `${this.UserAgent}`
			}
		});
		
		return response.json();
		
	}
	
	public async GetMessagesInbox(BearerToken: string): Promise<any> {
		
		let response = await fetch(`${this.URL_API}/message/inbox`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${BearerToken}`,
				'User-Agent': `${this.UserAgent}`
			}
		});
		
		return response.json();
		
	}
	
	public async GetMentions(BearerToken: string): Promise<IMentions> {
		
		let response = await fetch(`${this.URL_API}/message/mentions`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${BearerToken}`,
				'User-Agent': `${this.UserAgent}`
			}
		});
		
		let result: IMentions =  await response.json() as IMentions;
		return result;		
	}
	
	public async GetMessagesSent(BearerToken: string) : Promise<any> {
		
		let response = await fetch(`${this.URL_API}/message/sent`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${BearerToken}`,
				'User-Agent': `${this.UserAgent}`
			}
		});
		
		return response.json();
		
	}
	
	public async GetListFlairInSubReddit(BearerToken: string, Subreddit: string) : Promise<IFlair[]> {
		
		let response  = await fetch(`${this.URL_API}/r/${Subreddit}/api/link_flair_v2`, {
			method: 'GET',
			headers: {
				'User-Agent': `${this.UserAgent}`,
				'Authorization': `Bearer ${BearerToken}`
			}
		});
		
		let result: IFlair[] = await response.json();
		return result;
	}
	
	public async SendCommentInPost(BearerToken: string, comment: Comment) : Promise<any> {
		
		let UrlEnconded = new URLSearchParams();
		UrlEnconded.append('api_type', 'json');
		
		
		if(comment.text != null)
			UrlEnconded.append('text', `${comment.text}`);
		
		if(comment.thing_id != null)
			UrlEnconded.append('thing_id', `${comment.thing_id}`);
		
		if(comment.return_rtjson != null)
			UrlEnconded.append('return_rtjson', `${comment.return_rtjson}`);
		
		if(comment.uh != null)
			UrlEnconded.append('uh', `${comment.uh}`);
		
		let response = await fetch(`${this.URL_API}/api/comment`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${BearerToken}`,
				'User-Agent': `${this.UserAgent}`,
				'X-Modhash': `${comment.uh}`
			},
			body: UrlEnconded
		});
		
		return response.json();
	}

	public ExtractLinkToVideo(texto: string) : any {
		
		let patternVideo = /https:\/\/reddit\.com\/link\/.*\/player/gm;
		
		return texto.match(patternVideo) || null;
		
	}
	
	public async Download(Url: string, Path: string, Extensions: string) : Promise<any> {
		
		let streamPipeline = promisify(pipeline);
		
		let DataVigente = new Date();
		let nameFile = `${DataVigente.getDate()}-${DataVigente.getMonth()}-${DataVigente.getFullYear()}_${DataVigente.getHours()}${DataVigente.getMinutes()}.${Extensions}`;
		
		let response = await fetch(Url);
		streamPipeline(response.body, fs.createWriteStream(`${Path}\\${nameFile}`));
		
		return response;
	
	}
	

}