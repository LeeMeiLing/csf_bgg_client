export interface Result{

    gid: number
    name: string
    year: number
    ranking: number
    usersRated: number
    url: string
    image: string
    cId: number
    user: string
    rating: number
    cText: string
}

export interface MongoResult{

    gid: number
    name: string
    year: number
    ranking: number
    usersRated: number
    url: string
    image: string
    reviews: Review[]
}

export interface Review{
    cId: number
    user: string
    rating: number
    cText: string
}