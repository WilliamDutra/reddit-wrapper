export default interface IFlair {
	type: string;
	text_editable: boolean;
	allowable_content: string;
	text: string;
	max_emojis: number;
	text_color: string;
	mod_only: boolean;
	css_class: string;
	richtext: Richtext[];
	background_color: string;
	id: string;
}

export interface Richtext {
	e: string;
	t: string
}