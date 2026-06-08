import { LinkSidebar } from '@/common/types/dom';
import { v4 } from 'uuid';

export class LinksNonLoggedUiFct {
  public static register: LinkSidebar = {
    id: v4(),
    label: 'Register',
    url: '/auth/register',
  };
  public static login: LinkSidebar = {
    id: v4(),
    label: 'Login',
    url: '/auth/login',
  };

  public static profile: LinkSidebar = {
    id: v4(),
    label: 'Profile',
    url: '/user/profile',
  };

  public static logout: LinkSidebar = {
    id: v4(),
    label: 'Logout',
    url: '',
  };

  public static linksLogged: LinkSidebar[] = [this.profile];

  public static linksNotLogged: LinkSidebar[] = [this.register, this.login];
}
