import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

export default function FilesView() {
  // const { data } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 100,
  //   maxColumns: 6,
  // });

  const rows = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "XGrid", col2: "is Awesome" },
    { id: 3, col1: "Material-UI", col2: "is Amazing" },
    { id: 4, col1: "Hello", col2: "World" },
    { id: 5, col1: "XGrid", col2: "is Awesome" },
    { id: 6, col1: "Material-UI", col2: "is Amazing" }
  ];
  
  const columns = [
    { field: "id", hide: true },
    { field: "col1", headerName: "Name", width: 600 },
    { field: "col2", headerName: "Size", width: 150 },
    { field: "col3", headerName: "Date", width: 300 }
  ];


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid autoPageSize pagination rows={rows} columns={columns} />
    </div>
  );
}