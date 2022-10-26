import { useContext, useEffect, useState } from "react";
import { ContentContext } from "../contexts/contentContext";

const spaceID = 'k7st42ue3gzb';
const accessToken = 'G5lWoDWx4C32wyZtUGjAmWkd29rjJ8ZQNVBvmntYQwg';

const contentfulGraphqlURL = `https://graphql.contentful.com/content/v1/spaces/${spaceID}`;
// const contentfulGraphiqlURL = `https://graphql.contentful.com/content/v1/spaces/${spaceID}/explore?access_token=${accessToken}`;

const contentSectionQuery = `
{
  sectionContentCollection {
    items {
      type
      index
      title
      subtitle
      description
    }
  }
}
`

const teamMembersQuery = `
{
  teamMemberCollection {
    items {
      role
      name
      image {
        url
      }
      socialMediaLink
    }
  }
}
`

const appleImagesQuery = `
{
  collectionImagesCollection {
    items {
      imagesCollection {
        items {
          url
        }
      }
    }
  }
}
`

function baseContentFetch(query) {
  return fetch(contentfulGraphqlURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query: query }),
  })
}

function fetchContent() {
  return baseContentFetch(contentSectionQuery)
}

export function fetchTeamMembers() {
  return baseContentFetch(teamMembersQuery)
}

export function fetchAppleImages() {
  return baseContentFetch(appleImagesQuery)
}

function filterByType(collectionResponse, type) {
  return collectionResponse.filter(element => element.type === type);
}

export function useContent() {
  const { setContent } = useContext(ContentContext);
  const [loadingContent, setLoadingContent] = useState(true);

  useEffect(() => {
    fetchContent()
    .then((response) => response.json())
    .then(({ data }) => {
      const collectionResponse = data.sectionContentCollection.items;

      setContent({
        buttonsContent: filterByType(collectionResponse, 'button'),
        sectionsContent: filterByType(collectionResponse, 'section'),
        mappingBulletsContent: filterByType(collectionResponse, 'bullet'),
      })

      setLoadingContent(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { loadingContent };
}