import { buildLibraryKey, buildBookshelfKey, buildBookKey } from '../dynamodb/keys'
import { add, getSingletonByKey, getByKey } from '../dynamodb'
import { TBookshelf, TBook } from '../types'

export const getLibrary = async (userId: string): Promise<TBookshelf[]> => {
  const key = buildLibraryKey(userId);
  return getByKey<TBookshelf>(key);
}

export const getBookshelf = async (userId: string, bookshelfId: string): Promise<TBookshelf> => {
  const key = buildLibraryKey(userId, bookshelfId)
  return getSingletonByKey<TBookshelf>(key, true, true)
}

export const getBooks = async (userId: string, bookshelfId: string): Promise<TBookshelf> => {
  const key = buildBookshelfKey(userId, bookshelfId);
  const shelf = await getBookshelf(userId, bookshelfId);
  var books = await getByKey<TBook>(key);
  return {
    ...shelf,
    books: books,
  }
}

export const addBookshelf = async (userId: string, bookshelf: TBookshelf): Promise<any> => {
  const key = buildLibraryKey(userId, bookshelf.id);
  return add(key, bookshelf)
}

export const addBookToBookshelf = async (userId: string, bookshelfId: string, book: TBook): Promise<any> => {
  const key = buildBookshelfKey(userId, bookshelfId)
  return add(key, book)
}

export const addBook = async (book: TBook) => {
  const key = buildBookKey(book.isbn);
  return add(key, book)
}

