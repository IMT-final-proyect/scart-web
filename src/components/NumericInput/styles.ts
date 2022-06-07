import { makeStyles, Theme } from '@material-ui/core';
import globalColors from '../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonMinum: {
    paddingVertical: '2%',
    paddingHorizontal: 15,
    borderRadius: 2,
    borderWidth: 1,
    borderRadious: 5,
    borderColor: globalColors.black,
    backgroundColor: globalColors.grey
  },
  buttonPlus: {
    paddingVertical: '2%',
    paddingHorizontal: 12,
    borderRadius: 2,
    borderWidth: 1,
    borderRadious: 5,
    borderColor: globalColors.black,
    backgroundColor: globalColors.grey
  },
  valueContainer: {
    marginLeft: '5%',
    marginRight: '5%'
  },
  icons: {
    fontSize: 25
  },
  text: {
    fontSize: 18
  },
  numericInput: {
    fontSize: 18,
    MozAppearance: 'textfield',
    WebkitAppearance: 'none',
    margin: 0
  }
}));

export default useStyles
