/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { News } from './News';

export type BoardNews = {
    drafts?: Array<News>;
    published?: Array<News>;
    archives?: Array<News>;
}
