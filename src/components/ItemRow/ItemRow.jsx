import React from "react";
import axios from "axios";
import { useState } from "react";
import { TableCell, TableRow, TextField, IconButton, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

function ItemRow(props) {
  const row = props.row;
  const [item, setItem] = useState(row.item);
  const [description, setDescription] = useState(row.description);
  const [custom, setCustom] = useState(row.custom);
  const [hint, setHint] = useState(row.hint);
  const [editItem, setEditItem] = useState({});

  // This sets new item data to update
  const handleChange = (event) => {
    event.preventDefault();
    setEditItem({...editItem, 
      item: item,
      descrition: description,
      custom: custom,
      hints: hint
    })
  }
  
    // This adds new item to chapter
    const Item = () => {
      dispatch({ type: 'ADD_ITEM', payload: newItem });
      console.log('newItem:', newItem);
      newItem.item = '';
      newItem.description = '';
      newItem.hints = '';
      newItem.tags = '';
    }

  return (
    <TableRow
      key={row.i_id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">{row.i_id}</TableCell>
      <TableCell align="center"><TextField variant='filled' value={item} onChange={(e) => setItem(e.target.value)}/></TableCell>
      <TableCell align="center"><TextField variant='filled' value={description} onChange={(e) => setDescription(e.target.value)}/></TableCell>
      <TableCell align="center">{row.audio}</TableCell>
      <TableCell align="center">{row.image}</TableCell>
      <TableCell align="center"><TextField variant='filled' value={custom} onChange={(e) => setCustom(e.target.value)}/></TableCell>
      <TableCell align="center"><TextField variant='filled' value={hint} onChange={(e) => setHint(e.target.value)}/></TableCell>
      <TableCell align="center">
        <IconButton onClick={() => saveRow()}
          disableElevation
          disableRipple
          size="large"
          sx={{
            ml: 1,
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent"
            }
          }} >
          <Tooltip title="Save Row">
              <SaveIcon sx={{fontSize: '40px'}} />   
          </Tooltip>
        </IconButton>
      </TableCell>
      <TableCell align="center">
        <IconButton onClick={() => deleteRow()}
          disableElevation
          disableRipple
          size="large"
          sx={{
            ml: 1,
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent"
            }
          }} >
          <Tooltip title="Delete Row">
              <DeleteIcon sx={{fontSize: '40px'}} />   
          </Tooltip>
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default ItemRow;