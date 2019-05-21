import DatabaseConstants from './databaseConstants';

class ServiceConstants extends DatabaseConstants {
  constructor() {
    super();
    this.serviceStatus = {
      USER_CREATED: 'User created',
      USER_MODIFIED: 'User modified',
      USER_DELETED: 'User deleted',
      USER_FETCHED: 'User fetched',
      USER_AUTHENTICATED: 'User authenticated',
    };
  }
}
export default ServiceConstants;
