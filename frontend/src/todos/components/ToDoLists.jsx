import React, { Fragment, useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ReceiptIcon from '@material-ui/icons/Receipt'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import { ToDoListForm } from './ToDoListForm'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getPersonalTodos = () => {
  return new Promise(resolve => axios.get("http://localhost:3001/retrieve-todo-list/")
    .then(response => {
      resolve(response.data);
    }));
}

export const ToDoLists = ({ style }) => {
  let [toDoLists, setToDoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    getPersonalTodos()
      .then(setToDoLists)
  }, [])

  if (!Object.keys(toDoLists).length) return null
  return <Fragment>
    <Card style={style}>
      <CardContent>
        <Typography
          variant='headline'
          component='h2'
        >
          My ToDo Lists
        </Typography>
        <List>
          {Object.keys(toDoLists).map((key) => <ListItem
            key={key}
            button
            onClick={() => setActiveList(key)}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={toDoLists[key].title} />
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
    {toDoLists[activeList] && <ToDoListForm
      key={activeList} // use key to make React recreate component to reset internal state
      toDoList={toDoLists[activeList]}
      saveToDoList={(id, { todos }) => {
        const listToUpdate = toDoLists[id]
        toDoLists[id].todos = todos;
        setToDoLists({
          ...toDoLists,
          [id]: { ...listToUpdate, todos }
        });
        axios.post("http://localhost:3001/store-todo-list/", listToUpdate)
          .then(response => {})
          .catch(error => {
            if (error.response) {
              console.log(error.response.data); // => the response payload
            }
          });
      }}
    />}
  </Fragment>
}
