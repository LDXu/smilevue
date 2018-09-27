const fs = require('fs')
fs.readFile('./data_json/goods.json','utf8',function(err,data){
  let newData=JSON.parse(data)
  let pushData = []
  let i = 0
  newData.RECORDS.map((value,index)=>{
    if(value.IMAGE1!=null) {
      i++;
      pushData.push(value)
    }
  })
  console.log(i);
  fs.write('./newGoods.json',JSON.stringify(pushData),err=>{
    if(err) console.log('写入失败');
    else console.log('写入成功');
  })
})
