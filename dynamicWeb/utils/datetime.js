function formatMongoDBDate(mongodbDatetimeString) {
  const mongodbDate = new Date(mongodbDatetimeString);

  const day = mongodbDate.getDate().toString().padStart(2, '0');
  const month = (mongodbDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-based
  const year = mongodbDate.getFullYear();

  return `${day}/${month}/${year}`;
}
// const mongodbDatetimeString = '2024-01-11T05:52:14.726+00:00';
// const formattedDate = formatMongoDBDate(mongodbDatetimeString);
// console.log(formattedDate);
export {formatMongoDBDate}