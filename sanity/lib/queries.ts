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


export const STARTUP_VIEWS_QUERY = defineQuery(
    `
    *[_type == "startup" && _id == $id][0] {
        _id,
        views,
    }
    `
);



export const AUTHOR_BY_GITHUB_ID = defineQuery(
    `
        *[_type == "author" && id == $id][0] {
            _id,
            id,
            name,
            username,
            email,
            image,
            bio
        }
    `
);

export const GET_AUTHOR_BY_ID = defineQuery(
    `
        *[_type == "author" && _id == $id][0] {
            _id,
            id,
            name,
            username,
            email,
            image,
            bio
        }
    `
);


export const GET_AUTHOR_POSTS = defineQuery(
    `
    *[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
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
)