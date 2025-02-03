import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(`
    *[_type == "startup" && defined(slug.current)] | order(_createdAt desc){
        _id,
        title,
        slug,
        _createdAt,
        author -> {
            _id,
            name,
            image,
            bio
        },
        views,
        description,
        category,
        image
    }
    
    `);

export const STARTUP_QUERY_BY_ID = defineQuery(
  `
        *[_type == "startup" && _id == $id][0] {
        _id,
        title,
        slug,
        _createdAt,
        author -> {
            _id,
            name,
            image,
            bio
        },
        views,
        description,
        category,
        image,
        pitch
    }
    `
);
