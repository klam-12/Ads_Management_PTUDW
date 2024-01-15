
import CompanyModel from '../models/Company.js';
class Company{
  async createCompany(company){
    const newCompany = await CompanyModel.create(company);
    return newCompany;
  }
  async findById(id){
    const company = await CompanyModel.findById(id);
    
    return company;
  }
}
export default new Company();