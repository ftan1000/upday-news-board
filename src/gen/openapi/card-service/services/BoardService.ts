/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Board } from '../models/Board';
import type { BoardNews } from '../models/BoardNews';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BoardService {

    /**
     * List of supported boards
     * @returns Board successful operation
     * @throws ApiError
     */
    public static getAllCountries(): CancelablePromise<Array<Board>> {
        return __request({
            method: 'GET',
            path: `/board`,
        });
    }

    /**
     * List of board's news
     * @param boardId ID of the board's news
     * @returns BoardNews successful operation
     * @throws ApiError
     */
    public static getNewsFromBoard(
        boardId: number,
    ): CancelablePromise<BoardNews> {
        return __request({
            method: 'GET',
            path: `/board/${boardId}/news`,
        });
    }

}