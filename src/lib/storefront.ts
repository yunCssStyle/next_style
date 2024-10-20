import { createStorefrontApiClient } from '@shopify/storefront-api-client'

export const createClient = ({ clientId, mallId }) => {
  return createStorefrontApiClient({
    storeDomain: mallId, // Use the storeDomain from local storage
    apiVersion: '2022-10',
    publicAccessToken: clientId,
  })
}

export const productNodesQuery = `
query ProductNodesQuery($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on Product {
        id # 상품 ID
        title # 상품명
        handle # 상품 URL
        requiresSellingPlan
        vendor # 브랜드
        variants(first: 10) {
            edges {
            node {
                id
                selectedOptions {
                    name
                    value
                }
                title
                availableForSale # 판매 가능 여부 true/false
                quantityAvailable # 재고수량
                price {
                    amount # 판매 가격
                    currencyCode # 통화
                }
                compareAtPrice {
                    amount # 원가 가격
                    currencyCode # 통화
                }
            }
            }
        }
        images(first: 2) {
            edges {
            node {
                src # 이미지 URL
                altText # 이미지 설명
            }
            }
        }
        options(first: 10) {
            id # 옵션 ID
            name # 옵션명
            values # 옵션값
        }
    }
  }
}
`
