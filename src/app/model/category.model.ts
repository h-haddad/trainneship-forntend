export interface Category {
  id : number;
  name: string;
  _links: {
    self: {
      href: string;
    },
    category: {
      href: string;
    },
    training: {
      href: string;
    }
  }
}
