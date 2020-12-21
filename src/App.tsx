import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import "./App.css";
import { UserReposResponse, Repo, ErrorResponse } from "./types";

const useStyles = makeStyles({
  input: {
    height: 42,
  },
});

function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [username, setUsername] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const generateTimeline = () => {
    setLoading(true);
    setHasError(false);

    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${username}/repos`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((result: UserReposResponse) => {
        setRepos(result.data);
        setLoading(false);
      })
      .catch((response: Response) => {
        response.json().then((error: ErrorResponse) => {
          setErrorMessage(error.errors[0].message);
          setHasError(true);
          setLoading(false);
        });
      });
  };

  const classes = useStyles();

  return (
    <>
      <Container maxWidth="sm">
        <Box textAlign="center" borderBottom={1} marginBottom={2}>
          <Typography variant="h5">Generate your GitHub Timeline</Typography>
        </Box>
        <Grid container spacing={1} justify="space-evenly">
          <Grid item>
            <form noValidate autoComplete="off">
              <TextField
                id="gh-username"
                label="GitHub username"
                variant="outlined"
                size="small"
                placeholder="preyansh07"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                InputProps={{ className: classes.input }}
              />
            </form>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={generateTimeline}
            >
              Generate timeline
            </Button>
          </Grid>
        </Grid>
        {isLoading ? (
          <LoadingScreen></LoadingScreen>
        ) : hasError ? (
          <Typography color="error">{errorMessage}</Typography>
        ) : (
          <Grid container direction="column" spacing={2} justify="space-evenly">
            {repos.map((repo, index) => (
              <Grid item key={index}>
                <Paper>
                  <Typography>{repo.name}</Typography>
                  <Typography>{repo.description}</Typography>
                  <Typography>{repo.createdAt}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

function LoadingScreen() {
  return (
    <>
      <Grid container spacing={1} justify="space-evenly">
        <Grid item>
          <Skeleton variant="text" height={30} />
          <Skeleton variant="rect" width={200} height={118} />
        </Grid>
        <Grid item>
          <Skeleton variant="text" height={30} />
          <Skeleton variant="rect" width={200} height={118} />
        </Grid>
      </Grid>
      <Grid container spacing={1} justify="space-evenly">
        <Grid item>
          <Skeleton variant="text" height={30} />
          <Skeleton variant="rect" width={200} height={118} />
        </Grid>
        <Grid item>
          <Skeleton variant="text" height={30} />
          <Skeleton variant="rect" width={200} height={118} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
