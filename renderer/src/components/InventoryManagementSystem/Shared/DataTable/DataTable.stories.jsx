import DataTable from './DataTable';

const headers = [
    {
      id: 'id',
      label: 'Id',
      value: 'menuCategoryId'
    },
    {
      id: 'name',
      label: 'Name',
      value: 'menuCategoryName'
    }
];

const rows = [
    {
        menuCategoryId: 1,
        menuCategoryName: "Menu Category 1"
    },
    
    {
        menuCategoryId: 2,
        menuCategoryName: "Menu Category 2"
    },
    
    {
        menuCategoryId: 3,
        menuCategoryName: "Menu Category 3"
    }

]

export default{
    title: "Components/Shared/DataTable",
    component: DataTable
}

export const Basic = {
    args:{
        headers: headers,
        rows: rows
    }
}