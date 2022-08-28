// @flow

import { TBook } from '.';
export type TBookshelf = {
    id: string,
    name: string,
    bookCount: number,
    notes: string,
    books: Array<TBook>
}