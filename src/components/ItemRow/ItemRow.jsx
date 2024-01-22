import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableCell, TableRow, TextField, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ItemRow(props) {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const row = props.row;
  const [item, setItem] = useState(row.item);
  const [description, setDescription] = useState(row.description);
  const [audio, setAudio] = useState(row.audio);
  const [image, setImage] = useState(row.image);
  const [custom, setCustom] = useState(row.custom);
  const [hint, setHint] = useState(row.hint);
  const newRow = {i_id: row.i_id, item: item, description: description, image: image, custom: custom, hint: hint};

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
    else if (type === 'image') { setImage(value); }
    updateItem(type, value);
  }

  const deleteItem = (itemId) => {
    dispatch({ type: 'DELETE_ITEM', payload: [itemId, props.chapterId] });
    // make sure to alert the user and require confirmation before deleting!
  }

  return (
    <>
      { user.id === props.creatorId ?
        <TableRow
          key={row.i_id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell align="center"><TextField variant='filled' value={item} onChange={(e) => handleChange('item', e.target.value)}/></TableCell>
          <TableCell align="center"><TextField variant='filled' value={description} onChange={(e) => handleChange('description', e.target.value)}/></TableCell>
          <TableCell align="center"><TextField variant='filled' value={image} onChange={(e) => handleChange('image', e.target.value)}/></TableCell>
          <TableCell align="center"><TextField variant='filled' value={custom} onChange={(e) => handleChange('custom', e.target.value)}/></TableCell>
          <TableCell align="center"><TextField variant='filled' value={hint} onChange={(e) => handleChange('hint', e.target.value)}/></TableCell>
          <TableCell align="center">
            <IconButton onClick={() => deleteItem(row.i_id)}
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
      :
        <TableRow
        key={row.i_id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell align="center">{row.item}</TableCell>
          <TableCell align="center">{row.description}</TableCell>
          <TableCell align="center"><img src={row.image} height='50px' /></TableCell>
          <TableCell align="center">{row.custom}</TableCell>
          <TableCell align="center">{row.hint}</TableCell>
          <TableCell align="center">
            <IconButton 
              disableElevation
              disableRipple
              size="large"
              sx={{
                ml: 1,
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "transparent"
                }
              }} >
              <Tooltip title="You must be a creator or contributor to edit this deck">
                  <DeleteIcon sx={{fontSize: '40px'}} />   
              </Tooltip>
            </IconButton>
          </TableCell>
        </TableRow>
      }
    </>
  )
}

export default ItemRow;