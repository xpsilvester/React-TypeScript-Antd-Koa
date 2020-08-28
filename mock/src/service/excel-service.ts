const nodeExcel = require('excel-export');

export default class ImportService {
  import = (data:any) => {
    //可以将读取到的excel数据做一些相关操作
    //do sth
    return new Promise(resolve => resolve(data));
  }
  export = ()=>{
    const conf : any = {};
    conf.stylesXmlFile = "styles.xml";
    conf.name = "mysheet";
    //定义表格列字段
    conf.cols = [{
      caption:'项目类型',
        type:'string'
    },{
      caption:'项目名称',
      type:'string'
    },{
      caption:'数量',
      type:'number'
    },{
      caption:'组别',
      type:'string'			
    },{
      caption:'日期',
      type:'string'				
    }]
    //填充数据（可根据需求自行导出相应数据）
    conf.rows = [
      ['重要项目','哈哈哈哈',1,'第一组','2020-08-27'],
      ['不重要项目','哈哈',10,'第二组','2020-08-28']
    ];
    let result = nodeExcel.execute(conf);
    return new Promise(resolve => resolve(Buffer.from(result, 'binary')));
  }
}
