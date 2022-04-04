import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewIcon from '@mui/icons-material/Preview';

import useStyles from './styles';
import { getStateName, getStateColor } from '../../../../utils/functions/states';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

interface props {
  documents: any[],
  setImage: any
}

export default function InvalidDocuments({ documents, setImage }: props) {
  const [expanded, setExpanded] = React.useState<string | false>('');
  const classes = useStyles();

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (  
    <div>
      <Grid container className={classes.titleContainer} justifyContent='space-between'>
        <text className={classes.entityName}>
            Inválidos
        </text>
      </Grid>
      { Object.entries(documents).map(([key, value]) => (
        <Accordion square expanded={expanded === key} onChange={handleChange(key)}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Grid container>
              <Grid item xs={9}>
                <Typography>{value.type.name}</Typography>
              </Grid>
              <Grid item xs={3} className={classes.stateColor}>
                <Chip 
                  label={getStateName(parseInt(value.state))} 
                  style={{backgroundColor: getStateColor(getStateName(parseInt(value.state)))}}
                />
              </Grid>
            </Grid>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container justifyContent='space-between'>
              { Object.entries(documents).map(([key, value]) => (
                <>  
                  { value.photos.length > 0 
                    ? <Grid container direction='column' justifyContent='space-between'>
                          <Grid container justifyContent='space-between'>
                              {value.photos.map((value: string, index: number) => (
                                <Grid key={index} className={classes.filesCard} container direction='row'>
                                    <Grid item xs={1}>
                                        <AttachFileIcon/>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <text style={{fontSize: 15}}>Archivo {index+1}</text>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <a href={value} download={`archivo${index+1}`}>
                                            <DownloadIcon style={{fontSize: 30}}/>
                                        </a>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button 
                                            size="small" 
                                            style={{padding: 0}} 
                                            onClick={() => 
                                                setImage(value)
                                            }
                                        >
                                            <PreviewIcon style={{fontSize: 30}} />
                                        </Button>
                                    </Grid>
                                </Grid>
                              ))}
                          </Grid>
                      </Grid>
                    : <text className={classes.textCenter}> No hay archivos cargados</text>
                  }
                </>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

