import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneIcon from '@material-ui/icons/Done'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import { TextField } from '../../shared/FormFields'

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles()
  let [todos, setTodos] = useState(toDoList.todos)

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='headline' component='h2'>
          {toDoList.title}
        </Typography>
        <form className={classes.form}>
          {todos.map((todoObj, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant='title'>
                {index + 1}
              </Typography>
              <TextField
                label='What to do?'
                value={todoObj.title}
                onChange={event => {
                  let changedTodo = todoObj;
                  changedTodo.title = event.target.value;
                  todos = [ // immutable update
                    ...todos.slice(0, index),
                    changedTodo,
                    ...todos.slice(index + 1)
                  ];
                  setTodos(todos);
                  saveToDoList(toDoList.id, { todos });
                }}
                className={classes.textField}
              />
              <Button
                size='small'
                style={
                  {backgroundColor: (todoObj.done ? "#7FFF00" : "#FFFFFF"),
                   color: '#32CD32'}}
                className={classes.standardSpace}
                onClick={() => {
                  let changedTodo = todoObj;
                  changedTodo.done = !changedTodo.done;
                  todos = [ // immutable update
                    ...todos.slice(0, index),
                    changedTodo,
                    ...todos.slice(index + 1)
                  ];
                  setTodos(todos);
                  saveToDoList(toDoList.id, { todos });
                }}
              >
                <DoneIcon />
              </Button>
              <Button
                size='small'
                color='secondary'
                className={classes.standardSpace}
                onClick={() => {
                  todos = [ // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
                  ];
                  setTodos(todos);
                  saveToDoList(toDoList.id, { todos });
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, {title: '', done: false}]);
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
