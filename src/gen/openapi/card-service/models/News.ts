/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type News = {
    id?: string;
    boardId?: string;
    author?: string;
    title?: string;
    description?: string;
    imageURL?: string;
    /**
     * date in UTC when the news was created
     */
    createdAt?: string;
    status?: News.status;
}

export namespace News {

    export enum status {
        DRAFT = 'draft',
        PUBLISHED = 'published',
        ARCHIVE = 'archive',
    }


}
