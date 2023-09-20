export interface IMessage {
	chat: {
		chat: string;
		id: number;
	};
	id: number;
	message: string;
	user: {
		id: number;
		displayName: string;
		image: string;
	};
}
