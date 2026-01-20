import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries, MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

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
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getNoteList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Note>({
    endpoint: "notes",
    queries,
  });
  return listData;
};

export const getNote = async (slug: string) => {
  const note = await client.getListDetail<Note>({
    endpoint: "notes",
    contentId: slug,
  });
  return note;
};

export const getLatestNotes = async () => {
  const notes = await client.getList<Note>({
    endpoint: "notes",
    queries: {
      limit: 3,
      orders: "-publishedAt",
    },
  });
  return notes.contents;
}

export const getWorkList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Work>({
    endpoint: "work",
    queries,
  });
  return listData;
};

export const getLatestWorks = async () => {
  const works = await client.getList<Work>({
    endpoint: "work",
    queries: {
      limit: 3,
      orders: "-publishedAt",
    },
  });
  return works.contents;
}

export const getWork = async (slug: string) => {
  const work = await client.getListDetail<Work>({
    endpoint: "work",
    contentId: slug,
  });
  return work;
};
