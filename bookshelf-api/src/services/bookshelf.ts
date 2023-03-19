import { buildLibraryKey, buildBookshelfKey, buildBookKey } from '../dynamodb/keys'
import { add, getSingletonByKey, getByKey } from '../dynamodb'
import { TBookshelf, TBook } from '../types'

export async function getLibrary(userId: string): Promise<TBookshelf[]> {
  const key = buildLibraryKey(userId);
  return getByKey<TBookshelf>(key);
}

export async function getBookshelf(userId: string, bookshelfId: string): Promise<TBookshelf> {
  const key = buildLibraryKey(userId, bookshelfId)
  return getSingletonByKey<TBookshelf>(key, true, true)
}

export async function getBooks(userId: string, bookshelfId: string): Promise<TBookshelf> {
  const key = buildBookshelfKey(userId, bookshelfId);
  const shelf = await getBookshelf(userId, bookshelfId);
  var books = await getByKey<TBook>(key);
  return {
    ...shelf,
    books: books,
  }
}

export async function addBookshelf(userId: string, bookshelf: TBookshelf): Promise<any> {
  const key = buildLibraryKey(userId, bookshelf.id);
  return add(key, bookshelf)
}

export async function addBookToBookshelf(userId: string, bookshelfId: string, book: TBook): Promise<any> {
  const key = buildBookshelfKey(userId, bookshelfId)
  return add(key, book)
}

export async function addBook(book: TBook) {
  const key = buildBookKey(book.isbn);
  return add(key, book)
}

