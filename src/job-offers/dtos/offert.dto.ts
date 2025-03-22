import { Access } from "src/constants/access.enum"

export type OfferDTO = {
    offer_id: string
    title: string
    expiration: string
    body: string
    labels: string[]
    target: string
    access: Access
    craetedAt: string
    createdBy: string
}
