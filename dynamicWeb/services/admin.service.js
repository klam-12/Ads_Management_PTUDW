import testDB from '../utils/testDB.js'

export default {
  findAllSpaces() {
    return testDB('adspace');
  },
  findAllSurfaces() {
    return testDB('adsurface');
  },
  findAllReports() {
    return testDB('adreport');
  },
  findAllLicenses() {
    return testDB('adslicense');
  },
  async countAllSpaces() {
    const amount = await testDB('adspace').count({count: '*'});
    return amount[0].count;
  },
  async countAllReports() {
    const amount = await testDB('adreport').count({count: '*'});
    return amount[0].count;
  },
  async countAllLicenses() {
    const amount = await testDB('adslicense').count({count: '*'});
    return amount[0].count;
  },
  findPageBySpaces(limit, offset) {
    return testDB('adspace').limit(limit).offset(offset);
  },
  findPageByReports(limit, offset) {
    return testDB('adreport').limit(limit).offset(offset);
  },
  findPageByLicenses(limit, offset) {
    return testDB('adslicense').limit(limit).offset(offset);
  },
//   add(entity) {
//     return db('categories').insert(entity);
//   },
//   findById(id) {
//     return db('categories').where('CatID', id).first();
//   },
//   del(id) {
//     return db('categories').where('CatID', id).del();
//   },
//   patch(entity) {
//     const id = entity.CatID;
//     delete entity.CatID;
//     return db('categories').where('CatID', id).update(entity);
//   }
}