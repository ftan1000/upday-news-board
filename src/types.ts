export interface News {
	id: string;
	boardId: string;
	author: string;
	title: string;
	description: string;
	imageURL: string;
	CreatedAt: string;
	status: string;
}

export interface Board {
	id: string;
	name: string;
}