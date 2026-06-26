import type {
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSQueries,
} from "microcms-js-sdk";

import { createClient } from "microcms-js-sdk";

const ENDPOINTS = {
  notes: "notes",
  works: "work",
} as const;

const LATEST_LIMIT = 3;

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
  publishedAt: string;
  createdAt: string;
  thumbnail: MicroCMSImage;
  title: string;
  url?: string;
  techs?: string[];
  github?: string;
  summary?: string;
  contents?: Array<{
    fieldId: string;
    contentTitle: string;
    contentDescription: string;
  }>;
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

const getList = <T extends MicroCMSListContent>(
  endpoint: (typeof ENDPOINTS)[keyof typeof ENDPOINTS],
  queries?: MicroCMSQueries,
) =>
  client.getList<T>({
    endpoint,
    queries,
  });

const getDetail = <T extends MicroCMSListContent>(
  endpoint: (typeof ENDPOINTS)[keyof typeof ENDPOINTS],
  contentId: string,
) =>
  client.getListDetail<T>({
    endpoint,
    contentId,
  });

export const getNoteList = (queries?: MicroCMSQueries) =>
  getList<Note>(ENDPOINTS.notes, queries);

export const getNote = (slug: string) => getDetail<Note>(ENDPOINTS.notes, slug);

export const getLatestNotes = async () => {
  const notes = await getNoteList({
    limit: LATEST_LIMIT,
    orders: "-publishedAt",
  });
  return notes.contents;
};

export const getWorkList = (queries?: MicroCMSQueries) =>
  getList<Work>(ENDPOINTS.works, queries);

export const getLatestWorks = async () => {
  const works = await getWorkList({
    limit: LATEST_LIMIT,
    orders: "-publishedAt",
  });
  return works.contents;
};

export const getWork = (slug: string) => getDetail<Work>(ENDPOINTS.works, slug);
