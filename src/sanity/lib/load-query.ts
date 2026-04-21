// ./src/sanity/lib/load-query.ts
import { type QueryParams } from "sanity";
import { sanityClient } from "sanity:client";

export async function loadQuery<QueryResponse>({
  query,
  params,
}: {
  query: string;
  params?: QueryParams;
}) {
  const { result } = await sanityClient.fetch<QueryResponse>(
    query,
    params ?? {},
    { filterResponse: false }
  );

  return {
    data: result,
  };
}

// Query for fetching a single page by slug
export const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  ...,
  content[]{
    ...,
    _type == "faqs" => {
      ...,
      faqs[]->
    },
    _type == "formBlock" => {
      ...,
      form->
    }
  }
}`;