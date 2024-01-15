import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import ItemRow from '../ItemRow/ItemRow';

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

  setUpdateList({...updateList, 

   })
  // This updates each item
  const updateItem = () => {
    axios.put(`/items/${row.i_id}`)
    .then((response) => {
      console.log('putted from ItemGri');
      getItemDetails();
    })
    .catch((error) => {
      console.log('Error in ItemRow PUT request:', error);
      alert('Something went wrong!');
    });
  }

  useEffect(() => {
    getItemDetails();
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Word</TableCell>
            <TableCell align="center">Definition/Translation</TableCell>
            <TableCell align="center">Audio</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Custom</TableCell>
            <TableCell align="center">Hint</TableCell>
            <TableCell align="center">Save</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <ItemRow row={row} updateItem={updateItem} />
          ))}
        </TableBody> 
      </Table>
    </TableContainer>
  );
}

export default ItemGrid;