class Pagination{

    pageNo:number;
    pageSize:number;
    sortedBy:string;
    isAscending:boolean;

    constructor(pageNo:number, pageSize:number, sortedBy:string, isAscending:boolean){
        this.pageNo = pageNo;
        this.pageSize = pageSize;
        this.sortedBy = sortedBy;
        this.isAscending = isAscending; 
    }

    tojson(){
        return {
            pageNo: this.pageNo + 1,
            pageSize: this.pageSize,
            sortedBy: this.sortedBy,
            isAscending: this.isAscending
        }
    }
    
}

export default Pagination;