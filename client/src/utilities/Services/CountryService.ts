import ApiCallerService from "./ApiCallerService"

const CountryApiService = {
  getAllCountries: async () => {
    return await ApiCallerService.get("/countries")
  },

  getCountryByIsoCode: async (isoCode: string) => {
    return await ApiCallerService.get(`/countries/${isoCode}`)
  },
}

export default CountryApiService
