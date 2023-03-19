import { TBook } from "./book"

export type TBookshelf = {
    id: string,
    name: string,
    notes: string,
    books?: Array<TBook>
}