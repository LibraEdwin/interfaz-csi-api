export type News = {
  _id: number,
  title: string,
  thumbnailUrl: string,
  excerpt: string,
  content: string[],
  permalink: string,
  keywords: string[],
  linkVideo: string,
  tags: number[],
  author: number,
  visibility: boolean,
  ad: number,
  isDeleted: boolean,
  createdAt: Date,
  updatedAt: Date
}

export { CustomResponse as Response } from '../../helpers/types'