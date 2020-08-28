import ExcelService from '../service/excel-service';

class ExcelController {
  _service:ExcelService = new ExcelService()

  //导入excel
  import =  async(ctx) => {
    let data = ctx.request.body;
    ctx.body = await this._service.import(data);
  }

  //导出excel
  export = async(ctx) => {
    ctx.set('Content-Type', 'application/vnd.openxmlformats');
    ctx.set("Content-Disposition", "attachment; filename=" + "list.xlsx");
    ctx.body = await this._service.export();
  }
}

export default new ExcelController()