import {get, post} from './axios';

const api = {
    getBanner: function getBanner(number){
        return get(`/manage/banner/${number}`);
    },
    getBlogList: function () {
        return get('/blog/recommend/homepage');
    },
    getBlogListSide: function (num) {
        return get(`/blog/recommend/${num}`);
    },
    getHotBlog: function (num) {
        return get(`/blog/recommend/hot/${num}`);
    },
    getBlogTypeList: function () {
        return get('/article/type/queryblogtypenumber');
    },
    getBlogTypes: function (param) {
        return get(`/article/type/queryblogtype/0/${param}`);
    },
    getBlogTags: function () {
        return get('/article/tags/querytags');
    },
    getTimeShaft(param){
        return post('/blog/article/timeshaft', param);
    },
    getDate(){
        return get('/manage/thistime');
    },
    getWebComments(){
        return get('/comment/allwebsitecomment');
    },
    getBlogComments(blogId){
        return get(`/comment/allwebsitecomment?blogId=${blogId}`);
    },
    getCommentMsg(param){
        return post('/comment/create', param);
    },
    personalLetter(param){
        return post('/comment/personal/letter', param);
    },
    getBlogDetail(id){
        return get(`/blog/article/queryarticle/${id}`);
    },
    addViewNumber(id){
        return get(`/blog/article/addviewnumber/${id}`);
    },
    recommendBlog(id, type){
        return get(`/blog/article/recommend/${id}/${type}`);
    },
    timeFiling(num, type){
        return get(`/blog/article/timefiling/${num}/${type}`);
    },
    searchBlog(param, type){
        return post(`/blog/article/list/${type}`, param)
    },
    getCommentCount(){
        return get(`/comment/info`);
    },
    increasePv(){
        return get(`/statistics/increasepv`);
    },
    getStatistics(){
        return get(`/statistics/now`);
    },
    visit(){
        return get(`/manage/visit`);
    }
}
export {
    api
}
