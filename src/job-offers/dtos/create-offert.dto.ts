import { Access } from "src/constants/access.enum"

export type CreateOfferDTO = {
    offer_id: string
    title: string
    expiration: string
    body: string
    labels: string[]
    target: string
    access: Access
}