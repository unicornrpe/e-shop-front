import { ApiService } from '.';

let CustomerServices = class extends ApiService {
  getCustomers = async () => {
    console.log(456);
    return this.get(`/crud`);
  };
};

export default metadata => new CustomerServices(metadata);
