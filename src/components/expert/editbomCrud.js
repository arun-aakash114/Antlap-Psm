import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const EditBomCrud = ({ bomDatas, editcall }) => {



  // const [newBomData, setNewBomData] = useState([]);
  // setNewBomData(bomData)

  // console.log(newBomData)
  // console.log(newBomData)

  // const headCells = [
  //     {
  //       id: 1,  
  //       partno: 'Frozen yoghurt',
  //       desc: 159,
  //       qty: 6.0,
  //       sdoc: 6.0,
  //       notes:'sdfsdf'
  //     },
  //     {   id: 2,
  //         partno: 'Frozen yoghurt',
  //         desc: 159,
  //         qty: 6.0,
  //         sdoc: 6.0,
  //         notes:'sdfsdf'
  //     }
  //   ]


  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Parts No.</TableCell>
          <TableCell align="right">Part Description</TableCell>
          <TableCell align="right">Qty</TableCell>
          <TableCell align="right">Supporting Docs</TableCell>
          <TableCell align="right">Notes</TableCell>
      <TableCell align="right">Actions </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bomDatas.map((row, index) => (
          <TableRow
            key={row?.BOMPartId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.PartsNo}
            </TableCell>
            <TableCell align="right">{row.PartsDescription}</TableCell>
            <TableCell align="right">{row.Qty}</TableCell>
            <TableCell align="right">{row.PartNumberSupportingDocument}</TableCell>
            <TableCell align="right">{row.Note=="" ? "Nil" : row.Note}</TableCell>
          <TableCell align="right"><button onClick={() => editcall(row, index)}>Edit</button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default EditBomCrud