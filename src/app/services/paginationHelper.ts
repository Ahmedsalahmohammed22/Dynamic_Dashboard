import { HttpClient ,HttpParams } from "@angular/common/http";
import { PaginatedResult } from "../models/pagination";
import { map } from "rxjs";

export function getPaginatedResult<T>(url:string , params : HttpParams , http:HttpClient){
    const paginatedResult :PaginatedResult<T> = new PaginatedResult<T>;
    return http.get<any>(url , {observe:'response' , params}).pipe(
        map(response =>{
            if(response.body){
                paginatedResult.result = response.body.data as T[];
            }
            paginatedResult.pagination = {
                currentPage : response.body.page,
                itemsPerPage : response.body.per_page,
                totalItems : response.body.total,
                totalPages : response.body.total_pages
            }
            return paginatedResult;
        })
    )
}

export function getPaginationHeaders(pageNumber : number){
    let params = new HttpParams();
    params = params.append('page' , pageNumber);
    return params;
}