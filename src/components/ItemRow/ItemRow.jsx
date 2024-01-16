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
  const [audio, setAudio] = useState(row.audio);
  const [image, setImage] = useState(row.image);
  const [custom, setCustom] = useState(row.custom);
  const [hint, setHint] = useState(row.hint);
  const [updatedItem, setUpdatedItem] = useState({row});
  const newRow = {i_id: row.i_id, item: item, description: description, audio: audio, image: image, custom: custom, hint: hint};

  const updateItem = (key, value) => {
    props.setUpdateList([...props.updateList, 
      {...newRow, 
        [key]: value
      }
    ])  
  }

  const handleChange = (type, value) => {
    if (type === 'item') { setItem(value); }
    else if (type === 'description') { setDescription(value); }
    else if (type === 'custom') { setCustom(value); }
    else if (type === 'hint') { setHint(value); }
    updateItem(type, value);
    console.log('updateList:', props.updateList);
    // props.setUpdateList([]);
  }

  return (
    <TableRow
      key={row.i_id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">{row.i_id}</TableCell>
      <TableCell align="center"><TextField variant='filled' value={item} onChange={(e) => handleChange('item', e.target.value)}/></TableCell>
      <TableCell align="center"><TextField variant='filled' value={description} onChange={(e) => handleChange('description', e.target.value)}/></TableCell>
      <TableCell align="center">{row.audio}</TableCell>
      <TableCell align="center">{row.image}</TableCell>
      <TableCell align="center"><TextField variant='filled' value={custom} onChange={(e) => handleChange('custom', e.target.value)}/></TableCell>
      <TableCell align="center"><TextField variant='filled' value={hint} onChange={(e) => handleChange('hint', e.target.value)}/></TableCell>
    </TableRow>
  )
}

export default ItemRow;