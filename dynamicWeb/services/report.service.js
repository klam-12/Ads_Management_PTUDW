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
  async getAllReports(){
    const reports = await ReportModel.find({});
    return reports
  }
  async handleReport(id,handleContent){
    const report = await ReportModel.findByIdAndUpdate(id, {isHandled: true, handleContent:handleContent});
    return report
  }
}

export default new Report()