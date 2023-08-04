import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._users = []
        this._isAuth = false
        this._user = {}
        this._selectedRole={}
        this._page = 1
        this._totalUsers = 0
        this._limit = 10
        this._triger=true
        this._trigerRole=true
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUsers(users) {
        this._users = users
    }
    setUser(user) {
        this._user = user
    }

    setselectedRole(selectedRole) {
        this._selectedRole =selectedRole
    }
    setTriger(){
        this._triger=!this._triger
    }
    setTrigerRole(){
        this._trigerRole=!this._trigerRole
    }

    setPage(page) {
        this._page = page
    }
    setTotalUsers(total) {
        this._totalUsers = total
    }

    setLimit(limit) {
        this._limit = limit
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get users() {
        return this._users
    }
    get selectedRole(){
        return this._selectedRole
    }
    get triger(){
        return this._triger
    }
    get trigerRole(){
        return this._trigerRole
    }

    get totalUsers() {
        return this._totalUsers
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}