import Grid from "@material-ui/core/Grid";
import CloseIcon from '@mui/icons-material/Close';
import useStyles from './styles';

interface props {
  documents: any[]
}

export const MissingDocuments = ({ documents }: props) => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.titleContainer} justifyContent='space-between'>
        <text className={classes.entityName}>
          Faltantes
        </text>
      </Grid>
      <Grid container justifyContent='space-between' alignItems='center'>
        { Object.entries(documents).map(([key, value]) => (
          <>
            <Grid item xs={11}>
              <div className={classes.invalidText}>
                <text className={classes.fileTitle}>
                  {value.name}
                </text>
              </div>
            </Grid>
            <Grid item xs={1}>
              <CloseIcon color='error' />
            </Grid>
          </>
        ))}
      </Grid>
  </>
  );
}