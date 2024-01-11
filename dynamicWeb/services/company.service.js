
import CompanyModel from '../models/Company.js';
class Company{
  async createCompany(company){
    const newCompany = await CompanyModel.create(company);
    return newCompany;
  }
}
export default new Company();