import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";

export type Note = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: MicroCMSImage;
  createdAt: string;
  category: Category;
  content: string;
} & MicroCMSListContent;

export type Category = {
  name: string;
} & MicroCMSListContent;

export type Work = {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  thumbnail: MicroCMSImage;
  createdAt: string;
  category: string;
  content?: string;
} & MicroCMSListContent;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required')
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required')
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
})

export const getNoteList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Note>({
    endpoint: "notes",
    queries,
  });
  return listData;
};
