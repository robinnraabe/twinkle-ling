import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';

function ItemGrid(props) {
  const items = useSelector(store => store.items);
  const dispatch = useDispatch();

  // Gets details for all items in selected chapter
  const getItemDetails = () => {
    axios.get(`/items/${props.chapterId}`).then(response => {
      dispatch({ type: 'SET_ITEM_DETAILS', payload: response.data });
    })
      .catch(error => {
      console.log('Error getting item details:', error);
      alert('Something went wrong!');
      })
  }

  // Set column header data for table
  const columns = [
    { field: 'i_id', headerName: 'ID', width: 60 },
    { field: 'item', headerName: 'Word', width: 130, editable: true },
    { field: 'description', headerName: 'Definition/Translation', sortable: false, width: 200, editable: true },
    {
      field: 'audio',
      headerName: 'Audio',
      sortable: false,
      width: 50,
      editable: true
    },
    {
      field: 'learning_status',
      headerName: 'Status',
      description: 'Not editable',
      sortable: false,
      width: 90,
      editable: false
    },
    { field: 'image', headerName: 'Image URL', sortable: false, width: 100, editable: true },
    { field: 'hints', headerName: 'Hint', sortable: false, width: 130, editable: true }
  ];

  useEffect(() => {
    getItemDetails();
  }, [])

  return (
    <div style={{ height: 400, width: '100%' }}>
    <DataGrid
      getRowId={(row) => row.i_id}
      rows={items}
      columns={columns}
      initialState={{
      pagination: {
        paginationModel: { page: 0, pageSize: 5 },
      },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
    />
    </div>
  );
}

export default ItemGrid;