export interface announcementDetails {
  id?: number;
  title: string;
  content: string;
  published: boolean;
}

export interface subProductDetails {
  id: number;
  product?: { [key: string]: any };
  preview: string;
  details: string;
}
