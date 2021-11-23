import { makeStyles, Theme } from '@material-ui/core';
import { headerSize } from '../../../utils/constants';
import globalColors from '../../../utils/styles/globalColors';
import colors from '../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        paddingTop: headerSize
    },
    cardContainer:{
        display: 'flex',
        flex: 1
    },
    card:{
        flex: 1,
        marginTop: '65px',
        marginInline: '10%',
    },
    counterContainer:{
        display: 'flex',
        flex: 1,
        backgroundColor: colors.lightBlue,
        justifyContent: 'center',
        textAlign: 'center',
        
    },
    imgContainer:{
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        margin:'auto',
    },
    img:{
        width: 120,
    },
    counter:{
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '15%',
        paddingBottom: '15%',
    },
    counterText:{
        color: colors.white,
    },
    details:{
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '10%',
        paddingBottom: '10%',
    },
    leftCard:{
      marginTop: '5%',
      marginLeft: '2.5%',
      paddingRight: '2.5%',
      paddingLeft: '2.5%',
      paddingBottom: '2.5%',
      [theme.breakpoints.up('xs')]: {
          width: '130%',
          marginLeft: '2.5%',
      },
      [theme.breakpoints.up('sm')]: {
          width: '730px',
      },
      [theme.breakpoints.up('md')]: {
          width: '95%',
      },
      [theme.breakpoints.down('sm')]: {
          marginTop: '17%'
      },
  },
  textTitle:{
      fontSize:20,
      [theme.breakpoints.down('sm')]: {
          fontSize: 15,
      },
  },
  circleIcon:{
      marginTop: '3%',
      marginBottom: '3%',
      marginRight: '3%',
  },
  headerText:{
    marginBottom: '2%',
    color: globalColors.darkGrey,
    fontSize: 12,
    [theme.breakpoints.down('md')]: {
        fontSize: 9,
    },
  },
  button:{
    height: '35px',
    textTransform: 'none',
    paddingTop: '2%',
    paddingBottom: '2%',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center'
  },
  textInput: {
    color: globalColors.lightBlue,
    marginTop: 0,
    marginBottom: '5%'
  },
  documentHeaderContainer: {
      paddingTop: '1%',
      paddingBottom: '1%'
  }
}));

export default useStyles