import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(`
  *[_type == "startup" && defined(slug.current) && (!defined($search) || title match "*" + $search + "*" || category match "*" + $search + "*" || author->name match "*" + $search + "*")] | order(_createdAt desc) [$start...$end]{
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
    poster{
        asset->{
            url
        }
    },
    }
`);


export const STARTUP_QUERY_BY_SLUG = defineQuery(
    `
    *[_type == "startup" && slug.current == $slug ][0] {
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
        poster{
            asset->{
                url
            }
        },
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
        poster{
            asset->{
                url
            }
        },
        pitch
    }
    `
);

export const GET_RECENT_POST = defineQuery(
    `
    *[_type == "startup" && _createdAt >= $fromTimeStamp] {
        _id,
        title,
        poster{
            asset->{
                url
            }
        },
        _createdAt,
        author,
        slug
    }
    `
);
