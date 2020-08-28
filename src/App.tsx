import React from 'react';
import XLSX from 'xlsx'
import { Button, Form,message,Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import service from "./request";
import './App.css';

//请求api
//导入excel
const imoprtExcelApi = (data:any)=>{
  return service.request({
      url: "/importexcel",
      method: "post",
      data: data
  })
}
//导出excel
const exportExcelApi = () => {
  return service.request({
    url: "/exportexcel",
    method: "post",
    data: {},
    responseType: 'blob'
})
}

const App = () => {
  
  //读取excel数据
  const onImportExcel = (file: RcFile, FileList: RcFile[]) => {
    let resData = [{}];// 存储获取到的数据
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);  //二进制
    fileReader.onload = event => {
      try {
        const result = event.target?.result;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: 'binary' });
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            resData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            break; // 如果只取第一张表，就取消注释这行
          }
        }
        //将读取到的数据传入后台
        imoprtExcelApi(resData).then(res => {
          message.success("导入成功")
          console.log('res',res.data)
        }).catch(e=>{
          message.error("导入失败")
        })
        console.log(resData)
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        message.error('文件类型不正确')
        console.log('文件类型不正确',e);
      }

    };
    return false
  }

  //导出excel
  const onExportExcel = () => {
    exportExcelApi().then(res=>{
      //将后台返回的Blob数据导出excel
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', "项目列表.xlsx");
      document.body.appendChild(link);
      link.click();
    })
  }

  return (
    <div className="App">
      <h4>导入EXCEL</h4>
      <Form.Item label="文件路径" className="upload-form">
        <Upload beforeUpload={onImportExcel} onRemove={() => {  }}>
          <Button type="link">
            选择文件
           </Button>
        </Upload>
      </Form.Item>
      <h4>导出EXCEL</h4>
      <Button type="primary" onClick = {onExportExcel}>导出</Button>
    </div>
  );
}

export default App;
