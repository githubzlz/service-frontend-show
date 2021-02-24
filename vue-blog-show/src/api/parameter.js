
const parameter = {
  getBlogList:{
    title:"",
    summary:"",
    type:"",
    search:"",
    blogContent:{
      contentMd:''
    },
    pageInfo: {
      pageSize: "10",
      pageNum: "1",
      exclude: [
        {
          column: "isDeleted",
          value: ""
        },
        {
          column: "isShow",
          value: "1"
        }
      ]
    }
  },
}
export {
  parameter
}
