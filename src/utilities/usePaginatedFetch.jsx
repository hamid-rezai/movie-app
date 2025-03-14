import { useEffect, useState } from "react"
import _ from 'lodash';
import { httpService } from "../core/http-service";

const UsePaginatedFetch = (url , pageSize) =>{

  const [loading , setLoading] = useState(true);
  const [data , setData] = useState([]);

  const getData = async () =>{
    const response = await httpService.get(url);
    const movieData = response.data.results;

    const paginatedData = _.chunk(movieData , pageSize);
    console.log(paginatedData);

    setData(paginatedData);
    setLoading(false);
  }

  useEffect(()=>{
    getData();
  }, [])

  return [loading , data];
}

export default UsePaginatedFetch;