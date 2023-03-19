import { TAuthor } from "../types";
import { getSingletonByKey } from '../dynamodb';
import { buildAuthorKey } from '../dynamodb/keys';


export async function getAuthor(authorId: string): Promise<TAuthor> {
    const key = buildAuthorKey(authorId);
    return getSingletonByKey<TAuthor>(key, true, true);
}
