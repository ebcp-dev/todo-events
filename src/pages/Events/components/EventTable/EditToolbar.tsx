import React from 'react';
import Button from '@mui/material/Button';
import { GridApiRef, GridToolbarContainer } from '@mui/x-data-grid';

interface EditToolbarProps {
  apiRef: GridApiRef;
}

const EditToolbar = (props: EditToolbarProps) => {
  const { apiRef } = props;

  const handleClick = () => {
    const id = Math.random();
    apiRef.current.updateRows([{ id, isNew: true }]);
    apiRef.current.setRowMode(id, 'edit');
    // Wait for the grid to render with the new row
    setTimeout(() => {
      apiRef.current.scrollToIndexes({
        rowIndex: apiRef.current.getRowsCount() - 1
      });
      apiRef.current.setCellFocus(id, 'name');
    });
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
};

export default EditToolbar;
