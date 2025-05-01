export interface INotification {
    id: string;
    date_created: string;
    user_created: string;
    date_updated: string | null;
    title: string;
    title_en: string;
    body: string;
    body_en: string;
    thumbnail: string;


}