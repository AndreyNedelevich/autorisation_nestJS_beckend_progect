import {makeAutoObservable} from "mobx";

export default class FilterUserStore {
    constructor() {
        this._sort = ''
        this._search = ''
        this._selectedStatus = "all"
        makeAutoObservable(this)
    }

    setSort(sort) {
        this._sort = sort
    }

    setSearch(search) {
        this._search = search
    }

    setSelectedStatus(select) {
        this._selectedStatus = select
    }

    get sort() {
        return this._sort
    }

    get search() {
        return this._search
    }

    get selectedStatus() {
        return this._selectedStatus
    }

}





