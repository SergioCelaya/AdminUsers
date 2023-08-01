import { User } from '../interfaces/user.interface';

export interface RespuestaApi {
    page:        number;
    per_page:    number;
    results:     User[];
    total:       number;
    total_pages: number;
}
