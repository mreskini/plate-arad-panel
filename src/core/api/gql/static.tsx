import { gql } from "@apollo/client"

export const CLIENT_LAST_TRAFFICS_SUB = gql`
    subscription ClientLast10TrafficsSub($token: String!) {
        clientLast10TrafficsSub(token: $token) {
            token
            plate_serial
            tag_serial
            card_serial
            plate_image
            driver_image
            description
            authorized
            client {
                token
                type
                name
            }
            customer {
                id
                token
                first_name
                last_name
                apb
                blocked
                image_url
                access {
                    token
                    title
                    client {
                        token
                        name
                        type
                    }
                }
            }
            created_at
        }
    }
`
