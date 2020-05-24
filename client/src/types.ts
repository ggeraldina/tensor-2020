export type TExample = {
    message: string;
};

export type TCard = {
    id: string;
    photo: string;
    title: string;
    start_time: string;
}

export type TCardList = {
    items: TCard[];
    hasMore: boolean;
};