import './Profile.css'; 
import TextField from '@material-ui/core/TextField';

export default function Profile() {
    return(
        <section class="notes">
            <TextField
            required
            id="notes"
            label="Notes"
            variant="outlined"
            color="secondary"
            height="100px"
            width="860px"
            />
        </section>
    )
}