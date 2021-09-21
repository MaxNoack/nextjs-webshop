import { gql } from 'apollo-boost';

export const getPages = gql`
  query GetPages {
    allPages {
      title
      slug
      id
    }
  }
`;

export const getPage = gql`
  query GetPage($slug: String) {
    page(filter: { slug: { eq: $slug } }) {
      title
      slug
      content {
        value
      }
      mainImage {
        url
        alt
        width
        height
      }
    }
  }
`;

export const getStartPage = gql`
  query getStartPage {
    startpage {
      title
      content {
        value
      }
      mainImage {
        url
        alt
        width
        height
        blurUpThumb
      }
    }
  }
`;

export const getProducts = gql`
  query getProducts {
    allProducts {
      name
      price
      id
      alternativeImages {
        url
        alt
        width
        height
        id
      }
      mainImage {
        url
        alt
        width
        height
        blurUpThumb
        id
      }
    }
  }
`;

export const getProduct = gql`
  query getProduct($id: ItemId) {
    product(filter: { id: { eq: $id } }) {
      name
      price
      id
      alternativeImages {
        url
        alt
        width
        height
        blurUpThumb
        id
      }
      mainImage {
        url
        alt
        width
        height
        blurUpThumb
        id
      }
    }
  }
`;
