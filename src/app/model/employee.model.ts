export interface Employee {
  id : number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  username: string;
  actived: boolean;
  _links: {
    self: {
      href: string;
    },
    employee: {
      href: string;
    },
    reservation: {
      href: string;
    },
    roles: {
      href: string;
    }
  }
}
