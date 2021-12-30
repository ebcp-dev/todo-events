import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
// Material Icons
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
// Material UI Data Grid
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridEditRowsModel,
  GridSortItem,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridValueFormatterParams
} from '@mui/x-data-grid';
// State management
import {
  IEvent,
  removeEvent
} from '../../../../app/redux/slices/EventListSlice';
import { AppDispatch, RootState } from '../../../../app/redux/Store';
// API
import { deleteEventThunk, putEventThunk } from '../../../../api/EventListApi';
// Components
import AlertMessage from '../../../../common/Alerts/AlertMessage';
// Utils
import { dateTimeFormat } from '../../../../utils/dateTime/DateTimeUtils';

import './EventGrid.scss';

const EventTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const eventListState = useSelector((state: RootState) => state.eventList);
  // default sorting model for Data Grid
  const [sortModel, setSortModel] = useState<GridSortItem[]>([
    {
      field: 'from',
      sort: 'desc'
    }
  ]);
  // Editing state
  const [editRowsModel, setEditRowsModel] = useState<GridEditRowsModel>({});
  // Feedback alerts
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Sets row data after editing
  const handleEditRowsModelChange = useCallback((model: GridEditRowsModel) => {
    setEditRowsModel(model);
  }, []);

  const handleSaveClick = (id) => (event) => {
    event.stopPropagation();
    if (Object.entries(editRowsModel).length > 0) {
      // Need to convert editRowsModel to array to get keys
      const eventObj = Object.entries(editRowsModel)[0][1];
      const fromValue = eventObj.from.value;
      const toValue = eventObj.to.value;
      // parse into IEvent object
      const editedEvent: IEvent = {
        id: Object.entries(editRowsModel)[0][0],
        from: `${fromValue}`,
        to: `${toValue}`,
        content: `${eventObj.content.value}`,
        isCompleted: eventObj.isCompleted.value ? true : false
      };
      // putEvent dispatch
      // Only update if save button in edited row is clicked
      if (id === editedEvent.id) {
        const fromDate = new Date(`${fromValue}`);
        const toDate = new Date(`${toValue}`);
        if (fromDate.getTime() >= toDate.getTime()) {
          setErrorMessage(`'To' date must be after 'From' date.`);
          setSuccessMessage('');
        } else {
          dispatch(putEventThunk({ eventObject: editedEvent }))
            .then((response) => {
              setSuccessMessage(response.payload.message);
              setErrorMessage('');
            })
            .catch((error) => {
              console.log(error);
              setErrorMessage(`Failed to update event!`);
              setSuccessMessage('');
            });
        }
      }
    }
  };

  const handleDeleteClick = (id) => (event) => {
    event.stopPropagation();
    if (id) {
      // Find and remove from redux state
      dispatch(deleteEventThunk({ eventId: id }))
        .then((response) => {
          setSuccessMessage(response.payload.message);
          dispatch(removeEvent(id));
        })
        .catch((error) => {
          console.log(error.message);
          setErrorMessage(`Failed to delete event!`);
          setSuccessMessage('');
        });
    }
  };

  const gridColumns: GridColumns = [
    {
      field: 'from',
      headerName: 'From',
      type: 'dateTime',
      flex: 1,
      minWidth: 200,
      editable: true,
      valueFormatter: (params: GridValueFormatterParams) => {
        // first converts to JS Date, then to locale option through date-fns
        return dateTimeFormat.format(new Date(params.value as string));
      }
    },
    {
      field: 'to',
      headerName: 'To',
      type: 'dateTime',
      flex: 1,
      minWidth: 200,
      editable: true,
      valueFormatter: (params: GridValueFormatterParams) => {
        // first converts to JS Date, then to locale option through date-fns
        return dateTimeFormat.format(new Date(params.value as string));
      }
    },
    {
      field: 'content',
      headerName: 'Content',
      flex: 1,
      minWidth: 200,
      editable: true
    },
    {
      field: 'isCompleted',
      headerName: 'Completed',
      type: 'boolean',
      flex: 1,
      minWidth: 100,
      editable: true
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 1,
      minWidth: 100,
      getActions: ({ id }) => {
        // Only show save button on row being edited.
        if (Object.entries(editRowsModel).length > 0) {
          const editedRowId = Object.entries(editRowsModel)[0][0];
          if (id === editedRowId) {
            return [
              <GridActionsCellItem
                key={id}
                icon={<SaveIcon color="primary" />}
                label="Save"
                className="textPrimary"
                onClick={handleSaveClick(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                key={id}
                icon={<DeleteIcon sx={{ color: '#BB1C2A' }} />}
                label="Delete"
                className="textPrimary"
                onClick={handleDeleteClick(id)}
                color="inherit"
              />
            ];
          }
        }
        return [
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon sx={{ color: '#BB1C2A' }} />}
            label="Delete"
            className="textPrimary"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />
        ];
      }
    }
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <AlertMessage
            alertType={errorMessage ? 'error' : 'success'}
            alertMessage={errorMessage ? errorMessage : successMessage}
            setAlertMessage={errorMessage ? setErrorMessage : setSuccessMessage}
          />
          <DataGrid
            editMode="row"
            rowCount={100}
            rows={eventListState.events}
            columns={gridColumns}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            editRowsModel={editRowsModel}
            onEditRowsModelChange={handleEditRowsModelChange}
            sx={{ mt: 4 }}
            components={{
              Toolbar: customToolbar
            }}
          />
        </div>
      </div>
    </div>
  );
};

const customToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <p>Double click on a row to edit.</p>
    </GridToolbarContainer>
  );
};

export default EventTable;
