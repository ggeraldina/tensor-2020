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
    events_list: TCard[];
    hasmore: boolean;
};