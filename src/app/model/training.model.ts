export interface Training {
  id : number;
  title: string;
  shortDescription: string;
  description: string;
  level: string,
  duration: number,
  available: boolean;
  photoName: string;
  _links: {
    self: {
      href: string
    },
    training: {
      href: string
    },
    category: {
      href: string
    }
  }
}
