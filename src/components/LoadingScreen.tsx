import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

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

export default LoadingScreen;
