import excelController from './controller/excel';

export default [
  {
    path: '/importexcel',
    method: 'post',
    action: excelController.import
  },
  {
    path: '/exportexcel',
    method: 'post',
    action: excelController.export
  }
];
