import customerServices from './customer.service';

const GetServices = metadata => {
  const CustomerServices = customerServices(metadata);

  return {
    CustomerServices
  };
};
export default GetServices;
