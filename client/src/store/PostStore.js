import {makeAutoObservable} from "mobx";

export default class PostStore {
    constructor() {
        this._posts = []
        this._page = 1
        this._totalPages = 0
        this._limit =5
        this._triger=true;
        makeAutoObservable(this)
    }

    setPosts(posts) {
        this._posts = posts
    }
    setPage(page) {
        this._page = page
    }
    setTotalPages(totalPages) {
        this._totalPages = totalPages
    }

    setLimit(limit) {
        this._limit = limit
    }

    setTriger(arg){
        this._triger = arg
    }

    get totalPages() {
        return this._totalPages
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    get posts() {
        return this._posts
    }
   get triger(){
        return this._triger
    }
}