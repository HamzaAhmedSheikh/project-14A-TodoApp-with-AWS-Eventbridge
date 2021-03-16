import React, { useEffect, useState } from "react";
import { DocumentNode, gql } from "@apollo/client";
import { API } from "aws-amplify";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  CircularProgress,
  Grid,
  IconButton,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import shortId from "shortid";
import DeleteIcon from "@material-ui/icons/Delete";

const MyStyle = makeStyles(() => ({
  mainContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  formContainer: {
    background: "#f3f3f3",
    width: "100%",
    maxWidth: "600px",
    borderRadius: "5px",
    marginTop: "20px",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "600px",
    marginTop: "20px",
  },
  Datalist: {
    background: "#f9f9f9",
    padding: "10px 20px",
    marginBottom: "4px",
    backgroundColor: "#f1f1f1",
  },
  loadingWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
    height: "100px",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "30px",
  },
}));

const allTodos = `
  {
    getTodos {
      task   
      id
    }
  }
`;

const createTodos = `
  mutation addTodo($todo: TodoInput) {
    addTodo(todo: $todo) {
      result
    }
  }  
`;

const deleteTodos = `
  mutation deleteTodo($id: String) {
    deleteTodo(id: $id) {
      result
    }
  }
`;

const IndexPage = () => {
  const classes = MyStyle();
  const [data, setData] = useState<any>();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const data: any = await API.graphql({ query: allTodos });
      console.log("dataaa ===> ", data);

      setData({ getTodos: data.data.getTodos });
    })();
  }, [setData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id: string = shortId.generate();

    setLoading(true);

    const res: any = await API.graphql({
      query: createTodos,
      variables: { todo: { task: message, id: id } },
    });

    console.log("respone =====> ", res);
    console.log("response dataaaaa ====> ", res.data);

    let readonly = await data.getTodos.map((item) => {
      return item;
    });

    // inserting response in the state
    await readonly.push(res.data.addTodo);
    if (readonly) {
      setData({ getTodos: readonly });
      setLoading(false);
      setMessage("");
    }
  };

  const handleDelete = async (id) => {
    console.log("delete id ====> ", id);
    // console.log('result ===> ', result);

    setLoading(true);

    let deleteData = await API.graphql({
      query: deleteTodos,
      variables: { id: id },
    });

    console.log("delete data ===> ", deleteData);

    let Datadel = await data.getTodos.filter((item) => {
      return item.id !== id;
    });

    if (Datadel) {
      setData({ getTodos: Datadel });
      setLoading(false);
    }
  };

  return (
    <div>
      <h1> Home Page </h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSubmit}> Add </button>

      <div className={classes.contentWrapper}>
        <Box py={1}>
          {!data || loading ? (
            <div className={classes.loadingWrapper}>
              <CircularProgress />
            </div>
          ) : (
            data.getTodos.map((msg) => (
              <div key={msg.id} className={classes.Datalist}>
                <Grid container>
                  <Grid item xs={10} container alignItems="center">
                    <Typography className="fontStyle">{msg.task}</Typography>
                  </Grid>
                  <Grid container justify="flex-end" item xs={2}>
                    <IconButton onClick={() => handleDelete(msg.id)}>
                      <DeleteIcon color="secondary" fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            ))
          )}
        </Box>
      </div>
    </div>
  );
};

export default IndexPage;
