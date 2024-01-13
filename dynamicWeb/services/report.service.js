import ReportModel   from "../models/Report.js";

class Report{
  async createReport(data){
    const report = await ReportModel.create(data);
    return report
  }
  async getReportById(id){
    const report = await ReportModel.findById(id);
    return report
  }
}

export default new Report()