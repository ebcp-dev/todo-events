import React, { useState } from 'react';
// import Button from '@mui/material/Button';
import { DataGrid, GridSortItem } from '@mui/x-data-grid';

import { IEvent } from '../../../../app/redux/slices/eventListSlice';

import './EventTable.scss';

const EventTable = (props: { eventRows: IEvent[] }) => {
  // const [editMode, setEditMode] = useState(false);
  const [sortModel, setSortModel] = useState<GridSortItem[]>([
    {
      field: 'from',
      sort: 'desc'
    }
  ]);

  const gridColumns = [
    { field: 'from', headerName: 'From', flex: 1, editable: true },
    { field: 'to', headerName: 'To', flex: 1, editable: true },
    { field: 'content', headerName: 'Content', flex: 1, editable: true },
    { field: 'isCompleted', headerName: 'Completed', flex: 1, editable: true }
  ];

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rowCount={50}
        rows={props.eventRows}
        columns={gridColumns}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
      />
    </div>
  );
};

export default EventTable;
