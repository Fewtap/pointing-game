export interface WIMLProps{
    name: string;
}

export type Question = {
    category: string;
    content: string;
};

export type Questions = {
    items: Question[];
};