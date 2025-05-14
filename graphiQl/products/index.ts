import { gql } from '@apollo/client'

export const GET_PRODUCTS_AND_CATEGORIES = gql`
  query GetProductsAndCategories {
   categories {
    id
    name
  }
  products {
    id
    category_id
    name
    price
    stock
    image_url
  }
  }
`