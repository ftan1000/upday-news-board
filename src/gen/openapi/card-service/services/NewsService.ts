/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { News } from '../models/News';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class NewsService {

    /**
     * create a news element
     * @param body
     * @returns News successful operation
     * @throws ApiError
     */
    public static addNews(
        body: News,
    ): CancelablePromise<News> {
        return __request({
            method: 'POST',
            path: `/news`,
            body: body,
            errors: {
                400: ` - author: Invalid __[invalid email format]__ `,
                404: `the board id is not found`,
            },
        });
    }

    /**
     * update a news
     *  update a news element based on the Id.
     *
     * Only these fields will be updated:
     * - author
     * - title
     * - description
     * - imageURL
     *
     * @param body List of user object
     * @returns News successful operation
     * @throws ApiError
     */
    public static updateNews(
        body: Array<News>,
    ): CancelablePromise<News> {
        return __request({
            method: 'PUT',
            path: `/news`,
            body: body,
            errors: {
                400: ` if the news's status is __Draft__ only author will be validated:
                 * - author: Invalid __[invalid email format]__
                 *
                 * if the news's status is __Published__ all fields will be validated:
                 * - author: Invalid __[invalid email format]__
                 * - title: Invalid __[can not be blank]__
                 * - description: Invalid __[can not be blank]__
                 * - imageURL: Invalid __[can not be blank]__
                 * `,
                404: `news not found`,
            },
        });
    }

    /**
     * Find a News by ID
     * @param newsId ID of news to return
     * @returns News successful operation
     * @throws ApiError
     */
    public static findNews(
        newsId: string,
    ): CancelablePromise<News> {
        return __request({
            method: 'GET',
            path: `/news/${newsId}`,
            errors: {
                404: `News not found`,
            },
        });
    }

    /**
     * Delete a News by ID
     * @param newsId ID of news to delete
     * @returns any successful operation
     * @throws ApiError
     */
    public static deleteNews(
        newsId: string,
    ): CancelablePromise<any> {
        return __request({
            method: 'DELETE',
            path: `/news/${newsId}`,
            errors: {
                404: `News not found`,
            },
        });
    }

    /**
     * archive a News
     *  __PS:__ after archive a news element they cannot be updated to a different status.
     * @param newsId ID of news to archive
     * @returns any successful operation
     * @throws ApiError
     */
    public static archiveNews(
        newsId: string,
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/news/${newsId}/archive`,
            errors: {
                404: `news not found`,
            },
        });
    }

    /**
     * draft a News
     * @param newsId ID of news to draft
     * @returns any successful operation
     * @throws ApiError
     */
    public static drarftNews(
        newsId: string,
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/news/${newsId}/draft`,
            errors: {
                400: `Archived news cannot be drafted`,
                404: `news not found`,
            },
        });
    }

    /**
     * publish a News element
     *  __PS:__ before change the status to published the follow fields will be validate:
     * - author
     * - title
     * - description
     * - imageURL
     *
     * @param newsId ID of news to publish
     * @returns any successful operation
     * @throws ApiError
     */
    public static publishNews(
        newsId: string,
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/news/${newsId}/published`,
            errors: {
                400: ` - author: Invalid __[invalid email format]__
                 * - title: Invalid __[can not be blank]__
                 * - description: Invalid __[can not be blank]__
                 * - imageURL: Invalid __[can not be blank]__
                 * `,
                404: `news not found`,
            },
        });
    }

}