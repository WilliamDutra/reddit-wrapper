export default interface IResponse {
	json: Json;
}

export interface Data {
	url: string;
	drafts_count: number;
	id: string;
	name: string;
	modhash: string;
	cookie: string
}

export interface Json {
	errors: any[];
	data: Data;
}





