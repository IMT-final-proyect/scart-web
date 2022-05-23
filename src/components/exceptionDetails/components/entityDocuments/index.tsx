import useStyles from './styles';
import InvalidDocuments from '../invalidDocuments';
import { MissingDocuments } from '../missingDocuments';

interface props {
  missing: any[],
  invalid: any[],
  setImage: any
}

export const EntityDocuments = ({ missing, invalid, setImage }: props) => {
  const classes = useStyles();
  
  const validDocumentMessage = () => (
    <div className={classes.areValidDiv}>
      <text className={classes.areValidText}>
        Todos los documentos estan en regla
      </text>
    </div>
  )

  return (
    <>
        { invalid.length === 0 && missing.length === 0 && validDocumentMessage() }
        { invalid.length > 0 && <InvalidDocuments documents={invalid} setImage={setImage} /> }
        { missing.length > 0 && <MissingDocuments documents={missing} /> }
    </>
  )
}