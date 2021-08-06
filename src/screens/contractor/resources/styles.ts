
import { makeStyles, Theme } from '@material-ui/core';

import globalColors from '../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        flexGrow: 1,
    },
    cardContainer:{
    },
    card:{
        marginTop: '5%',
        marginInline: '2%',
        paddingLeft: '1%',
        paddingRight: '1%',
    },
    titleContainer:{
        
    },
    textTitle:{
        fontSize:20,
        marginTop: '3%',
        marginBottom: '3%',
        marginLeft: '3%',
    },
    circleIcon:{
        marginTop: '3%',
        marginBottom: '3%',
        marginRight: '3%',
    },
    headerText:{
        color: globalColors.darkGrey,
        fontSize: 12,
    },
    footer:{
        alignItems: 'center'
    },
    footerText:{
        marginLeft: '5%',
    },
    arrowsContainer:{
        marginRight: '3%',
    },
    button:{
        height: '35px',
    },
    paper: {}
}));

export default useStyles