import {WEATHERAPI_KEY,WEATHERAPI_CURRENT_API,WEATHERAPI_FORECAST_API,WEATHERAPI_SEARCH_API} from '@env';
export function createQueryCurrent(query,aqi = false){
    const apiString = `${WEATHERAPI_CURRENT_API}?key=${WEATHERAPI_KEY}&q=${query}&aqi=${aqi ? "yes":"no"}`;
    return apiString
}
export function createQueryForecast(query,days = 5,aqi = false){
    const apiString = `${WEATHERAPI_FORECAST_API}?key=${WEATHERAPI_KEY}&q=${query}&days=${days}&aqi=${aqi? "yes": "no"}&alerts=no`;
    return apiString
}
export function createQuerySearch(query){
    const apiString = `${WEATHERAPI_SEARCH_API}?key=${WEATHERAPI_KEY}&q=${query}`;
    return apiString
}

export const Colors = {
    main: "#114B5F",
    background: "#ECECEB",
    transition: "#028090",
}